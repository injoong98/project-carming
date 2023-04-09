import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {
  useGetCurrentCarPositionQuery,
  useGetGlobalPathQuery,
  useSetDestinationCoordinateMutation,
  useSetDriveStartStatusMutation,
  useSetIsDestinationMutation,
  useSetTourStartMutation,
} from '../apis/journeyApi';
import {CarCallInfoCard, CustomButton, CustomMapView} from '../components';
import {iconPlace} from '../components/MapMarker';
import {L3_TotalJourneyStackParamList} from '../navigations/L3_TotalJourneyStackNavigator';
import {L4_JourneyStackParamList} from '../navigations/L4_JourneyStackNavigator';
import {
  calcArrivalTime,
  coordinateToIconPlace,
  placeToCoordinate,
} from '../utils';
import {useCheckIsDestinationQuery} from '../apis/journeyApi';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentIdx} from '../redux/slices/journeySlice';
import {RootState} from '../redux/store';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export type CarCallScreenProps = CompositeScreenProps<
  NativeStackScreenProps<L4_JourneyStackParamList, 'CarCall'>,
  NativeStackScreenProps<L3_TotalJourneyStackParamList>
>;

const CarCallScreen: React.FC<CarCallScreenProps> = ({navigation, route}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {start: startCoordinate, end: endCoordinate} = route.params;

  const startPlace = coordinateToIconPlace('map-marker', startCoordinate);
  const endPlace = coordinateToIconPlace('hail', endCoordinate);

  const {placeList: journeyPlaceList} = useSelector(
    (state: RootState) => state.journey,
  );
  const [buttonAbled, setButtonAbled] = useState<boolean>(false);
  const [currentCarPlace, setCurrentCarPlace] = useState<iconPlace>(
    coordinateToIconPlace('taxi', startCoordinate),
  );
  const [arrivalTime, setArrivalTime] = useState<{
    hour: number;
    minute: number;
  }>(calcArrivalTime(startCoordinate, endCoordinate));

  const {data: currentCarCoordinate} = useGetCurrentCarPositionQuery(
    undefined,
    {
      pollingInterval: navigation.isFocused() ? 1000 : undefined,
    },
  );
  const {data: globalPath} = useGetGlobalPathQuery(undefined, {
    pollingInterval: navigation.isFocused() ? 1000 : undefined,
  });
  const {data: isDestination} = useCheckIsDestinationQuery(undefined, {
    pollingInterval: navigation.isFocused() ? 1000 : undefined,
  });
  const [setDestinationCoordinate, setDestCoordStatus] =
    useSetDestinationCoordinateMutation();
  const [setIsDestination, setIsDestStatus] = useSetIsDestinationMutation();
  const [setDriveStart, setDriveStartStatus] = useSetDriveStartStatusMutation();
  const [setTourStart, setTourStartStatus] = useSetTourStartMutation();

  useEffect(() => {
    if (currentCarCoordinate !== undefined) {
      const {latitude: lat, longitude: lon} = currentCarCoordinate;
      setCurrentCarPlace({...currentCarPlace, lat, lon});
      setArrivalTime(calcArrivalTime(currentCarCoordinate, endCoordinate));
    }
  }, [currentCarCoordinate]);

  useEffect(() => {
    if (isDestination !== undefined) {
      setButtonAbled(isDestination);
    }
  }, [isDestination]);

  const completeBoardBtnPressed = () => {
    setDestinationCoordinate(placeToCoordinate(journeyPlaceList[1]));
    setDriveStart(1);
    setIsDestination(0);
    setTourStart(0);
  };

  useEffect(() => {
    const redisSetSuccess =
      setDestCoordStatus.isSuccess &&
      setIsDestStatus.isSuccess &&
      setDriveStartStatus.isSuccess &&
      setTourStartStatus.isSuccess;

    const redisSetError =
      setDestCoordStatus.isError ||
      setIsDestStatus.isError ||
      setDriveStartStatus.isError ||
      setTourStartStatus.isError;

    if (redisSetSuccess) {
      dispatch(setCurrentIdx(1));
      navigation.replace('CarMove');
    } else if (redisSetError) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '서버에 문제가 발생했습니다.',
        textBody: '잠시 후에 다시 시도해 주세요.',
      });
    }
  }, [
    setDestCoordStatus,
    setIsDestStatus,
    setDriveStartStatus,
    setTourStartStatus,
  ]);

  return (
    <StyledSafeAreaView>
      <CarCallInfoCard
        statusText={
          isDestination ? '카밍카가 도착했어요.' : '카밍카가 출발했어요.'
        }
        infoText={
          isDestination
            ? '탑승완료 버튼을 눌러주세요.'
            : `${arrivalTime.hour !== 0 ? `${arrivalTime.hour}시간` : ''} ${
                arrivalTime.hour === 0 && arrivalTime.minute === 0
                  ? '곧'
                  : `${arrivalTime.minute}분 내로`
              } 도착할 예정이에요.`
        }
        imageActive={!isDestination}
      />
      <CustomMapView
        places={[startPlace, endPlace, currentCarPlace]}
        viewStyle={{flex: 1}}
        latitudeOffset={0}
        routeCoordinates={globalPath ?? []}
      />
      <CustomButton
        text={'차량 탑승 완료'}
        onPress={() => completeBoardBtnPressed()}
        disabled={!buttonAbled}
        buttonStyle={{
          ...styles.buttonStyle,
          backgroundColor: buttonAbled
            ? theme.colors.secondary
            : theme.colors.surfaceDisabled,
        }}
        textStyle={styles.buttonText}
      />
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 200,
    padding: 14,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width * 0.5 - 100,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

export default CarCallScreen;

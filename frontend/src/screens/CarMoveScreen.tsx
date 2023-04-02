import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
  CarCallInfoCard,
  CarMoveInfoCard,
  CustomButton,
  CustomMapView,
} from '../components';
import {L3_TotalJourneyStackParamList} from '../navigations/L3_TotalJourneyStackNavigator';
import {L4_JourneyStackParamList} from '../navigations/L4_JourneyStackNavigator';
import {RootState} from '../redux/store';
import {Category, Place} from '../types';
import {
  calcArrivalTime,
  coordinateToIconPlace,
  placeToCoordinate,
  placeToIconPlace,
  placesToCoordinates,
} from '../utils';
import {iconPlace} from '../components/MapMarker';
import {
  useCheckDriveStartStatusQuery,
  useCheckIsDestinationQuery,
  useGetCurrentCarPositionQuery,
  useGetGlobalPathQuery,
  useSetDriveStartStatusMutation,
  useSetIsDestinationMutation,
} from '../apis/journeyApi';
import {setCurrentIdx} from '../redux/slices/journeySlice';

export type CarMoveScreenProps = CompositeScreenProps<
  NativeStackScreenProps<L4_JourneyStackParamList, 'CarMove'>,
  NativeStackScreenProps<L3_TotalJourneyStackParamList>
>;

const CarMoveScreen: React.FC<CarMoveScreenProps> = ({navigation, route}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {placeList, currentIdx} = useSelector(
    (state: RootState) => state.journey,
  );

  const [buttonAbled, setButtonAbled] = useState<boolean>(false);
  const [startPlace, setStartPlace] = useState<iconPlace>(
    placeToIconPlace('map-marker', placeList[currentIdx - 1]),
  );
  const [endPlace, setEndPlace] = useState<Place | iconPlace>(
    placeList[currentIdx],
  );
  const [currentCarPlace, setCurrentCarPlace] = useState<iconPlace>(
    placeToIconPlace('taxi', placeList[currentIdx - 1]),
  );
  const {data: currentCarCoordinate} = useGetCurrentCarPositionQuery(
    undefined,
    {
      pollingInterval: 1000,
    },
  );
  const {data: globalPath} = useGetGlobalPathQuery();
  const [arrivalTime, setArrivalTime] = useState<{
    hour: number;
    minute: number;
  }>(
    calcArrivalTime(placeToCoordinate(startPlace), placeToCoordinate(endPlace)),
  );
  const {data: isDestination, isFetching: isDestinationFetching} =
    useCheckIsDestinationQuery(undefined, {
      pollingInterval: 1000,
    });
  const {data: driveStartStatus, isFetching: driveStartStatusFetching} =
    useCheckDriveStartStatusQuery();

  const [setDriveStartStatus, {isLoading: driveStartStatusLoading}] =
    useSetDriveStartStatusMutation();
  const [setIsDestination] = useSetIsDestinationMutation();

  useEffect(() => {
    setStartPlace(placeToIconPlace('map-marker', placeList[currentIdx - 1]));
    setEndPlace(placeList[currentIdx]);
  }, [currentIdx]);

  useEffect(() => {
    if (currentCarCoordinate !== undefined) {
      setCurrentCarPlace(coordinateToIconPlace('taxi', currentCarCoordinate));
      setArrivalTime(
        calcArrivalTime(currentCarCoordinate, placeToCoordinate(endPlace)),
      );
    }
  }, [currentCarCoordinate]);

  useEffect(() => {
    if (isDestination !== undefined) {
      setButtonAbled(isDestination);
    }
  }, [isDestination]);

  const getOffBtnPressed = () => {
    setDriveStartStatus(0);
    dispatch(setCurrentIdx(currentIdx + 1));
  };

  const completeBoardBtnPressed = () => {
    setIsDestination(0);
    setDriveStartStatus(1);
  };

  const journeyEndBtnPressed = () => {
    navigation.navigate('JourneyEnd', {screen: 'Review'});
  };

  const makeInfoText = (): string => {
    if (driveStartStatus === false) {
      return '버튼을 누르면 다음장소로 출발해요.';
    }
    if (isDestination === true) {
      return '목적지에 도착했어요.';
    }
    if (arrivalTime.hour === 0 && arrivalTime.minute === 0) {
      return '곧 목적지에 도착해요.';
    }

    const hourStr = arrivalTime.hour !== 0 ? `${arrivalTime.hour}시간` : '';
    const minuteStr = `${arrivalTime.minute}분 남았어요.`;

    return '도착까지 ' + hourStr + minuteStr;
  };

  const journeyButton = () => {
    if (driveStartStatus === false) {
      return (
        <CustomButton
          text={'탑승 완료'}
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
      );
    }
    if (currentIdx === placeList.length - 1) {
      return (
        <CustomButton
          text={'여정 종료하기'}
          onPress={() => journeyEndBtnPressed()}
          disabled={!buttonAbled}
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: buttonAbled
              ? theme.colors.secondary
              : theme.colors.surfaceDisabled,
          }}
          textStyle={styles.buttonText}
        />
      );
    }
    return (
      <CustomButton
        text={'하차 완료'}
        onPress={() => getOffBtnPressed()}
        disabled={!buttonAbled}
        buttonStyle={{
          ...styles.buttonStyle,
          backgroundColor: buttonAbled
            ? theme.colors.surfaceVariant
            : theme.colors.surfaceDisabled,
        }}
        textStyle={styles.buttonText}
      />
    );
  };

  const journeyInfoCard = () => {
    if (driveStartStatusFetching || driveStartStatusLoading) {
      return (
        <ActivityIndicator
          size={'large'}
          animating={true}
          color={theme.colors.onPrimary}
        />
      );
    }

    if (
      isDestination === true &&
      driveStartStatus === true &&
      currentIdx === placeList.length - 1
    ) {
      return (
        <CarCallInfoCard
          statusText={'카밍카와 함께하는 여정이 끝났어요.'}
          infoText={'여정 종료 버튼을 눌러주세요.'}
          imageActive={false}
        />
      );
    }
    return (
      <CarMoveInfoCard
        place={endPlace}
        index={currentIdx}
        infoText={makeInfoText()}
      />
    );
  };

  return (
    <StyledSafeAreaView>
      <CustomMapView
        places={[startPlace, endPlace, currentCarPlace]}
        viewStyle={{flex: 1}}
        latitudeOffset={0.2}
        useIndex={false}
        routeCoordinates={globalPath}
      />
      {journeyInfoCard()}
      <ButtonContainer>{journeyButton()}</ButtonContainer>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 200,
    padding: 14,
    borderRadius: 30,
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

const ButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export default CarMoveScreen;

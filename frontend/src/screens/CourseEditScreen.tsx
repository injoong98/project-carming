import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {L4_CourseCreateStackParamList} from '../navigations/L4_CourseCreateStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Coordinate, Place} from '../types';
import {RootState} from '../redux/store';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {CourseEditListItem, CustomButton, CustomMapView} from '../components';
import {CompositeScreenProps} from '@react-navigation/native';
import {ReactNativeModal as Modal} from 'react-native-modal';
import {
  calcTime,
  coordinateToIconPlace,
  pathToCoordinates,
  placesToCoordinates,
} from '../utils';
import {callNaverDirectionApi} from '../apis/mapApi';
import {
  useGetCurrentCarPositionQuery,
  useSetDestinationCoordinateMutation,
  useSetDriveStartStatusMutation,
  useSetIsDestinationMutation,
} from '../apis/journeyApi';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {L3_TotalJourneyStackParamList} from '../navigations/L3_TotalJourneyStackNavigator';
import {setJourneyPlaceList} from '../redux/slices/journeySlice';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {L2_AppDrawerParamList} from '../navigations/L2_AppDrawerNavigator';

export type CourseEditScreenProps = CompositeScreenProps<
  NativeStackScreenProps<L4_CourseCreateStackParamList, 'CourseEdit'>,
  CompositeScreenProps<
    NativeStackScreenProps<L3_TotalJourneyStackParamList>,
    DrawerScreenProps<L2_AppDrawerParamList>
  >
>;

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const currentClientPosition: Coordinate = {
  latitude: 37.503353299999844,
  longitude: 127.04569145393688,
};

const CourseEditScreen: React.FC<CourseEditScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const placeCart = useSelector((state: RootState) => state.place.placeCart);
  const courseCart = useSelector((state: RootState) => state.course.courseCart);

  const clientPlace = coordinateToIconPlace('hail', currentClientPosition);
  const [coursePlaces, setCoursePlaces] = useState<Place[]>([]);
  const [routeModalVisible, setRouteModalVisible] = useState<boolean>(false);
  const [placeCoordinates, setPlaceCoordinates] = useState<Coordinate[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [routeInfo, setRouteInfo] = useState<any>({});

  const {data: currentCarPosition} = useGetCurrentCarPositionQuery();
  const [setDestinationCoordinate, setDestCoordStatus] =
    useSetDestinationCoordinateMutation();
  const [setIsDestination, setIsDestStatus] = useSetIsDestinationMutation();
  const [setDriveStart, setDriveStartStatus] = useSetDriveStartStatusMutation();

  useEffect(() => {
    route.params.recommendType === '0'
      ? setCoursePlaces([...placeCart])
      : setCoursePlaces([...courseCart]);
  }, [placeCart, courseCart, route]);

  useEffect(() => {
    setPlaceCoordinates(placesToCoordinates([clientPlace, ...coursePlaces]));
  }, [coursePlaces]);

  const calcRoute = async () => {
    await callNaverDirectionApi(placeCoordinates)
      .then(res => {
        const {summary, path} = res.data.route.traoptimal[0];
        setRouteCoordinates(pathToCoordinates(path));
        setRouteInfo(summary);
      })
      .catch(err => console.log('error :', err));
  };

  const journeyStartBtnPressed = async () => {
    dispatch(setJourneyPlaceList([clientPlace, ...coursePlaces]));
    setDestinationCoordinate(currentClientPosition);
    setDriveStart(1);
    setIsDestination(0);
    setRouteModalVisible(false);
  };

  useEffect(() => {
    const redisSetSuccess =
      setDestCoordStatus.isSuccess &&
      setIsDestStatus.isSuccess &&
      setDriveStartStatus.isSuccess;

    const redisSetError =
      setDestCoordStatus.isError ||
      setIsDestStatus.isError ||
      setDriveStartStatus.isError;

    if (redisSetSuccess) {
      if (currentCarPosition) {
        navigation.replace('Journey', {
          screen: 'CarCall',
          params: {start: currentCarPosition, end: currentClientPosition},
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: '준비된 차량이 없습니다.',
          textBody: '잠시 후에 다시 이용해 주세요.',
        });
      }
    } else if (redisSetError) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '서버에 문제가 발생했습니다.',
        textBody: '잠시 후에 다시 이용해 주세요.',
      });
    }
  }, [setDestCoordStatus, setIsDestStatus, setDriveStartStatus]);

  return (
    <GradientBackground colors={['#70558e7a', '#df94c283', '#ffbdc1b0']}>
      <SafeAreaView style={{flex: 1}}>
        <StyledView
          style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <IconButton
            icon="chevron-left"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <IconButton
            icon="home"
            size={30}
            onPress={() => {
              navigation.navigate('Main');
            }}
          />
        </StyledView>
        <TitleText>코스 짜기</TitleText>
        <DescText>드래그 & 드롭으로 순서를 변경할 수 있어요!</DescText>
        <DraggableFlatList
          containerStyle={{padding: 20}}
          data={coursePlaces}
          onDragEnd={({data}) => setCoursePlaces(data)}
          keyExtractor={item => item.id.toString()}
          renderItem={CourseEditListItem}
        />
        <StyledView style={{justifyContent: 'center'}}>
          <CustomButton
            text={'경로 계산하기'}
            onPress={async () => {
              await calcRoute();
              setRouteModalVisible(true);
            }}
            buttonStyle={{
              ...styles.button,
              backgroundColor: theme.colors.surfaceVariant,
            }}
            textStyle={styles.buttonText}
          />
        </StyledView>
      </SafeAreaView>
      <Modal
        testID={'modal'}
        isVisible={routeModalVisible}
        onSwipeComplete={() => setRouteModalVisible(false)}
        swipeDirection={['down']}
        style={styles.view}>
        <StyledView style={styles.modalView}>
          <CustomMapView
            places={[clientPlace, ...coursePlaces]}
            viewStyle={{
              width: screenWidth * 0.8,
              height: screenWidth * 0.8,
            }}
            useIndex={true}
            routeCoordinates={routeCoordinates}
          />
          <ModalInfoText>
            예상 이동시간 : 총{' '}
            {calcTime(routeInfo.duration).hour
              ? calcTime(routeInfo.duration).hour + '시간 '
              : ' '}
            {calcTime(routeInfo.duration).minute}분
          </ModalInfoText>
          <ModalInfoText>
            예상 비용 : 총{' '}
            {routeInfo.taxiFare + routeInfo.fuelPrice + routeInfo.tollFare}원
          </ModalInfoText>
          <ModalPriceText>
            (대여료 {routeInfo.taxiFare}원 + 유류비 {routeInfo.fuelPrice}원 +
            통행 요금 {routeInfo.tollFare}원)
          </ModalPriceText>
          <View style={{flexDirection: 'row'}}>
            <CustomButton
              text={'여정 시작하기'}
              onPress={() => journeyStartBtnPressed()}
              buttonStyle={{
                ...styles.modalButton,
                backgroundColor: theme.colors.surfaceVariant,
              }}
              textStyle={styles.modalButtonText}
            />
            <CustomButton
              text={'취소하기'}
              onPress={() => setRouteModalVisible(false)}
              buttonStyle={{
                ...styles.modalButton,
                backgroundColor: theme.colors.tertiary,
              }}
              textStyle={styles.modalButtonText}
            />
          </View>
        </StyledView>
      </Modal>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 14,
    height: 50,
    marginTop: 20,
    borderRadius: 30,
  },
  modalButton: {
    width: 150,
    padding: 14,
    height: 50,
    marginTop: 30,
    borderRadius: 30,
    margin: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: screenHeight * 0.2,
    alignItems: 'center',
    flex: 1,
  },
});

const StyledView = styled(View)`
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const GradientBackground = styled(LinearGradient)`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TitleText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 20px;
`;

const DescText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const ModalInfoText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`;

const ModalPriceText = styled(Text)`
  font-size: 10px;
  font-weight: 300;
  margin-top: 5px;
`;

export default CourseEditScreen;

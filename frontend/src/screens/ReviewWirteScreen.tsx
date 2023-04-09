import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CustomButton, ReviewCourseItem, ReviewPlaceItem} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {filterRealPlace, placesToPlaceReviewRequests} from '../utils';
import {ReviewRequest} from '../types';
import {useEffect} from 'react';
import styled from 'styled-components';
import {setCourseReview, setplaceReviews} from '../redux/slices/reviewSlice';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {useCheckCourseExistQuery} from '../apis/courseApi';
import {useRegistReviewMutation} from '../apis/reviewApi';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {L2_AppDrawerParamList} from '../navigations/L2_AppDrawerNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {L4_JourneyEndStackParamList} from '../navigations/L4_JourneyEndStackNavigator';
import {ScrollView} from 'react-native-gesture-handler';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

type ReviewWirteScreenProps = CompositeScreenProps<
  NativeStackScreenProps<L4_JourneyEndStackParamList, 'Review'>,
  DrawerScreenProps<L2_AppDrawerParamList>
>;

const ReviewWirteScreen: React.FC<ReviewWirteScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const placeList = useSelector((state: RootState) =>
    filterRealPlace(state.journey.placeList),
  );
  const {placeReviews, courseReview} = useSelector(
    (state: RootState) => state.review,
  );

  const {data: isCourseExist, isFetching: isCourseExistFetching} =
    useCheckCourseExistQuery(placeList.map(place => place.id));

  const [registReview, registReviewStatus] = useRegistReviewMutation();

  useEffect(() => {
    dispatch(setplaceReviews(placesToPlaceReviewRequests(placeList)));
  }, []);

  useEffect(() => {
    if (isCourseExist && !isCourseExist.newCourse) {
      const {courseId} = isCourseExist;
      dispatch(setCourseReview({...courseReview, courseId}));
    }
  }, [isCourseExist]);

  useEffect(() => {
    if (registReviewStatus.isSuccess) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: '리뷰가 등록되었습니다.',
      });
      navigation.navigate('Main');
    } else if (registReviewStatus.isError) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '리뷰가 등록되지 않았습니다.',
        textBody: '잠시 후에 다시 시도해주세요.',
      });
    }
  }, [registReviewStatus]);

  const submitBtnPressed = () => {
    const newReviewRequest: ReviewRequest = {
      placeReviews,
      courseReview,
    };
    registReview(newReviewRequest);
  };

  const reviewScreenContent = () => {
    if (isCourseExistFetching) {
      return (
        <ActivityIndicator
          size={'large'}
          style={{flex: 1}}
          animating={true}
          color={theme.colors.onPrimary}
        />
      );
    } else {
      return (
        <>
          <TitleText style={{color: theme.colors.surfaceVariant}}>
            리뷰 작성하기
          </TitleText>
          {placeList.map((place, index) => (
            <ReviewPlaceItem key={place.id} place={place} index={index + 1} />
          ))}
          <ReviewCourseItem isFirstTime={isCourseExist?.newCourse ?? true} />
          <CustomButton
            text={'완료'}
            onPress={() => submitBtnPressed()}
            buttonStyle={{
              ...styles.button,
              backgroundColor: theme.colors.surfaceVariant,
            }}
            textStyle={styles.buttonText}
          />
        </>
      );
    }
  };

  return (
    <StyledSafeAreaView>
      <StyledScrollView>
        <ScreenContainer>{reviewScreenContent()}</ScreenContainer>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    padding: 14,
    borderRadius: 30,
    marginTop: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const ScreenContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TitleText = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  margin: 20px 0px 40px 0px;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
`;

export default ReviewWirteScreen;

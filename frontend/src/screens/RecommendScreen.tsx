import {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, useTheme, SegmentedButtons} from 'react-native-paper';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import PlacesRecommendScreen from './PlacesRecommendScreen';
import CoursesRecommendScreen from './CoursesRecommendScreen';
import {setPlaceList} from '../redux/slices/placeSlice';
import {setTagList} from '../redux/slices/tagSlice';
import {Tag, Place, Category} from '../types';
import type {RootState} from '../redux/store';

const tags: Tag[] = [
  {
    id: 0,
    name: '맛있는',
    category: Category.음식점,
  },
  {
    id: 1,
    name: '청결한',
    category: Category.음식점,
  },
  {
    id: 2,
    name: '유명한',
    category: Category.음식점,
  },
];
const places: Place[] = [
  {
    id: 0,
    name: '허니치즈 순대국',
    image: 'https://i.imgur.com/UYiroysl.jpg',
    ratingSum: 17,
    ratingCount: 4,
    region: '노원구 중계 14동',
    lon: 126.97944891,
    lat: 37.57171765,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: '맛있는 | 분위기 좋은',
  },
  {
    id: 1,
    name: '허니치즈 순대국',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
    ratingSum: 17,
    ratingCount: 4,
    region: '노원구 중계 14동',
    lon: 126.98197125,
    lat: 37.58459777,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: '맛있는 | 분위기 좋은',
  },
  {
    id: 2,
    name: '허니치즈 순대국',
    image: 'https://i.imgur.com/MABUbpDl.jpg',
    ratingSum: 17,
    ratingCount: 4,
    region: '노원구 중계 14동',
    lon: 127.00569602,
    lat: 37.57033808,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: '맛있는 | 분위기 좋은',
  },
  {
    id: 3,
    name: '허니치즈 순대국',
    image: 'https://i.imgur.com/KZsmUi2l.jpg',
    ratingSum: 17,
    ratingCount: 4,
    region: '노원구 중계 14동',
    lon: 126.98978922,
    lat: 37.57409672,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: '맛있는 | 분위기 좋은',
  },
];

const RecommendScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [recommendType, setRecommendType] = useState<string>('0');
  const recommendTypeChangeButtons = [
    {
      value: '0',
      label: '장소',
      icon: 'map-marker',
      checkedColor: 'white',
      uncheckedColor: 'white',
      onPress: () => {},
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '0' ? theme.colors.primary : theme.colors.shadow,
      },
    },
    {
      value: '1',
      label: '코스',
      icon: 'routes',
      checkedColor: 'white',
      uncheckedColor: 'white',
      onPress: () => {},
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '1' ? theme.colors.primary : theme.colors.shadow,
      },
    },
  ];

  useEffect(() => {
    dispatch(setPlaceList(places));
    dispatch(setTagList(tags));
  }, []);

  return (
    <AlertNotificationRoot theme={'light'}>
      <GradientBackground colors={['#70558e7a', '#df94c283', '#ffbdc1b0']}>
        <SafeAreaView style={{flex: 1}}>
          <StyledView style={{justifyContent: 'space-between'}}>
            <SegmentedButtons
              style={{width: 200}}
              value={recommendType}
              onValueChange={setRecommendType}
              buttons={recommendTypeChangeButtons}
            />
            <IconButton
              icon="home"
              size={30}
              onPress={() => {
                console.log('hello');
              }}
            />
          </StyledView>
          {recommendType === '0' ? (
            <PlacesRecommendScreen />
          ) : (
            <CoursesRecommendScreen />
          )}
        </SafeAreaView>
      </GradientBackground>
    </AlertNotificationRoot>
  );
};

const StyledView = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;

const GradientBackground = styled(LinearGradient)`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default RecommendScreen;

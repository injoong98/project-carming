import {View, Text, Button, ImageBackground, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {logout} from '../redux/slices/authSlice';
import {RootState} from '../redux/store';
import MainMap from './../components/MainMap';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import PopularPlacesList from '../components/PopularPlacesList';
import PopularCoursesList from '../components/PopularCoursesList';
import {Category, Course, Place, Tag} from '../types';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {token, memberInfo} = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <HomeContainer>
          <MainText
            style={{
              fontSize: 19,
              color: '#7173C9',
              marginBottom: '1%',
            }}>
            오늘의 여정 목적지는 어디인가요?
          </MainText>
          <MainText
            style={{fontSize: 13, color: '#DF94C2', marginBottom: '2%'}}>
            - 지역을 선택해주세요 -
          </MainText>
          <MainMap />
          <Container style={{}}>
            <PopularPlacesList placeList={places} />
            {/* <Button title="로그아웃" onPress={handleLogout} color={'grey'} /> */}
          </Container>
          <Container style={{}}>
            <PopularCoursesList courseList={courses} />
          </Container>
        </HomeContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeContainer = styled(View)`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding-top: 10%;
  padding-bottom: 10%;
`;

const Container = styled(View)`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MainText = styled(Text)`
  font-family: 'SeoulNamsanM';
`;

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
    keyword: ['맛있는', '분위기 좋은'],
  },
  {
    id: 1,
    name: '파리 엉터리 생고기',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
    ratingSum: 222,
    ratingCount: 80,
    region: '노원구 중계 14동',
    lon: 126.98197125,
    lat: 37.58459777,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: ['맛있는', '분위기 좋은'],
  },
  {
    id: 2,
    name: '경복궁',
    image: 'https://i.imgur.com/MABUbpDl.jpg',
    ratingSum: 12,
    ratingCount: 3,
    region: '노원구 중계 14동',
    lon: 127.00569602,
    lat: 37.57033808,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: ['맛있는', '분위기 좋은'],
  },
  {
    id: 3,
    name: '상파울로 엽기 떡볶이',
    image: 'https://i.imgur.com/KZsmUi2l.jpg',
    ratingSum: 2763,
    ratingCount: 839,
    region: '노원구 중계 14동',
    lon: 126.98978922,
    lat: 37.60409672,
    tel: '010-1577-1577',
    category: Category.음식점,
    keyword: ['맛있는', '분위기 좋은'],
  },
];
const courses: Course[] = [
  {
    id: 0,
    name: '최고의 코스',
    regions: ['은평구', '노원구'],
    places: places,
    ratingCount: 17,
    ratingSum: 74,
  },
  {
    id: 1,
    name: '최고의 코스',
    regions: ['은평구', '노원구'],
    places: places,
    ratingCount: 17,
    ratingSum: 74,
  },
  {
    id: 2,
    name: '최고의 코스',
    regions: ['은평구', '노원구'],
    places: places,
    ratingCount: 17,
    ratingSum: 74,
  },
  {
    id: 3,
    name: '최고의 코스',
    regions: ['은평구', '노원구'],
    places: places,
    ratingCount: 17,
    ratingSum: 74,
  },
];

export default HomeScreen;

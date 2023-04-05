import {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Course, Place} from '../types';
import styled from 'styled-components';
import RatingStar from './RatingStar';
import {calcRating} from '../utils';
import {addPlaceListToPreCart} from '../redux/slices/mainSlice';
import {RootState} from '../redux/store';
import CustomMapView from './CustomMapView';

export interface MainCourseCardModalProps {
  isVisible: boolean;
  onClose: () => void;
  course: Course;
}

const MainCourseCardModal: React.FC<MainCourseCardModalProps> = ({
  isVisible,
  onClose,
  course,
}) => {
  const dispatch = useDispatch();

  const rating = calcRating(course.ratingSum, course.ratingCount);

  const preCart = useSelector((state: RootState) => state.main.preCart);
  const isIncluded = course.places.every(place =>
    preCart.some(preCartPlace => preCartPlace.id === place.id),
  );

  const handleCancel = () => {
    onClose();
  };

  const handleAddPress = () => {
    dispatch(addPlaceListToPreCart(course.places));
  };

  // 모달을 띄우기 위한 추가적인 정보 불러오기
  const selectedCourseInstance = useSelector(
    (state: RootState) => state.main.selectedPopularCourse,
  );
  const selectedCourseInstanceReviews = useSelector(
    (state: RootState) => state.main.selectedPopularCourseReviews,
  );
  useEffect(() => {
    console.log(selectedCourseInstance);
    console.log(selectedCourseInstanceReviews);
  }, [selectedCourseInstance, selectedCourseInstanceReviews]);

  const carImages = [
    require('../assets/images/car1.png'),
    require('../assets/images/car2.png'),
    require('../assets/images/car3.png'),
    require('../assets/images/car4.png'),
    require('../assets/images/car5.png'),
    require('../assets/images/car6.png'),
    require('../assets/images/car7.png'),
  ];
  function getRandomCarImage() {
    const randomIndex = Math.floor(Math.random() * carImages.length);
    return carImages[randomIndex];
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <BackgroundView>
        <ModalContainer>
          <ContentsContainer>
            <ImgView>
              <CustomMapView
                viewStyle={{flex: 1}}
                places={course.places}
                useIndex={true}
              />
            </ImgView>
            <ContentView
              style={{
                justifyContent: 'space-between',
                marginTop: '2%',
                marginBottom: '5%',
                flexWrap: 'wrap',
              }}>
              <CustomText
                style={{
                  fontFamily: 'SeoulNamsanB',
                  fontSize: 13,
                  marginVertical: '1%',
                }}>
                {course.name}
              </CustomText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RatingStar
                  rating={rating}
                  containerStyle={{marginRight: 8}}
                  iconStyle={{margin: -8}}
                  inactiveColor="grey"
                />
                <RatingText>
                  {rating} ({course.ratingCount})
                </RatingText>
              </View>
            </ContentView>
            <ContentView style={{marginBottom: '6%'}}>
              <ScrollView
                horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                style={styles.textContainer}>
                {course.places &&
                  course.places.map((place, index) => (
                    <View key={index} style={styles.textContainer}>
                      <Text style={[styles.text]}>{place.name}</Text>
                      {index !== course.places.length - 1 && (
                        <Text style={[styles.text]}> - </Text>
                      )}
                    </View>
                  ))}
              </ScrollView>
            </ContentView>
            <ContentView style={{justifyContent: 'flex-end'}}>
              <CustomText>
                {' '}
                총 {selectedCourseInstanceReviews.length}개의 리뷰
              </CustomText>
            </ContentView>
            <ContentView
              style={{justifyContent: 'center', alignItems: 'flex-start'}}>
              <FlatList
                data={selectedCourseInstanceReviews}
                keyExtractor={(item, index) => index.toString()}
                style={(styles.textContainer, {width: '100%', height: '45%'})}
                renderItem={({item}) => (
                  <View style={{marginBottom: '4%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        marginBottom: '2%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <ImageBackground
                          source={getRandomCarImage()}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 5,
                            overflow: 'hidden',
                            marginRight: '5%',
                          }}
                        />
                        <View>
                          <CustomText
                            style={{
                              fontFamily: 'SeoulNamsanEB',
                              fontSize: 12,
                              marginVertical: '1%',
                            }}>
                            {item.nickname}
                          </CustomText>
                          <CustomText
                            style={{
                              fontFamily: 'SeoulNamsanM',
                              fontSize: 10,
                              marginVertical: '1%',
                            }}>
                            {item.createdTime}
                          </CustomText>
                        </View>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RatingStar
                          rating={rating}
                          containerStyle={{marginRight: 8}}
                          iconStyle={{margin: -8}}
                          inactiveColor="grey"
                          iconSize={12}
                        />
                      </View>
                    </View>
                    <View>
                      <CustomText
                        style={{
                          fontFamily: 'SeoulNamsanM',
                          fontSize: 14,
                          marginLeft: '3%',
                        }}>
                        {item.content}
                      </CustomText>
                    </View>
                  </View>
                )}
              />
              {/* <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={(styles.textContainer, {width: '100%', height: '45%'})}>
                {selectedCourseInstanceReviews &&
                  selectedCourseInstanceReviews.map((review, index) => (
                    <View key={index} style={{marginBottom: '4%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          marginBottom: '2%',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <ImageBackground
                            source={require('../assets/images/login_screen.png')}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                              overflow: 'hidden',
                              marginRight: '5%',
                            }}></ImageBackground>
                          <View>
                            <CustomText
                              style={{
                                fontFamily: 'SeoulNamsanEB',
                                fontSize: 12,
                                marginVertical: '1%',
                              }}>
                              {review.nickname}
                            </CustomText>
                            <CustomText
                              style={{
                                fontFamily: 'SeoulNamsanM',
                                fontSize: 10,
                                marginVertical: '1%',
                              }}>
                              {review.createdTime}
                            </CustomText>
                          </View>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <RatingStar
                            rating={rating}
                            containerStyle={{marginRight: 8}}
                            iconStyle={{margin: -8}}
                            inactiveColor="grey"
                            iconSize={12}
                          />
                        </View>
                      </View>
                      <View>
                        <CustomText
                          style={{
                            fontFamily: 'SeoulNamsanM',
                            fontSize: 14,
                            marginLeft: '3%',
                          }}>
                          {review.content}
                        </CustomText>
                      </View>
                    </View>
                  ))}
              </ScrollView> */}
            </ContentView>
          </ContentsContainer>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={handleAddPress}
              style={{
                backgroundColor: 'black',
                paddingHorizontal: 15,
                padding: 7,
                borderRadius: 5,
                alignItems: 'center',
                opacity: isIncluded ? 0.5 : 1, // disabled 상태일 때 투명도 설정
              }}
              disabled={isIncluded}>
              {isIncluded ? (
                <Text style={{fontFamily: 'SeoulNamsanM', color: '#fff'}}>
                  담은 코스
                </Text>
              ) : (
                <Text style={{fontFamily: 'SeoulNamsanM', color: '#fff'}}>
                  지금 출발
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                backgroundColor: '#a5a5a5',
                paddingHorizontal: 15,
                padding: 7,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: 'SeoulNamsanM', color: '#fff'}}>
                나가기
              </Text>
            </TouchableOpacity>
          </View>
        </ModalContainer>
      </BackgroundView>
    </Modal>
  );
};

const BackgroundView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.8);
  height: 75%;
  width: 85%;
  border-radius: 3px;
  padding: 5%;
  justify-content: space-between;
`;

const ContentsContainer = styled(View)`
  flex: 1;
`;
const ContentView = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4%;
`;

const ImgView = styled(View)`
  height: 55%;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 3%;
`;
const PlaceImg = styled(ImageBackground)`
  height: 100%;
  width: 100%;
`;
const CustomText = styled(Text)`
  font-family: SeoulNamsanB;
  font-size: 12px;
`;
const RatingText = styled(Text)`
  color: black;
  font-size: 13px;
`;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  text: {
    fontFamily: 'SeoulNamsanM',
    color: 'black',
    fontSize: 18,
  },
});
export default MainCourseCardModal;

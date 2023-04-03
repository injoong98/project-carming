import {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import {useVerifyMutation} from '../apis/memberRegistApi';
import {useDispatch, useSelector} from 'react-redux';
import {verifySuccess} from '../redux/slices/authSlice';
import {Course, Place} from '../types';
import styled from 'styled-components';
import RatingStar from './RatingStar';
import {calcRating} from '../utils';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {addPlaceToPlaceCart} from '../redux/slices/placeSlice';
import {addPlaceToPreCart} from '../redux/slices/mainSlice';
import {RootState} from '../redux/store';

export interface MainPlaceCardModalProps {
  isVisible: boolean;
  onClose: () => void;
  place: Place;
}

const MainPlaceCardModal: React.FC<MainPlaceCardModalProps> = ({
  isVisible,
  onClose,
  place,
}) => {
  const dispatch = useDispatch();

  const rating = calcRating(place.ratingSum, place.ratingCount);

  const preCart = useSelector((state: RootState) => state.main.preCart);
  const isIncluded = preCart.includes(place);

  const handleCancel = () => {
    onClose();
  };

  const handleAddPress = () => {
    dispatch(addPlaceToPreCart(place));
  };

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
              <PlaceImg source={{uri: place.image}} />
            </ImgView>
            <ContentView style={{justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontFamily: 'SeoulNamsanEB',
                  fontSize: 18,
                  marginTop: '1%',
                }}>
                {place.name}
              </CustomText>
              <View style={{flexDirection: 'row'}}>
                <RatingStar
                  rating={rating}
                  containerStyle={{marginRight: 8}}
                  iconStyle={{margin: -8}}
                  inactiveColor="grey"
                />
                <RatingText>
                  {rating} ({place.ratingCount})
                </RatingText>
              </View>
            </ContentView>
            <ContentView>
              <SIcon
                name={'location-pin'}
                style={{fontSize: 14, marginRight: 5}}
              />
              <CustomText>{place.region}</CustomText>
            </ContentView>
            <ContentView>
              <MIcon name={'call'} style={{fontSize: 14, marginRight: 5}} />
              <CustomText>{place.tel}</CustomText>
            </ContentView>
            <ContentView>
              {place.keyword?.map((keyword, index) => {
                return (
                  <CustomText
                    key={index}
                    style={{fontFamily: 'SeoulNamsanEB', fontSize: 14}}>
                    #{keyword}
                  </CustomText>
                );
              })}
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
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  담은 장소
                </Text>
              ) : (
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  미리 담기
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
              <Text style={{color: '#fff', fontWeight: 'bold'}}>나가기</Text>
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
  height: 70%;
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
  height: 75%;
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
export default MainPlaceCardModal;

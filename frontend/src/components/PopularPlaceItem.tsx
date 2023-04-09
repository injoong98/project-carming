import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {Place} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {calcRating} from '../utils';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSelectedPlace,
  addSelectedPlaceInstance,
} from '../redux/slices/mainSlice';
import {REACT_APP_API_URL, REST_API_URL} from '@env';
import {RootState} from '../redux/store';

interface PopularPlaceItemProps {
  place: Place;
  index: number;
  onPress?: () => void;
}

const PopularPlaceItem: React.FC<PopularPlaceItemProps> = ({
  place,
  index,
  onPress,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const headers = token ? {Authorization: token} : {};
  const handlePress = async () => {
    dispatch(addSelectedPlace(place));
    // 선택된 place의 id를 기반으로 추가적인 정보를 불러옴
    console.log(place);
    try {
      if (onPress) onPress();
      const response = await fetch(
        `${REST_API_URL}/places/popular/${place.id}`,
        {method: 'GET', headers},
      ); // 예시: 서버 API 엔드포인트
      const data = await response.json();
      // data를 기반으로 상태 업데이트
      // console.log('Selected Place Instance:', data);
      dispatch(addSelectedPlaceInstance(data));
    } catch (error) {
      // 에러 처리
      console.error('Failed to fetch selected place:', error);
    }
  };
  const rating = calcRating(place.ratingSum, place.ratingCount);

  return (
    <>
      <TouchableContainer onPress={handlePress}>
        <CardContainer>
          <ImageBackGround source={{uri: place.image}}>
            <ContentContainer>
              <LocationText>
                <Icon name="map-marker" style={{fontSize: 10}} />
                {' ' + place.region}
              </LocationText>
              <TitleContainer>
                <TitleText numberOfLines={1}>
                  #{index + 1} {place.name}
                </TitleText>
                <View style={{flexDirection: 'row'}}>
                  <IconButton
                    icon="star"
                    style={{margin: -8}}
                    iconColor="white"
                    size={14}
                  />
                  <RatingText>{rating}</RatingText>
                </View>
              </TitleContainer>
            </ContentContainer>
          </ImageBackGround>
        </CardContainer>
      </TouchableContainer>
    </>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  height: 125px;
  width: 125px;
  padding: 5px;
`;

const CardContainer = styled(View)`
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
`;

const LocationText = styled(Text)`
  color: white;
  font-size: 10px;
  margin-bottom: 5px;
`;

const TitleText = styled(Text)`
  width: 70%;
  color: white;
  font-size: 10px;
  overflow: hidden;
  max-height: 24px;
  line-height: 12px;
`;

const RatingText = styled(Text)`
  color: white;
  font-size: 10px;
`;

const ImageBackGround = styled(ImageBackground)`
  flex: 1;
  flex-direction: column-reverse;
  align-items: center;
`;

const ContentContainer = styled(View)`
  background-color: #0000007a;
  width: 100%;
  justify-content: center;
  padding: 4px 7px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export default PopularPlaceItem;

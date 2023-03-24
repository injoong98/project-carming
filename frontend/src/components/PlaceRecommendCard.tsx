import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import styled from 'styled-components';
import {Place} from '../types';
import RatingStar from './RatingStar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PlaceRecommendCardProps {
  item: Place;
  index: number;
  onPress?: () => void;
}

const PlaceRecommendCard: React.FC<PlaceRecommendCardProps> = ({
  item,
  index,
}) => {
  const rating = Math.round((item.ratingSum / item.ratingCount) * 10) / 10;
  return (
    <CardContainer>
      <ImageBackGround source={{uri: item.image}}>
        <ContentContainer>
          <LocationText>
            <Icon name="map-marker" />
            {' ' + item.region}
          </LocationText>
          <TitleContainer>
            <TitleText>
              #{index + 1} {item.name}
            </TitleText>
            <View style={{flexDirection: 'row'}}>
              <RatingStar
                rating={rating}
                containerStyle={{marginRight: 8}}
                iconStyle={{margin: -8}}
              />
              <RatingText>
                {rating} ({item.ratingCount})
              </RatingText>
            </View>
          </TitleContainer>
        </ContentContainer>
      </ImageBackGround>
    </CardContainer>
  );
};

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
  color: white;
  font-size: 16px;
`;

const RatingText = styled(Text)`
  color: white;
  font-size: 13px;
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
  padding: 10px 15px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default PlaceRecommendCard;

import React from 'react';
import {ImageBackground, View} from 'react-native';
import styled from 'styled-components';
import {Place} from '../types';
import RecommendCardDesc from './RecommendCardDesc';

interface PlaceRecommendCardProps {
  item: Place;
  index: number;
  onPress?: () => void;
}

const PlaceRecommendCard: React.FC<PlaceRecommendCardProps> = ({
  item,
  index,
}) => {
  return (
    <CardContainer>
      <ImageBackGround source={{uri: item.image}}>
        <RecommendCardDesc item={item} index={index} />
      </ImageBackGround>
    </CardContainer>
  );
};

const CardContainer = styled(View)`
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
`;

const ImageBackGround = styled(ImageBackground)`
  flex: 1;
  flex-direction: column-reverse;
  align-items: center;
`;

export default PlaceRecommendCard;

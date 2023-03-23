import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import styled from 'styled-components';
import {Place} from '../types';
import MapView from 'react-native-maps';

interface CourseRecommendCardProps {
  item: Place;
  index: number;
  onPress?: () => void;
}

const CourseRecommendCard: React.FC<CourseRecommendCardProps> = ({
  item,
  index,
}) => {
  const rating = Math.round((item.ratingSum / item.ratingCnt) * 10) / 10;
  return (
    <CardContainer pointerEvents="none">
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </CardContainer>
  );
};

const CardContainer = styled(View)`
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
`;

export default CourseRecommendCard;

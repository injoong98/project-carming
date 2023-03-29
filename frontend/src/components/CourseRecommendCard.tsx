import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {Coordinate, Course} from '../types';
import MapView from 'react-native-maps';
import {calcCoordinates} from '../utils';
import MapMarker from './MapMarker';
import MapPolyline from './MapPolyline';

interface CourseRecommendCardProps {
  item: {course: Course; isActive: boolean};
  index: number;
  onPress?: () => void;
}

const CourseRecommendCard: React.FC<CourseRecommendCardProps> = ({item}) => {
  const {course, isActive} = item;
  const coordinates = course.places.map<Coordinate>(place => {
    return {latitude: place.lat, longitude: place.lon};
  });
  const {midLat, midLon, latDelta, lonDelta} = calcCoordinates(coordinates);
  return (
    <CardContainer pointerEvents="none">
      {isActive ? (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: midLat + 0.2 * latDelta,
            longitude: midLon,
            latitudeDelta: latDelta,
            longitudeDelta: lonDelta,
          }}>
          <MapPolyline coordinates={[...coordinates]} />
          {course.places.map((place, index) => (
            <MapMarker key={place.id} place={place} index={index} />
          ))}
        </MapView>
      ) : (
        <View style={{flex: 1, backgroundColor: 'black'}}></View>
      )}
    </CardContainer>
  );
};

const CardContainer = styled(View)`
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
`;

export default CourseRecommendCard;

import React from 'react';
import {Image, Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import type {Coordinate, Place} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import styled from 'styled-components';
import RatingStar from './RatingStar';
import {calcRating, isPlace} from '../utils';

export type iconPlace = {
  iconName: string;
  lon: number;
  lat: number;
};

interface MapMarkerProps {
  place: Place | iconPlace;
  index: number;
  useIndex?: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({place, index, useIndex}) => {
  const theme = useTheme();

  if (isPlace(place)) {
    const rating = calcRating(place.ratingSum, place.ratingCount);
    return (
      <Marker
        coordinate={{
          latitude: place.lat,
          longitude: place.lon,
        }}>
        <StyledMapMarkerContainer>
          <Image
            source={{uri: place.image}}
            style={{width: 50, height: 50, borderRadius: 10}}
          />
          <RatingStar rating={rating} iconSize={15} iconStyle={{margin: -8}} />
          <StyledMapMarkerText>
            {useIndex ? `#${index + 1} ` : ' '}
            {place.name}
          </StyledMapMarkerText>
          <Icon
            name={'map-marker'}
            color={'#000'}
            size={30}
            style={{marginBottom: -30}}
          />
        </StyledMapMarkerContainer>
      </Marker>
    );
  } else {
    return (
      <Marker
        coordinate={{
          latitude: place.lat,
          longitude: place.lon,
        }}>
        <MarkerIcon
          style={{backgroundColor: theme.colors.onPrimary}}
          name={place.iconName}
          color={'#fff'}
          size={30}
        />
      </Marker>
    );
  }
};

const StyledMapMarkerContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 10px;
`;

const StyledMapMarkerText = styled(Text)`
  color: white;
  font-size: 10px;
  padding: 3px;
  margin: 3px;
  border-radius: 5px;
  background-color: #0000005c;
  font-weight: bold;
`;

const MarkerIcon = styled(Icon)`
  padding: 10px;
  border-radius: 25px;
`;

export default MapMarker;

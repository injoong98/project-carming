import React from 'react';
import {Image, Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import type {Coordinate, Place} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import styled from 'styled-components';
import RatingStar from './RatingStar';
import {calcRating} from '../utils';

interface MapMarkerProps {
  place?: Place;
  iconPlace?: {
    iconName: string;
    coordinate: Coordinate;
  };
  index?: number;
}

const MapMarker: React.FC<MapMarkerProps> = ({place, iconPlace, index}) => {
  const theme = useTheme();

  if (place) {
    const rating = calcRating(place.ratingSum, place.ratingCount);
    return (
      <Marker
        coordinate={{
          latitude: place.lat,
          longitude: place.lon,
        }}>
        <StyledMapMarkerContainer
        // style={{backgroundColor: theme.colors.shadow}}
        >
          <Image
            source={{uri: place.image}}
            style={{width: 50, height: 50, borderRadius: 10}}
          />
          <RatingStar rating={rating} iconSize={15} iconStyle={{margin: -8}} />
          <StyledMapMarkerText>
            #{index + 1} {place.name}
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
  }

  if (iconPlace) {
    return (
      <Marker
        coordinate={{
          latitude: iconPlace.coordinate.latitude,
          longitude: iconPlace.coordinate.longitude,
        }}>
        <Icon name={iconPlace.iconName} color={'#FFF'} size={18} />
      </Marker>
    );
  }

  return <></>;
};

const StyledMapMarkerContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 10px;
  /* width: 200px;
  height: 200px; */
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

export default MapMarker;

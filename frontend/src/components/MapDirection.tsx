import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from '@env';
import type {Coordinate} from '../types';

interface MapDirectionProps {
  origin: Coordinate;
  destination: Coordinate;
  waypoints?: Coordinate[];
}

const MapDirection: React.FC<MapDirectionProps> = ({
  origin,
  destination,
  waypoints,
}) => {
  return (
    <MapViewDirections
      origin={origin}
      language={'ko'}
      region={'KR'}
      destination={destination}
      waypoints={waypoints}
      apikey={GOOGLE_MAPS_API_KEY}
      mode={'WALKING'}
      strokeWidth={3}
      strokeColor="hotpink"
      onStart={params => {
        console.log(
          `Started routing between "${params.origin}" and "${params.destination}"`,
        );
      }}
      onReady={result => {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min.`);
      }}
      onError={errorMessage => {
        console.log(errorMessage);
      }}
    />
  );
};

export default MapDirection;

import {Coordinate, Course, Place} from '../types';
import MapView from 'react-native-maps';
import {calcCoordinates, isPlace, placesToCoordinates} from '../utils';
import MapMarker, {iconPlace} from './MapMarker';
import MapPolyline from './MapPolyline';
import {ViewStyle} from 'react-native/types';

interface CustomMapViewProps {
  places: (Place | iconPlace)[];
  viewStyle?: ViewStyle;
  routeCoordinates?: Coordinate[];
  latitudeOffset?: number;
  useIndex?: boolean;
}

const CustomMapView: React.FC<CustomMapViewProps> = ({
  places,
  viewStyle,
  routeCoordinates,
  latitudeOffset,
  useIndex,
}) => {
  const coordinates = placesToCoordinates(places);
  const {midLat, midLon, latDelta, lonDelta} = calcCoordinates(coordinates);

  const mapMarker = (place: Place | iconPlace, index: number) => {
    if (isPlace(place)) {
      return (
        <MapMarker
          key={place.id}
          place={place}
          index={index}
          useIndex={useIndex}
        />
      );
    } else {
      return <MapMarker key={place.iconName} place={place} index={index} />;
    }
  };

  return (
    <MapView
      style={viewStyle}
      initialRegion={{
        latitude: midLat + (latitudeOffset ?? 0.2) * latDelta,
        longitude: midLon,
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta,
      }}>
      <MapPolyline coordinates={routeCoordinates ?? []} />
      {places.map((place, index) => mapMarker(place, index))}
    </MapView>
  );
};

export default CustomMapView;

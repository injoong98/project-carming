import {Polyline} from 'react-native-maps';
import {useTheme} from 'react-native-paper';
import {Coordinate} from '../types';

interface MapPolylineProps {
  coordinates: Coordinate[];
}

const MapPolyline: React.FC<MapPolylineProps> = ({coordinates}) => {
  const theme = useTheme();
  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={theme.colors.primary}
      strokeWidth={3}
    />
  );
};

export default MapPolyline;

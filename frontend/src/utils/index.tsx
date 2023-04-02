import {iconPlace} from '../components/MapMarker';
import {TagSliceState} from '../redux/slices/tagSlice';
import {Category, Coordinate, Course, Place, Tag} from '../types';

const calcRating = (sum: number, count: number) => {
  return Math.round((sum / count) * 10) / 10;
};

const calcCoordinates = (coordinates: Coordinate[]) => {
  let maxLat = Number.MIN_VALUE;
  let maxLon = Number.MIN_VALUE;
  let minLat = Number.MAX_VALUE;
  let minLon = Number.MAX_VALUE;

  coordinates.forEach(coordinate => {
    maxLat = Math.max(maxLat, coordinate.latitude);
    maxLon = Math.max(maxLon, coordinate.longitude);
    minLat = Math.min(minLat, coordinate.latitude);
    minLon = Math.min(minLon, coordinate.longitude);
  });

  const midLat = (maxLat + minLat) / 2;
  const midLon = (maxLon + minLon) / 2;

  const COORDINATE_DELTA = 2;
  const latDelta = (maxLat - minLat) * COORDINATE_DELTA;
  const lonDelta = (maxLon - minLon) * COORDINATE_DELTA;

  return {maxLat, midLat, minLat, maxLon, midLon, minLon, latDelta, lonDelta};
};

const calcTime = (millisec: number): {hour: number; minute: number} => {
  const hour = Math.floor(millisec / 3600000);
  const minute = Math.floor((millisec % 3600000) / 60000);
  return {hour, minute};
};

const calcDist = (meter: number): number => {
  return Math.round(meter / 100) / 10;
};

const pathToCoordinates = (path: any[]): Coordinate[] => {
  return path.map((coordinate: any[]): Coordinate => {
    return {longitude: coordinate[0], latitude: coordinate[1]};
  });
};

const placeToCoordinate = (place: Place | iconPlace): Coordinate => {
  return {latitude: place.lat, longitude: place.lon};
};

const placesToCoordinates = (places: (Place | iconPlace)[]): Coordinate[] => {
  return places.map<Coordinate>(place => {
    return {latitude: place.lat, longitude: place.lon};
  });
};

const placeToIconPlace = (
  iconName: string,
  place: Place | iconPlace,
): iconPlace => {
  return coordinateToIconPlace(iconName, placeToCoordinate(place));
};

const coordinateToIconPlace = (
  iconName: string,
  coordinate: Coordinate,
): iconPlace => {
  return {iconName, lat: coordinate.latitude, lon: coordinate.longitude};
};

const isPlace = (arg: any): arg is Place => {
  return (
    arg.lon !== undefined && arg.lat !== undefined && arg.image !== undefined
  );
};

const isCourse = (arg: any): arg is Course => {
  return arg.places !== undefined;
};

const redisPositionToCoordinate = (redisPos: {
  lat: number;
  lon: number;
}): Coordinate => {
  return {latitude: redisPos.lat, longitude: redisPos.lon};
};

const coordinateToRedisPosition = (
  coordinate: Coordinate,
): {lat: number; lon: number} => {
  return {lat: coordinate.latitude, lon: coordinate.longitude};
};

const textToJson = (text: string): string => {
  return JSON.parse('"' + text.replaceAll("'", '\\"') + '"');
};

const calcArrivalTime = (
  coord1: Coordinate,
  coord2: Coordinate,
): {hour: number; minute: number} => {
  const lat1 = coord1.latitude;
  const lng1 = coord1.longitude;
  const lat2 = coord2.latitude;
  const lng2 = coord2.longitude;

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  const r = 6371; //지구의 반지름(km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = r * c; // Distance in km

  return calcTime(Math.round(d / (30 / 60 / 60 / 1000)));
};

const filterTagsByCategory = (
  tags: TagSliceState,
  category: Category,
): Tag[] => {
  return Object.entries(tags)
    .reduce<Tag[]>((prev, [key, value]) => prev.concat(value), [])
    .filter(tag => tag.category === category);
};

export {
  calcRating,
  calcCoordinates,
  calcTime,
  calcDist,
  pathToCoordinates,
  placesToCoordinates,
  isPlace,
  isCourse,
  redisPositionToCoordinate,
  coordinateToRedisPosition,
  textToJson,
  coordinateToIconPlace,
  calcArrivalTime,
  placeToCoordinate,
  placeToIconPlace,
  filterTagsByCategory,
};

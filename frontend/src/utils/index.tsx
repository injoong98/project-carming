import {Coordinate, Course, Place} from '../types';

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

const placesToCoordinates = (places: Place[]): Coordinate[] => {
  return places.map<Coordinate>(place => {
    return {latitude: place.lat, longitude: place.lon};
  });
};

function isPlace(arg: any): arg is Place {
  return (arg.lon !== undefined && arg.lat !== undefined);
}

function isCourse(arg: any): arg is Course {
  return (arg.places !== undefined);
}

export {
  calcRating,
  calcCoordinates,
  calcTime,
  calcDist,
  pathToCoordinates,
  placesToCoordinates,
  isPlace,
};

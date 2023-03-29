import {Coordinate} from '../types';

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

export {calcRating, calcCoordinates};

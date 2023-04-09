import axios from 'axios';
import {Coordinate} from '../types';
import {NAVER_MAPS_API_ID, NAVER_MAPS_API_KEY} from '@env';

const callNaverDirectionApi = async (coordinates: Coordinate[]) => {
  console.log();
  const start = `${coordinates[0].longitude},${coordinates[0].latitude}`;
  const end = `${coordinates[coordinates.length - 1].longitude},${
    coordinates[coordinates.length - 1].latitude
  }`;
  const waypoints = coordinates
    .slice(1, coordinates.length - 1)
    .reduce((prev, curr) => prev + `${curr.longitude},${curr.latitude}|`, '')
    .slice(0, -1);
  return axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&goal=${end}&waypoints=${waypoints}`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_MAPS_API_ID,
        'X-NCP-APIGW-API-KEY': NAVER_MAPS_API_KEY,
      },
    },
  );
};

export {callNaverDirectionApi};

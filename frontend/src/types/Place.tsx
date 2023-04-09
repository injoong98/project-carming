import {Category} from './Category';

export type Place = {
  id: number;
  name: string;
  tel?: string;
  category?: Category;
  lon: number;
  lat: number;
  region?: string;
  ratingCount: number;
  ratingSum: number;
  keyword?: string[];
  image: string;
};

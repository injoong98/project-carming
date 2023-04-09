import {Place} from './Place';

export type Course = {
  id: number;
  name: string;
  regions: string[];
  places: Place[];
  ratingCount: number;
  ratingSum: number;
};

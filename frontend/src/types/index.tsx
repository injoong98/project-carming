type Tag = {
  id: number;
  text: string;
};

type Place = {
  id: number;
  color: string;
  title: string;
  content: string;
  location: string;
  imageUrl: string;
  ratingSum: number;
  ratingCnt: number;
};

enum Category {
  음식점 = 'FOOD',
  카페 = 'CAFE',
  놀거리 = 'PLAY',
  명소 = 'ATTRACTION',
  숙박 = 'ACCOMODATION',
}

export type {Tag, Place};
export {Category};

import {Image, ScrollView, Text, View} from 'react-native';
import {Category, Place, PlaceReviewRequest, Tag} from '../types';
import styled from 'styled-components';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {filterTagsByCategory} from '../utils';
import {TagChip} from '.';
import {useEffect, useState} from 'react';
import {updatePlaceReview} from '../redux/slices/reviewSlice';

interface ReviewPlaceItemProps {
  place: Place;
  index: number;
}

const ReviewPlaceItem: React.FC<ReviewPlaceItemProps> = ({place, index}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {placeReviews} = useSelector((state: RootState) => state.review);
  const tags = useSelector((state: RootState) =>
    filterTagsByCategory(state.tag, place.category ?? Category.음식점),
  );

  const [rating, setRating] = useState<number>(0);
  const [checkedTagList, setCheckedTagList] = useState<Tag[]>([]);

  useEffect(() => {
    const newPlaceReview: PlaceReviewRequest = {
      placeId: place.id,
      placeRating: rating,
      placeTags: checkedTagList.map(tag => tag.id),
    };
    dispatch(updatePlaceReview(newPlaceReview));
  }, [rating, checkedTagList]);

  const ratingCompleted = (rating: number): void => {
    setRating(rating);
  };

  const tagPressed = (tag: Tag): void => {
    if (checkedTagList.includes(tag)) {
      checkedTagList.splice(checkedTagList.indexOf(tag), 1);
      setCheckedTagList([...checkedTagList]);
    } else {
      setCheckedTagList([...checkedTagList, tag]);
    }
  };

  return (
    <ReviewPlaceContainer>
      <PlaceImage source={{uri: place.image}} />
      <PlaceInfoContainer>
        <PlaceTitleText>
          #{index} {place.name}
        </PlaceTitleText>
        <RatingContainer>
          <RatingText>평점</RatingText>
          <AirbnbRating
            count={5}
            selectedColor={theme.colors.tertiary}
            defaultRating={0}
            showRating={false}
            onFinishRating={ratingCompleted}
            size={13}
          />
        </RatingContainer>
        <View style={{flex: 1, borderRadius: 15, overflow: 'hidden'}}>
          <ScrollView
            style={{flex: 1, paddingTop: 1}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {tags.map(tag => {
              return (
                <TagChip
                  key={tag.id}
                  style={{marginLeft: 5}}
                  text={tag.name}
                  selected={checkedTagList.includes(tag)}
                  selectedBackgroundColor={theme.colors.secondary}
                  onPress={() => tagPressed(tag)}
                />
              );
            })}
          </ScrollView>
        </View>
      </PlaceInfoContainer>
    </ReviewPlaceContainer>
  );
};

const ReviewPlaceContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const PlaceInfoContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
  padding-top: 5px;
  flex: 1;
`;

const RatingContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 0px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const PlaceTitleText = styled(Text)`
  font-size: 15px;
  margin-left: 5px;
  font-weight: bold;
`;

const PlaceImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const RatingText = styled(Text)`
  font-size: 13px;
  margin: 10px 5px 10px 0px;
`;

export default ReviewPlaceItem;

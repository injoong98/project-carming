import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import {CourseReviewRequest, Tag} from '../types';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {TagChip} from '.';
import {setCourseReview} from '../redux/slices/reviewSlice';

interface ReviewCourseItemProps {
  isFirstTime: boolean;
}

const ReviewCourseItem: React.FC<ReviewCourseItemProps> = ({
  isFirstTime = false,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const courseTags = useSelector((state: RootState) => state.tag.courseTags);
  const {courseReview} = useSelector((state: RootState) => state.review);

  const [rating, setRating] = useState<number>(0);
  const [checkedTagList, setCheckedTagList] = useState<Tag[]>([]);
  const [reviewText, setReviewText] = useState<string>('');
  const [courseTitle, setCourseTitle] = useState<string>('');

  useEffect(() => {
    const newCourseReview: CourseReviewRequest = {
      ...courseReview,
      courseRating: rating,
      courseTags: checkedTagList.map(tag => tag.id),
      content: reviewText,
      name: courseTitle,
    };
    dispatch(setCourseReview(newCourseReview));
  }, [rating, checkedTagList, reviewText]);

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
    <ReviewCourseContainer>
      <CourseReviewTitle>
        {isFirstTime ? '코스를 처음으로 발견하셨어요!' : '코스는 어떠셨나요?'}
      </CourseReviewTitle>
      {isFirstTime ? (
        <ReviewTitleInput
          placeholder={
            '코스 이름 짓기  ex) 중계동 중국집 부수기, 한강 한량 체험기'
          }
          placeholderTextColor={theme.colors.surfaceDisabled}
          activeUnderlineColor={theme.colors.primary}
          dense={true}
          value={courseTitle}
          onChangeText={text => setCourseTitle(text)}
        />
      ) : null}
      <AirbnbRating
        count={5}
        ratingContainerStyle={{alignItems: 'flex-start', marginVertical: 10}}
        selectedColor={theme.colors.tertiary}
        defaultRating={0}
        showRating={false}
        onFinishRating={ratingCompleted}
        size={18}
      />

      <View style={{maxHeight: 30, borderRadius: 15, overflow: 'hidden'}}>
        <ScrollView
          style={{}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {courseTags.map(tag => {
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
      <ReviewTextInput
        mode={'outlined'}
        value={reviewText}
        outlineStyle={{
          borderRadius: 10,
          borderColor: theme.colors.surfaceDisabled,
        }}
        multiline={true}
        onChangeText={text => setReviewText(text)}
      />
    </ReviewCourseContainer>
  );
};
const ReviewCourseContainer = styled(View)`
  flex-direction: column;
  margin-top: 50px;
`;

const CourseReviewTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const ReviewTextInput = styled(TextInput)`
  height: 80px;
  margin-top: 10px;
  font-size: 12px;
`;

const ReviewTitleInput = styled(TextInput)`
  /* height: 40px; */
  padding: 0px;
  margin-top: 10px;
  background-color: white;
  font-size: 13px;
`;

export default ReviewCourseItem;

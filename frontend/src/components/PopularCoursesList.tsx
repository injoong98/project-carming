import {Text, View, StyleSheet} from 'react-native';
import PopularCourseItem from './PopularCourseItem';
import {Course} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

interface PopularCoursesListProps {
  courseList?: Course[];
}

const PopularCoursesList: React.FC<PopularCoursesListProps> = ({
  courseList = [],
}) => {
  return (
    <>
      <TitleView>
        <Icon name="thumb-up-outline" style={styles.titleIcon}></Icon>
        <TitleText>지금 가장 인기 있는 코스 TOP 3 !!!</TitleText>
      </TitleView>
      <CourseListView>
        {courseList?.slice(0, 3).map((course, index) => (
          <PopularCourseItem key={index} course={course} index={index} />
        ))}
      </CourseListView>
    </>
  );
};

const TitleView = styled(View)`
  flex-direction: row;
  width: 90%;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 3%;
`;

const TitleText = styled(Text)`
  font-family: SeoulNamsanM;
  font-size: 16px;
  color: #df94c2;
`;

const CourseListView = styled(View)`
  width: 95%;
  align-items: center;
  gap: 10px;
`;

const styles = StyleSheet.create({
  titleIcon: {
    fontSize: 20,
    color: '#df94c2',
    marginRight: '2%',
  },
});

export default PopularCoursesList;

import {Text, View, StyleSheet} from 'react-native';
import PopularCourseItem from './PopularCourseItem';
import {Course} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {initializeSelectedCourse} from '../redux/slices/mainSlice';
import MainCourseCardModal from './MainCourseCardModal';

interface PopularCoursesListProps {
  courseList?: Course[];
}

const PopularCoursesList: React.FC<PopularCoursesListProps> = ({
  courseList = [],
}) => {
  const dispatch = useDispatch();
  //코스 모달
  const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
  const handleCourseModalClose = () => {
    dispatch(initializeSelectedCourse);
    setIsCourseModalVisible(false);
  };
  const selectedCourse = useSelector(
    (state: RootState) => state.main.selectedCourse,
  );

  return (
    <>
      <TitleView>
        <Icon name="thumb-up-outline" style={styles.titleIcon}></Icon>
        <TitleText>지금 가장 인기 있는 코스 TOP 3 !!!</TitleText>
      </TitleView>
      <CourseListView>
        {courseList?.slice(0, 3).map((course, index) => (
          <PopularCourseItem
            key={index}
            course={course}
            index={index}
            onPress={() => setIsCourseModalVisible(!isCourseModalVisible)}
          />
        ))}
      </CourseListView>

      {selectedCourse && (
        <MainCourseCardModal
          isVisible={isCourseModalVisible}
          course={selectedCourse}
          onClose={handleCourseModalClose}
        />
      )}
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

import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Place} from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import PopularPlaceItem from './PopularPlaceItem';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import MainPlaceCardModal from './MainPlaceCardModal';
import {initializeSelectedPlace} from '../redux/slices/mainSlice';

interface PopularPlacesListProps {
  placeList?: Place[];
}

const PopularPlacesList: React.FC<PopularPlacesListProps> = ({
  placeList = [], //placeList가 undefined일 경우 오류 발생 가능. 따라서, placeList의 기본값을 빈 배열로 설정.
}) => {
  const dispatch = useDispatch();
  //장소 모달
  const [isPlaceModalVisible, setIsPlaceModalVisible] = useState(false);
  const handlePlaceModalClose = () => {
    dispatch(initializeSelectedPlace);
    setIsPlaceModalVisible(false);
  };
  const selectedPlace = useSelector(
    (state: RootState) => state.main.selectedPlace,
  );

  return (
    <>
      <TitleView>
        <Icon name="thumb-up-outline" style={styles.titleIcon}></Icon>
        <TitleText>지금 가장 인기 있는 장소 추천 !!!</TitleText>
      </TitleView>
      <View style={{width: '87%', marginBottom: '3%'}}>
        <FlatList
          data={placeList}
          horizontal={true}
          renderItem={({item, index}) => (
            <PopularPlaceItem
              key={index}
              place={item}
              index={index}
              onPress={() => setIsPlaceModalVisible(!isPlaceModalVisible)}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.placeListView}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {selectedPlace && (
        <MainPlaceCardModal
          isVisible={isPlaceModalVisible}
          place={selectedPlace}
          onClose={handlePlaceModalClose}
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
  color: #7173c9;
`;

const styles = StyleSheet.create({
  titleIcon: {
    fontSize: 20,
    color: '#7173C9',
    marginRight: '2%',
  },
  placeListView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PopularPlacesList;

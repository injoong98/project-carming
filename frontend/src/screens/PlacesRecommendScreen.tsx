import {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, IconButton, Tooltip, useTheme} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel-v4';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import styled from 'styled-components/native';
import {Place, Category} from '../types';
import PlaceRecommendCard from '../components/PlaceRecommendCard';
import CustomButton from '../components/CustomButton';
import TagChip from '../components/TagChip';
import {RootState} from '../redux/store';
import {
  addPlaceToPlaceCart,
  deletePlaceFromPlaceCartById,
  selectCategory,
} from '../redux/slices/placeSlice';

const {width: screenWidth} = Dimensions.get('window');

const PlacesRecommendScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const carouselRef = useRef<any>(null);

  const {placeList, placeCart, category} = useSelector(
    (state: RootState) => state.place,
  );
  const {tagList} = useSelector((state: RootState) => state.tag);

  const [checkedTagIdList, setCheckedTagIdList] = useState<number[]>([]);

  const tagPressed = (tagId: number) => {
    checkedTagIdList.includes(tagId)
      ? checkedTagIdList.splice(checkedTagIdList.indexOf(tagId), 1)
      : checkedTagIdList.push(tagId);
    setCheckedTagIdList([...checkedTagIdList]);
  };

  const placeAddBtnPressed = () => {
    const place: Place =
      carouselRef.current.props.data[carouselRef.current._activeItem];
    dispatch(addPlaceToPlaceCart(place));
  };

  const cancelPlaceCartItemById = (placeId: number) => {
    dispatch(deletePlaceFromPlaceCartById(placeId));
  };

  return (
    <>
      <StyledView style={{marginTop: 10, marginBottom: 20}}>
        <View style={{maxWidth: 120}}>
          <SelectDropdown
            data={Object.keys(Category)}
            defaultValueByIndex={0}
            onSelect={(selectedItem, index) => {
              dispatch(selectCategory(Object.values(Category)[index]));
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <Icon
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#FFF'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
        {tagList.map(tag => {
          return (
            <TagChip
              key={tag.id}
              style={{marginLeft: 5}}
              text={tag.name}
              selected={checkedTagIdList.includes(tag.id)}
              selectedBackgroundColor={theme.colors.secondary}
              onPress={() => tagPressed(tag.id)}
            />
          );
        })}
      </StyledView>

      <Carousel
        style={{flex: 1}}
        layout={'default'}
        vertical={false}
        layoutCardOffset={9}
        ref={carouselRef}
        data={placeList}
        renderItem={PlaceRecommendCard}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 80}
        inactiveSlideShift={0}
        useScrollView={true}
      />

      <StyledView style={{justifyContent: 'center'}}>
        <IconButton
          icon="arrow-down-drop-circle"
          iconColor={theme.colors.background}
          size={35}
          style={{marginVertical: 20}}
          onPress={() => placeAddBtnPressed()}
        />
      </StyledView>
      <StyledView style={{height: 70}}>
        {placeCart?.map(place => {
          return (
            <Tooltip key={place.id} title={place.name} enterTouchDelay={1}>
              <View style={{marginRight: 5}}>
                <Avatar.Image size={50} source={{uri: place.image}} />
                <IconButton
                  style={{position: 'absolute', right: -17, top: -17}}
                  icon="close-circle"
                  iconColor={theme.colors.background}
                  size={15}
                  onPress={() => cancelPlaceCartItemById(place.id)}
                />
              </View>
            </Tooltip>
          );
        })}
      </StyledView>
      <StyledView style={{justifyContent: 'center'}}>
        <CustomButton
          text={'선택 완료'}
          buttonStyle={{
            width: 200,
            padding: 14,
            borderRadius: 30,
            backgroundColor: theme.colors.surfaceVariant,
          }}
          textStyle={{fontWeight: 900, fontSize: 16, textAlign: 'center'}}
        />
      </StyledView>
    </>
  );
};

const StyledView = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;

const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: '90%',
    height: 30,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PlacesRecommendScreen;

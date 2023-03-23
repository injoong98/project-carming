import styled from 'styled-components/native';
import TagChip from '../components/TagChip';
import {Avatar, IconButton, Tooltip, useTheme} from 'react-native-paper';
import {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel-v4';
import CourseRecommendCard from '../components/CourseRecommendCard';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Place, Tag} from '../types';
import CustomButton from '../components/CustomButton';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const {width: screenWidth} = Dimensions.get('window');

const tags: Tag[] = [
  {
    id: 0,
    text: '맛있는',
  },
  {
    id: 1,
    text: '청결한',
  },
  {
    id: 2,
    text: '유명한',
  },
];

const places: Place[] = [
  {
    id: 0,
    color: 'yellow',
    title: '허니치즈 순대국',
    content: 'content1',
    imageUrl: 'https://i.imgur.com/UYiroysl.jpg',
    ratingSum: 17,
    ratingCnt: 4,
    location: '노원구 중계 14동',
  },
  {
    id: 1,
    color: 'red',
    title: '허니치즈 순대국',
    content: 'content2',
    imageUrl: 'https://i.imgur.com/UPrs1EWl.jpg',
    ratingSum: 17,
    ratingCnt: 4,
    location: '노원구 중계 14동',
  },
  {
    id: 2,
    color: 'blue',
    title: '허니치즈 순대국',
    content: 'content3',
    imageUrl: 'https://i.imgur.com/MABUbpDl.jpg',
    ratingSum: 17,
    ratingCnt: 4,
    location: '노원구 중계 14동',
  },
  {
    id: 3,
    color: 'green',
    title: '허니치즈 순대국',
    content: 'content4',
    imageUrl: 'https://i.imgur.com/KZsmUi2l.jpg',
    ratingSum: 17,
    ratingCnt: 4,
    location: '노원구 중계 14동',
  },
];

const CoursesRecommendScreen = () => {
  const theme = useTheme();
  const carouselRef = useRef<any>(null);

  const [tagList, setTagList] = useState<Tag[]>([]);
  const [placeList, setPlaceList] = useState<Place[]>([]);
  const [placeCart, setPlaceCart] = useState<Place[]>([]);
  const [checkedTagIdList, setCheckedTagIdList] = useState<number[]>([]);

  useEffect(() => {
    setTagList(tags);
    setPlaceList(places);
    setPlaceCart(places);
  }, []);

  const tagPressed = (tagId: number) => {
    checkedTagIdList.includes(tagId)
      ? checkedTagIdList.splice(checkedTagIdList.indexOf(tagId), 1)
      : checkedTagIdList.push(tagId);
    setCheckedTagIdList([...checkedTagIdList]);
  };

  const placeAddBtnPressed = () => {
    const place: Place =
      carouselRef.current.props.data[carouselRef.current._activeItem];
    addPlaceCartItemById(place.id);
  };

  const addPlaceCartItemById = (placeId: number) => {
    if (placeCart.filter(place => place.id == placeId).length > 0) {
      console.log('되나?');
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: '이미 코스에 담겨있습니다.',
        textBodyStyle: {
          fontSize: 14,
          paddingTop: 3,
        },
      });
    } else {
      const place = placeList.filter(place => place.id === placeId)[0];
      setPlaceCart([...placeCart, place]);
    }
  };

  const cancelPlaceCartItemById = (placeId: number) => {
    const idx = placeCart.map(place => place.id).indexOf(placeId);
    const cart = [...placeCart];
    cart.splice(idx, 1);
    setPlaceCart([...cart]);
  };

  return (
    <>
      <StyledView style={{marginTop: 10, marginBottom: 20}}>
        {tagList.map(place => {
          return (
            <TagChip
              key={place.id}
              style={{marginLeft: 5}}
              text={place.text}
              selected={checkedTagIdList.includes(place.id)}
              selectedBackgroundColor={theme.colors.secondary}
              onPress={() => tagPressed(place.id)}
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
        renderItem={CourseRecommendCard}
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
        {placeCart.map(place => {
          return (
            <Tooltip key={place.id} title={place.title} enterTouchDelay={1}>
              <View style={{marginRight: 5}}>
                <Avatar.Image size={50} source={{uri: place.imageUrl}} />
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
          textStyle={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}
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

export default CoursesRecommendScreen;

import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import CommonChip from '../components/CommonChip';
import {Avatar, Button, IconButton, useTheme} from 'react-native-paper';
import {SegmentedButtons} from 'react-native-paper';
import {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel-v4';
import RecommendCard from '../components/RecommendCard';
import {Alert, Dimensions, View} from 'react-native';
import {Place, Tag} from '../types';

const {width: screenWidth} = Dimensions.get('window');

const PlacesRecommendScreen = () => {
  const theme = useTheme();
  const carouselRef = useRef<any>(null);

  const [tagList, setTagList] = useState<Tag[]>([]);
  const [placeList, setPlaceList] = useState<Place[]>([]);
  const [placeCart, setPlaceCart] = useState<Place[]>([]);
  const [recommendType, setRecommendType] = useState<string>('');
  const [checkedTagIdList, setCheckedTagIdList] = useState<number[]>([]);

  const recommendTypeChangeButtons = [
    {
      value: '0',
      label: '장소',
      icon: 'map-marker',
      checkedColor: 'white',
      uncheckedColor: 'white',
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '0' ? theme.colors.primary : theme.colors.shadow,
      },
    },
    {
      value: '1',
      label: '코스',
      icon: 'routes',
      checkedColor: 'white',
      uncheckedColor: 'white',
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '1' ? theme.colors.primary : theme.colors.shadow,
      },
    },
  ];

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
      title: 'title1',
      content: 'content1',
      imageUrl: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      id: 1,
      color: 'red',
      title: 'title2',
      content: 'content2',
      imageUrl: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      id: 2,
      color: 'blue',
      title: 'title3',
      content: 'content3',
      imageUrl: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      id: 3,
      color: 'green',
      title: 'title4',
      content: 'content4',
      imageUrl: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
  ];

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
      Alert.alert('이미 담은 장소입니다.');
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
    <GradientBackground colors={['#70558e7a', '#df94c283', '#ffbdc1b0']}>
      <SafeAreaView style={{flex: 1}}>
        <StyledView style={{justifyContent: 'space-between'}}>
          <SegmentedButtons
            style={{width: 200}}
            value={recommendType}
            onValueChange={setRecommendType}
            buttons={recommendTypeChangeButtons}
          />
          <IconButton
            icon="home"
            size={30}
            onPress={() => {
              console.log('hello');
            }}
          />
        </StyledView>
        <StyledView style={{marginTop: 10, marginBottom: 20}}>
          {tagList.map(place => {
            return (
              <CommonChip
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
          renderItem={RecommendCard}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 80}
          inactiveSlideShift={0}
          useScrollView={true}
        />
        <StyledView style={{justifyContent: 'center'}}>
          <IconButton
            icon="arrow-down-drop-circle"
            iconColor={theme.colors.background}
            size={40}
            onPress={() => placeAddBtnPressed()}
          />
        </StyledView>
        <StyledView style={{height: 70}}>
          {placeCart.map(place => {
            return (
              <View key={place.id} style={{marginRight: 5}}>
                <Avatar.Image size={60} source={{uri: place.imageUrl}} />
                <IconButton
                  style={{position: 'absolute', right: -15, top: -15}}
                  icon="close-circle"
                  iconColor={theme.colors.background}
                  size={20}
                  onPress={() => cancelPlaceCartItemById(place.id)}
                />
              </View>
            );
          })}
        </StyledView>
        <StyledView style={{justifyContent: 'center'}}>
          <Button>hello</Button>
        </StyledView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const StyledView = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;

const GradientBackground = styled(LinearGradient)`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default PlacesRecommendScreen;

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {Avatar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import {Place} from '../types';
import {calcRating} from '../utils';
import RatingStar from './RatingStar';

const CourseEditListItem: React.FC<RenderItemParams<Place>> = ({
  item,
  drag,
  isActive,
}) => {
  const theme = useTheme();
  const rating = calcRating(item.ratingSum, item.ratingCount);
  return (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        delayLongPress={1}
        disabled={isActive}
        style={[
          styles.rowItem,
          {
            backgroundColor: isActive
              ? theme.colors.onPrimary
              : theme.colors.primary,
          },
        ]}>
        <StyledView style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image size={40} source={{uri: item.image}} />
          <Text style={styles.text}>{item.name}</Text>
        </StyledView>
        <StyledView style={{width: 140, justifyContent: 'space-between'}}>
          <StyledView>
            <RatingStar
              iconSize={12}
              iconStyle={{margin: -8}}
              rating={rating}
            />
            <RatingText style={{paddingHorizontal: 3}}>{rating}</RatingText>
            <RatingText style={{fontSize: 8, marginTop: 4, marginRight: 10}}>
              ({item.ratingCount})
            </RatingText>
          </StyledView>
          <Icon name={'view-headline'} color={'#fff'} size={20} />
        </StyledView>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

const StyledView = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled(Text)`
  color: white;
  font-size: 13px;
  margin-left: 0px;
  margin-right: 0px;
`;

export default CourseEditListItem;

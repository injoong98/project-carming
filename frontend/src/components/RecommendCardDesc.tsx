import {Text, View} from 'react-native';
import styled from 'styled-components';
import {RatingStar} from '.';
import {Course, Place} from '../types';
import {calcRating, isPlace} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RecommendCardDescProps {
  item: Course | Place;
  index: number;
}

const RecommendCardDesc: React.FC<RecommendCardDescProps> = ({item, index}) => {
  const rating = calcRating(item.ratingSum, item.ratingCount);
  return (
    <ContentContainer>
      <LocationText>
        <Icon name="map-marker" />{' '}
        {isPlace(item)
          ? item.region
          : item.regions
              .reduce((prev, curr) => prev + `${curr}, `, '')
              .slice(0, -2)}
      </LocationText>
      <TitleContainer>
        <TitleText>
          #{index + 1} {item.name}
        </TitleText>
        <View style={{flexDirection: 'row'}}>
          <RatingStar
            rating={rating}
            containerStyle={{marginRight: 8}}
            iconStyle={{margin: -8}}
          />
          <RatingText>
            {rating} ({item.ratingCount})
          </RatingText>
        </View>
      </TitleContainer>
    </ContentContainer>
  );
};

const TitleContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TitleText = styled(Text)`
  color: white;
  font-size: 16px;
`;

const RatingText = styled(Text)`
  color: white;
  font-size: 13px;
`;

const ContentContainer = styled(View)`
  background-color: #0000007a;
  width: 100%;
  justify-content: center;
  padding: 10px 15px;
`;

const LocationText = styled(Text)`
  color: white;
  font-size: 10px;
  margin-bottom: 5px;
`;

export default RecommendCardDesc;

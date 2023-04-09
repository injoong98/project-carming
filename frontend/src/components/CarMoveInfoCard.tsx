import {Text, View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import styled from 'styled-components';
import {Place} from '../types';
import {calcRating, isPlace} from '../utils';
import RatingStar from './RatingStar';
import {iconPlace} from './MapMarker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CarMoveInfoCardProps {
  place: Place | iconPlace;
  index: number;
  infoText: string;
}

const CarMoveInfoCard: React.FC<CarMoveInfoCardProps> = ({
  place,
  index,
  infoText,
}) => {
  const theme = useTheme();

  if (isPlace(place)) {
    const rating = calcRating(place.ratingSum, place.ratingCount);
    return (
      <CardContainer>
        <PlaceContainer>
          <PlaceImage source={{uri: place.image}} />
          <PlaceInfoContainer>
            <View>
              <LocationText>
                <Icon name="map-marker" />
                {place.region}
              </LocationText>
              <PlaceTitleText>
                #{index} {place.name}
              </PlaceTitleText>
              <RatingContainer>
                <RatingStar
                  iconSize={16}
                  iconStyle={{margin: -8}}
                  rating={rating}
                />
                <RatingAvgText style={{color: theme.colors.secondary}}>
                  {rating}
                </RatingAvgText>
                <RatingCntText style={{color: theme.colors.secondary}}>
                  ({place.ratingCount})
                </RatingCntText>
              </RatingContainer>
            </View>
            <TagText style={{color: theme.colors.secondary}}>
              {place.keyword?.reduce((prev, curr) => prev + `#${curr} `, '')}
            </TagText>
          </PlaceInfoContainer>
        </PlaceContainer>
        <InfoText style={{color: theme.colors.primary}}>{infoText}</InfoText>
      </CardContainer>
    );
  } else {
    return <></>;
  }
};

const CardContainer = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
`;

const PlaceContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PlaceInfoContainer = styled(View)`
  flex-direction: column;
  justify-content: space-around;
  height: 150px;
`;

const RatingContainer = styled(View)`
  flex-direction: row;
  margin-top: 5px;
`;

const PlaceTitleText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const InfoText = styled(Text)`
  margin-top: 25px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

const PlaceImage = styled(Image)`
  width: 130px;
  height: 130px;
  border-radius: 5px;
  margin-right: 10px;
`;

const RatingAvgText = styled(Text)`
  font-size: 16px;
  padding: 0px 3px;
  margin-left: 0px;
  margin-right: 0px;
`;

const RatingCntText = styled(Text)`
  font-size: 10px;
  padding: 0px 3px;
  margin: 6px 10px 0px 0px;
`;

const TagText = styled(Text)`
  font-size: 12px;
`;

const LocationText = styled(Text)`
  color: black;
  font-size: 10px;
  margin-bottom: 5px;
`;

export default CarMoveInfoCard;

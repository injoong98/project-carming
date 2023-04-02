import {Text, View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import styled from 'styled-components';
import {Place} from '../types';
import {calcRating, isPlace} from '../utils';
import RatingStar from './RatingStar';
import {iconPlace} from './MapMarker';

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
            <PlaceTitleText>
              #{index} {place.name}
            </PlaceTitleText>
            <RatingContainer>
              <RatingStar
                iconSize={18}
                iconStyle={{margin: -8}}
                rating={rating}
              />
              <RatingText
                style={{paddingHorizontal: 3, color: theme.colors.secondary}}>
                {rating}
              </RatingText>
              <RatingText
                style={{
                  fontSize: 10,
                  marginTop: 6,
                  marginRight: 10,
                  color: theme.colors.secondary,
                }}>
                ({place.ratingCount})
              </RatingText>
            </RatingContainer>
            <TagText style={{color: theme.colors.secondary}}>
              #맛있는 #분위기있는
            </TagText>
          </PlaceInfoContainer>
        </PlaceContainer>
        <InfoText style={{color: useTheme().colors.primary}}>
          {infoText}
        </InfoText>
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
`;

const RatingContainer = styled(View)`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const PlaceTitleText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
`;

const InfoText = styled(Text)`
  margin-top: 25px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

const PlaceImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const RatingText = styled(Text)`
  font-size: 15px;
  margin-left: 0px;
  margin-right: 0px;
`;

const TagText = styled(Text)`
  font-size: 13px;
`;
export default CarMoveInfoCard;

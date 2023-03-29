import React from 'react';
import {View, ViewStyle} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import styled from 'styled-components';

interface RatingStarProps {
  rating: number;
  readonly?: boolean;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  iconSize?: number;
}

const RatingStar: React.FC<RatingStarProps> = ({
  rating,
  containerStyle,
  iconStyle,
  iconSize,
}) => {
  const theme = useTheme();

  return (
    <RatingStarContainer style={[containerStyle]}>
      {[1, 2, 3, 4, 5].map(score => (
        <IconButton
          key={score}
          icon="star"
          style={[iconStyle]}
          iconColor={
            score <= rating
              ? theme.colors.secondary
              : theme.colors.surfaceDisabled
          }
          size={iconSize ?? 15}
        />
      ))}
    </RatingStarContainer>
  );
};

const RatingStarContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export default RatingStar;

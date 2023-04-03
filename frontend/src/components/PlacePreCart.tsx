import {View, ViewStyle} from 'react-native';
import {Avatar, IconButton, Tooltip, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {Place} from '../types';
import {removePlaceFromPreCart} from '../redux/slices/mainSlice';

interface PlacePreCartProps {
  preCart: Place[];
  iconColor?: string;
  componentStyle?: ViewStyle;
}

const PlacePreCart: React.FC<PlacePreCartProps> = ({
  preCart,
  iconColor,
  componentStyle,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <StyledView style={componentStyle && componentStyle}>
      {preCart?.map(place => {
        return (
          <Tooltip key={place.id} title={place.name} enterTouchDelay={1}>
            <View style={{marginRight: 5}}>
              <Avatar.Image size={50} source={{uri: place.image}} />
              <IconButton
                style={{position: 'absolute', right: -17, top: -17}}
                icon="close-circle"
                iconColor={iconColor ? iconColor : theme.colors.background}
                size={15}
                onPress={() => dispatch(removePlaceFromPreCart(place))}
              />
            </View>
          </Tooltip>
        );
      })}
    </StyledView>
  );
};

const StyledView = styled(View)`
  align-items: center;
  flex-direction: row;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
`;

export default PlacePreCart;

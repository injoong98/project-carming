import {Text, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from 'react-native-paper';
import React from 'react';
import {ViewStyle} from 'react-native';

type Props = {
  style?: ViewStyle;
  text: string;
  selected: boolean;
  selectedBackgroundColor: string;
  onPress?: () => void;
};

const TagChip: React.FC<Props> = ({
  style,
  text,
  selected,
  selectedBackgroundColor,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <StyledView
        style={style}
        selected={selected}
        selectedBackgroundColor={selectedBackgroundColor}
        unselectedBackgroundbgColor={theme.colors.shadow}>
        <StyledText>{text}</StyledText>
      </StyledView>
    </TouchableWithoutFeedback>
  );
};

interface ChipStyleContainer {
  selected: boolean;
  selectedBackgroundColor: string;
  unselectedBackgroundbgColor: string;
}

const StyledView = styled(View)<ChipStyleContainer>`
  justify-content: center;
  align-items: center;
  // width: 60px;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props =>
    props.selected
      ? props.selectedBackgroundColor
      : props.unselectedBackgroundbgColor};
`;

const StyledText = styled(Text)`
  color: white;
  font-size: 12px;
`;

export default TagChip;

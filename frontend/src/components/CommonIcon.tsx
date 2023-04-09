import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';

interface IconProps {
  iconName: string;
  iconStyle?: {};
  onPress?: () => void;
}

const CommonIcon: React.FC<IconProps> = ({iconName, iconStyle, onPress}) => {
  const handlePress = () => {
    onPress && onPress(); //onPress가 정의되면 호출
  };

  return (
    <Icon
      name={iconName}
      style={[styles.icon, iconStyle]}
      onPress={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'grey',
    fontSize: 20,
  },
});

export default CommonIcon;

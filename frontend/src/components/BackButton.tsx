import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, ViewStyle, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BackButtonProps {
  buttonStyle?: ViewStyle;
  iconStyle?: {};
  onPress?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  buttonStyle,
  iconStyle,
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress && onPress();
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={[styles.iconWrapper, buttonStyle]}
      onPress={handlePress}>
      <Icon name="arrow-back-outline" style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 36,
  },
});

export default BackButton;

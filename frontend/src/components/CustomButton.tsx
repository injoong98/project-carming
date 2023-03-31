import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native'; // 리액트 네이티브에서 제공하는 컴포넌트 추가

interface CustomButtonProps {
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  buttonStyle,
  textStyle,
  onPress,
  disabled = false,
}) => {
  const handlePress = () => {
    if (onPress && !disabled) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, buttonStyle]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}>
      <Text style={[styles.text, textStyle]}> {text} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 3,
    alignItems: 'center',
    elevation: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontFamily: 'SeoulNamsanM',
    color: 'white',
    fontSize: 24,
  },
  disabled: {
    opacity: 0.6, // 투명도를 줄여서 비활성화된 것처럼 보이게 함
    // 다른 스타일도 추가할 수 있음
  },
});
export default CustomButton;

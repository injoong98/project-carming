import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native'; // 리액트 네이티브에서 제공하는 컴포넌트 추가
import {SeoulDistrict} from '../types/SeoulDistrict';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  addRegionToRegionList,
  removeRegionFromRegionList,
} from '../redux/slices/mainSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MainMapDistrictButtonProps {
  region: SeoulDistrict;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
  top?: string;
  left?: string;
}

const MainMapDistrictButton: React.FC<MainMapDistrictButtonProps> = ({
  region,
  buttonStyle,
  textStyle,
  onPress,
  disabled = false,
  top = '50%',
  left = '45%',
}) => {
  const dispatch = useDispatch();
  const regionList = useSelector((state: RootState) => state.main.regionList);
  const isSelected = regionList.includes(region);
  const index = regionList.indexOf(region);

  const colors = {
    first: '#FFBDC1',
    second: '#DF94C2',
  };
  const selectedColor = index && index % 2 === 1 ? colors.first : colors.second;

  const handlePress = () => {
    if (!disabled) {
      if (onPress) {
        onPress();
      }
      // 버튼을 누르면 store에 지역 추가 또는 삭제
      if (isSelected) {
        dispatch(removeRegionFromRegionList(region));
      } else {
        dispatch(addRegionToRegionList(region));
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        buttonStyle,
        {top, left},
      ]}
      onPress={handlePress}
      activeOpacity={0.5}
      disabled={disabled}>
      {isSelected && (
        <Icon
          name="flag"
          size={16}
          //selectedColor 변수가 falsy 값이 아닌 경우 selectedColor를, 그렇지 않은 경우 'black'을 반환
          color={selectedColor || 'black'}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, textStyle]}> {region} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
  },
  text: {
    fontFamily: 'SeoulNamsanL',
    color: 'black',
    fontSize: 12,
  },
  disabled: {
    opacity: 0.2, // 투명도를 줄여서 비활성화된 것처럼 보이게 함
    // 다른 스타일도 추가할 수 있음
  },
  icon: {
    position: 'absolute',
    top: -22,
    left: 23,
    fontSize: 34,
  },
});
export default MainMapDistrictButton;

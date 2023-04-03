import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native'; // 리액트 네이티브에서 제공하는 컴포넌트 추가
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {SeoulDistrict} from '../types';
import {removeRegionFromRegionList} from '../redux/slices/mainSlice';

interface MainRegionSelectItemProps {
  region: SeoulDistrict;
  index: number;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: {};
  onPress?: () => void;
  disabled?: boolean;
}

const MainRegionSelectItem: React.FC<MainRegionSelectItemProps> = ({
  region,
  index,
  buttonStyle,
  textStyle,
  iconStyle,
  onPress,
  disabled = false,
}) => {
  const dispatch = useDispatch();

  const handlePress = () => {
    if (!disabled) {
      if (onPress) {
        onPress();
      }
      // 버튼을 누르면 store에서 지역 삭제
      dispatch(removeRegionFromRegionList(region));
    }
  };

  const colors = {
    first: '#FFBDC1',
    second: '#DF94C2',
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        buttonStyle,
        {
          backgroundColor:
            index && index % 2 == 1 ? colors.first : colors.second,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}>
      <Text style={[styles.text, textStyle]}> {region} </Text>
      <Icon name="x-square" style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFBDC1',
    borderRadius: 3,
    alignItems: 'center',
    elevation: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  text: {
    fontFamily: 'SeoulNamsanM',
    color: 'white',
    fontSize: 12,
  },
  icon: {
    color: 'white',
    fontSize: 13,
  },
  disabled: {
    opacity: 0.6, // 투명도를 줄여서 비활성화된 것처럼 보이게 함
    // 다른 스타일도 추가할 수 있음
  },
});

export default MainRegionSelectItem;

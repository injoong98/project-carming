import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import {RootState} from '../redux/store';
import MainMap from './../components/MainMap';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {token, memberInfo} = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View>
      <MainMap />
      <Text>{memberInfo?.nickname}님 환영합니다.</Text>
      <Text>로그인 토큰: {token}</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

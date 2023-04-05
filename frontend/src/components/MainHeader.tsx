import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {logout} from '../redux/slices/authSlice';
import {TouchableOpacity} from 'react-native';

export function MainHeaderTitleLogo() {
  return (
    <Image
      source={require('../assets/images/logo_white.png')}
      style={{resizeMode: 'contain', width: 80}}
    />
  );
}

export function MainHeaderRight() {
  const user = useSelector((state: RootState) => state.auth.memberInfo);
  const dispatch = useDispatch();
  //로그아웃
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '6%',
      }}>
      {/* <Text style={{fontFamily: 'SeoulNamsanM', fontSize: 12, color: 'white'}}>
        Welcome, {user?.nickname + ' '}
      </Text> */}
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={0.5}
        onPress={handleLogout}>
        <Icon name="exit-to-app" style={{fontSize: 26, color: 'white'}} />
      </TouchableOpacity>
    </View>
  );
}

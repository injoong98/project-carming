import {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginApi} from '../apis/loginApi';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../redux/slices/authSlice';
import {RootState} from '../redux/store';

const LoginForm = () => {
  // LoginForm 컴포넌트 내부
  const dispatch = useDispatch();
  const {isLoading, error: errorText} = useSelector(
    (state: RootState) => state.auth,
  );

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
    if (!phone && !password) {
      dispatch(loginFailure('전화번호와 비밀번호를 입력하세요.'));
      return;
    }
    if (!phone) {
      dispatch(loginFailure('전화번호를 입력하세요.'));
      return;
    }
    if (!password) {
      dispatch(loginFailure('비밀번호를 입력하세요.'));
      return;
    }

    dispatch(loginStart());
    try {
      const {tokenType, accessToken, nickname, profile} = await loginApi({
        phone,
        password,
      });
      dispatch(loginSuccess({tokenType, accessToken, nickname, profile}));
    } catch (error: any) {
      //any 말고 다른 방법은..?
      const message =
        error?.response?.data?.message ?? '로그인 중 오류가 발생했습니다.';
      dispatch(loginFailure(message));
    }
  };

  return (
    <View>
      <Text style={styles.loginFormText}>전화번호</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="전화번호를 입력하세요"
        placeholderTextColor="lightgray"
        style={styles.loginFormText}
      />
      <Text style={styles.loginFormText}>비밀번호</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        placeholderTextColor="lightgray"
        style={styles.loginFormText}
      />
      <Button
        title="로그인"
        color={'#8398D1'}
        onPress={handleLogin}
        disabled={isLoading}
      />
      {errorText && (
        <Text style={[styles.loginFormText, {marginTop: '2%'}]}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginFormText: {
    color: 'white',
    fontFamily: 'SeoulNamsanM',
  },
});

export default LoginForm;

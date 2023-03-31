import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  ImageBackground,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import {useSignupMutation} from '../apis/memberRegistApi';
import BackButton from '../components/BackButton';
import MemberRegistForm, {
  RegistFormValues,
} from '../components/MemberRegistForm';
import {L2_LandingStackParamList} from '../navigations/L2_LandingStackNavigator';
import {verifyInitialize} from '../redux/slices/authSlice';
import {RegistRequestPayload} from '../types/RegistRequestPayload';
import {useDispatch} from 'react-redux';
import {useEffect, useRef} from 'react';
import {FormikProps} from 'formik';

type SignupScreenNavigationProp = NavigationProp<
  L2_LandingStackParamList,
  'Signup'
>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [signup, {isLoading}] = useSignupMutation();
  const dispatch = useDispatch();

  const handleSubmit = (data: RegistFormValues) => {
    const newMember: RegistRequestPayload = {
      phone: data.phone,
      name: data.name,
      nickname: data.nickname,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      gender: data.gender,
      birthDate: data.birthDate,
      card: {
        cardNumber: data.cardNumber,
        companyName: data.companyName,
        cardPassword: data.cardPassword,
        cvv: data.cvv,
        cardExp: data.cardExp,
      },
    };

    console.log(newMember);
    signup(newMember)
      .unwrap()
      .then(response => {
        console.log(response);
        dispatch(verifyInitialize());
        Alert.alert('회원가입이 완료되었습니다.');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
        if (!error.data || !error.data.validation) {
          Alert.alert('회원가입에 실패했습니다.');
        } else if (
          error.data.validation.nickname === '이미 등록된 닉네임입니다.'
        ) {
          Alert.alert('이미 등록된 닉네임입니다.');
        } else {
          Alert.alert('회원가입에 실패했습니다.');
        }
      });
    // Handle form submission logic here
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container source={require('../assets/images/signup_screen.png')}>
        <View style={styles.container}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: '15%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <BackButton onPress={() => dispatch(verifyInitialize())} />
              <Image
                source={require('../assets/images/logo_white.png')}
                style={{height: 30, width: 114, resizeMode: 'contain'}}
              />
            </View>
            <MemberRegistForm
              onSubmit={handleSubmit}
              isSignupLoading={isLoading}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            <Text style={styles.signUpText}>이미 가입된 회원이신가요? </Text>
            <Text
              style={[styles.signUpText, {fontSize: 16}]}
              onPress={() => {
                navigation.goBack();
                dispatch(verifyInitialize());
                navigation.navigate('Login');
              }}>
              로그인
            </Text>
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};

const Container = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding-top: 10%;
  padding-bottom: 10%;
`;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'space-between',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '20%',
  },
  signUpText: {
    fontFamily: 'SeoulNamsanM',
    color: 'white',
    fontSize: 12,
  },
});

export default SignupScreen;

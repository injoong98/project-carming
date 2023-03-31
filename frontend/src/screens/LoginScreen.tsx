import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components/native';
import BackButton from '../components/BackButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {L2_LandingStackParamList} from '../navigations/L2_LandingStackNavigator';
import {ScrollView} from 'react-native';

type LoginScreenNavigationProp = NavigationProp<
  L2_LandingStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container source={require('../assets/images/login_screen.png')}>
        <View style={styles.container}>
          <View>
            <View style={{flexDirection: 'row', marginBottom: '15%'}}>
              <BackButton buttonStyle={{justifyContent: 'flex-start'}} />
            </View>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/logo_white.png')} />
            </View>
            <LoginForm />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text style={styles.signUpText}>아직 회원이 아니신가요? </Text>
            <Text
              style={[styles.signUpText, {fontSize: 16}]}
              onPress={() => {
                navigation.goBack();
                navigation.navigate('Signup');
              }}>
              회원가입
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
`;

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '80%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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

export default LoginScreen;

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {ImageBackground, Text, View, Image, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import MemberRegistForm, { RegistFormProps, RegistFormValues } from '../components/MemberRegistForm';
import { L2_LandingStackParamList } from '../navigations/L2_LandingStackNavigator';

type SignupScreenNavigationProp = NavigationProp<L2_LandingStackParamList, 'Signup'>

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSubmit = (data: RegistFormValues) => {
    console.log(data);
    // Handle form submission logic here
  };

  return(
    // <KeyboardAvoidingView style={{flex:1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Container source={require('../assets/images/signup_screen.png')}>
          <View style={styles.container}>
            <View>
              <View style={{ flexDirection: 'row', marginBottom:'15%', alignItems:'center', justifyContent:'space-between' }}>
                <BackButton />
                <Image source={require('../assets/images/logo_white.png')} style={{height:30, width:114, resizeMode:'contain'}} />
              </View>
              {/* <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo_white.png')}/>
              </View> */}
              <MemberRegistForm onSubmit={handleSubmit} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent:'center', marginTop: '10%'}}>
              <Text style={styles.signUpText}>이미 가입된 회원이신가요? </Text>
              <Text style={[styles.signUpText, {fontSize: 16}]} onPress={() => navigation.navigate('Login')}>로그인</Text>
            </View>
          </View>
        </Container>
      </ScrollView>
    // </KeyboardAvoidingView>
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
    color: 'white',
    fontSize: 12
  }
});

export default SignupScreen;

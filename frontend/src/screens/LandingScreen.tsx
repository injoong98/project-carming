import {ImageBackground, View} from 'react-native';
import styled from 'styled-components/native';
import CustomButton from '../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {L2_LandingStackParamList} from '../navigations/L2_LandingStackNavigator';

type LandingScreenNavigationProp = NavigationProp<
  L2_LandingStackParamList,
  'Landing'
>;

const LandingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  return (
    <Container source={require('../assets/images/landing_screen_large.png')}>
      <UpperView>
        <Title> 새로운 여정 경험을 선사하는 </Title>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Title> 자율주행 서비스,</Title>
          <Title style={{fontSize: 40}}> 카밍 </Title>
        </View>
      </UpperView>
      <LowerView>
        <BtnView>
          <CustomButton
            text="로그인"
            buttonStyle={{backgroundColor: 'transparent', elevation: 0}}
            textStyle={{
              fontSize: 30,
              fontFamily: 'SeoulNamsanB',
              textShadowColor: 'gray',
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 10,
            }}
            onPress={() => navigation.navigate('Login')}
          />
          <CustomButton
            text="회원가입"
            buttonStyle={{backgroundColor: 'transparent', elevation: 0}}
            textStyle={{
              fontSize: 30,
              fontFamily: 'SeoulNamsanB',
              textShadowColor: 'gray',
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 10,
            }}
            onPress={() => navigation.navigate('Signup')}
          />
        </BtnView>
      </LowerView>
    </Container>
  );
};

const Container = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Title = styled.Text`
  font-family: 'SeoulNamsanEB';
  font-size: 32px;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 10px gray;
  margin-top: 10px;
`;

const UpperView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LowerView = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const BtnView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 60%;
`;

export default LandingScreen;

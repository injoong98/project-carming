import styled from 'styled-components/native';
import {ImageBackground, SafeAreaView} from 'react-native';

const LaunchScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container source={require('../assets/images/launch_screen.png')}>
        <Title style={{fontSize: 40}}> CARMING </Title>
        <Title> IS COMMING </Title>
        <Title style={{fontSize: 24}}> ... </Title>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(ImageBackground)`
  flex: 1;
  padding-top: 40%;
  align-items: center;
  // justify-content: center;
  background-color: white;
`;

const Title = styled.Text`
  font-family: 'SeoulNamsanEB';
  font-size: 32px;
  color: white;
  text-align: center;
  text-shadow: 3px 3px 20px gray;
  margin-top: 10px;
`;

export default LaunchScreen;

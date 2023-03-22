import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

const LaunchScreen = () => {
  return (
    <Container source={require('../assets/images/launch_screen_large.png')}>
      <Title> CARMING </Title>
      <Title> IS COMMING </Title>
      <Title> ... </Title>
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
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
  text-shadow: 3px 3px 20px gray;
`;

export default LaunchScreen;

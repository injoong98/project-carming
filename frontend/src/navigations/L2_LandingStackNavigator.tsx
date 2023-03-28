import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import LandingScreen from '../screens/LandingScreen';

// StackParamList 인터페이스 정의
export type L2_LandingStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<L2_LandingStackParamList>();

function L2_LandingStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default L2_LandingStackNavigator;

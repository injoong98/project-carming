import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarCallScreen from '../screens/CarCallScreen';

export type L4_JourneyStackParamList = {
  CarCall: undefined;
};

const Stack = createNativeStackNavigator<L4_JourneyStackParamList>();

function L4_JourneyStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CarCall"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CarCall" component={CarCallScreen} />
    </Stack.Navigator>
  );
}

export default L4_JourneyStackNavigator;

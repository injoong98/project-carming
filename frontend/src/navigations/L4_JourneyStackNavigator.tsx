import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarCallScreen from '../screens/CarCallScreen';
import CarMoveScreen from '../screens/CarMoveScreen';
import {Coordinate, Place} from '../types';

export type L4_JourneyStackParamList = {
  CarCall: {start: Coordinate; end: Coordinate};
  CarMove: undefined;
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
      <Stack.Screen name="CarMove" component={CarMoveScreen} />
    </Stack.Navigator>
  );
}

export default L4_JourneyStackNavigator;

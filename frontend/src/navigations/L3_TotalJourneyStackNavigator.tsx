import {createNativeStackNavigator} from '@react-navigation/native-stack';
import L4_CourseCreateStackNavigator from './L4_CourseCreateStackNavigator';
import L4_JourneyStackNavigator from './L4_JourneyStackNavigator';
import L4_JourneyEndStackNavigator from './L4_JourneyEndStackNavigator';

export type L3_TotalJourneyStackParamList = {
  CourseCreate: undefined;
  Journey: undefined;
  JourneyEnd: undefined;
};

const Stack = createNativeStackNavigator<L3_TotalJourneyStackParamList>();

function L3_TotalJourneyStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CourseCreate"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CourseCreate"
        component={L4_CourseCreateStackNavigator}
      />
      <Stack.Screen name="Journey" component={L4_JourneyStackNavigator} />
      <Stack.Screen name="JourneyEnd" component={L4_JourneyEndStackNavigator} />
    </Stack.Navigator>
  );
}

export default L3_TotalJourneyStackNavigator;

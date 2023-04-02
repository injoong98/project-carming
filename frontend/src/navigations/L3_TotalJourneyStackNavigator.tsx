import {createNativeStackNavigator} from '@react-navigation/native-stack';
import L4_CourseCreateStackNavigator, {
  L4_CourseCreateStackParamList,
} from './L4_CourseCreateStackNavigator';
import L4_JourneyStackNavigator, {
  L4_JourneyStackParamList,
} from './L4_JourneyStackNavigator';
import L4_JourneyEndStackNavigator, {
  L4_JourneyEndStackParamList,
} from './L4_JourneyEndStackNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';

export type L3_TotalJourneyStackParamList = {
  CourseCreate: NavigatorScreenParams<L4_CourseCreateStackParamList>;
  Journey: NavigatorScreenParams<L4_JourneyStackParamList>;
  JourneyEnd: NavigatorScreenParams<L4_JourneyEndStackParamList>;
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

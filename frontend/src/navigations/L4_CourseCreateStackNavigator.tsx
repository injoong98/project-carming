import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CoursesRecommendScreen from '../screens/CoursesRecommendScreen';
import PlacesRecommendScreen from '../screens/PlacesRecommendScreen';

export type L4_CourseCreateStackParamList = {
  Places: undefined;
  Courses: undefined;
};

const Stack = createNativeStackNavigator<L4_CourseCreateStackParamList>();

function L4_CourseCreateStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Places"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Places" component={PlacesRecommendScreen} />
      <Stack.Screen name="Courses" component={CoursesRecommendScreen} />
    </Stack.Navigator>
  );
}

export default L4_CourseCreateStackNavigator;

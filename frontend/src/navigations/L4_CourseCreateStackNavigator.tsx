import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecommendScreen from '../screens/RecommendScreen';
import CourseEditScreen from '../screens/CourseEditScreen';
import {AlertNotificationRoot} from 'react-native-alert-notification';

export type L4_CourseCreateStackParamList = {
  Recommend: undefined;
  CourseEdit: {recommendType: string};
};

const Stack = createNativeStackNavigator<L4_CourseCreateStackParamList>();

function L4_CourseCreateStackNavigator() {
  return (
    <AlertNotificationRoot>
      <Stack.Navigator
        initialRouteName="Recommend"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Recommend" component={RecommendScreen} />
        <Stack.Screen name="CourseEdit" component={CourseEditScreen} />
      </Stack.Navigator>
    </AlertNotificationRoot>
  );
}

export default L4_CourseCreateStackNavigator;

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {L2_LandingStackNavigator} from '.';
import L2_AppDrawerNavigator from './L2_AppDrawerNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Stack = createNativeStackNavigator();

function RootStackNavigator() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Stack.Navigator
      initialRouteName="AppDrawer"
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen name="AppDrawer" component={L2_AppDrawerNavigator} />
      ) : (
        // <Stack.Screen name="AppDrawer" component={L2_AppDrawerNavigator} />
        <Stack.Screen
          name="LandingStack"
          component={L2_LandingStackNavigator}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootStackNavigator;

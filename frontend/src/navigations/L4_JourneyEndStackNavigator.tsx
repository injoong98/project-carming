import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReceiptScreen from '../screens/ReceiptScreen';
import ReviewWirteScreen from '../screens/ReviewWirteScreen';
import {MainHeaderTitleLogo} from '../components';
import {AlertNotificationRoot} from 'react-native-alert-notification';

export type L4_JourneyEndStackParamList = {
  Receipt: undefined;
  Review: undefined;
};

const Stack = createNativeStackNavigator<L4_JourneyEndStackParamList>();

function L4_JourneyEndStackNavigator() {
  return (
    <AlertNotificationRoot>
      <Stack.Navigator
        initialRouteName="Receipt"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8398D1',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitle: () => MainHeaderTitleLogo(),
        }}>
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
        <Stack.Screen name="Review" component={ReviewWirteScreen} />
      </Stack.Navigator>
    </AlertNotificationRoot>
  );
}

export default L4_JourneyEndStackNavigator;

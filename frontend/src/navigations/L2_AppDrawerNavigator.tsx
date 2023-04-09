import {createDrawerNavigator} from '@react-navigation/drawer';
import L3_MainDrawerNavigator from './L3_MainDrawerNavigator';
import L3_TotalJourneyStackNavigator, {
  L3_TotalJourneyStackParamList,
} from './L3_TotalJourneyStackNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';

export type L2_AppDrawerParamList = {
  Main: undefined;
  TotalJourney: NavigatorScreenParams<L3_TotalJourneyStackParamList>;
};

const Drawer = createDrawerNavigator<L2_AppDrawerParamList>();

function L2_AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      // initialRouteName="TotalJourney"
      initialRouteName="Main"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}>
      <Drawer.Screen name="Main" component={L3_MainDrawerNavigator} />
      <Drawer.Screen
        name="TotalJourney"
        options={{
          swipeEnabled: false,
        }}
        component={L3_TotalJourneyStackNavigator}
      />
    </Drawer.Navigator>
  );
}

export default L2_AppDrawerNavigator;

import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import UserPlacesScreen from '../screens/UserPlacesScreen';
import UserCoursesScreen from '../screens/UserCoursesScreen';
import UserPaymentsScreen from '../screens/UserPaymentsScreen';
import {MainHeaderTitleLogo} from '../components';
import {MainHeaderRight} from '../components/MainHeader';

export type L3_MainDrawerParamList = {
  home: undefined;
  UserPlaces: undefined;
  UserCourses: undefined;
  UserPayments: undefined;
};

const Drawer = createDrawerNavigator<L3_MainDrawerParamList>();

type DrawerOptions = DrawerNavigationOptions & {
  gestureEnabled?: boolean;
};

function L3_MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerStyle: {
          height: 55,
          backgroundColor: '#8398D1',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitle: () => MainHeaderTitleLogo(),
        headerLeft: () => <></>, // 헤더 좌측 메뉴 버튼 없애기
        headerRight: () => MainHeaderRight(),
      }}>
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={
          {
            gestureEnabled: false,
          } as DrawerOptions
        } // DrawerOptions 타입으로 캐스팅하여 gestureEnabled 속성 사용 가능
      />
      <Drawer.Screen
        name="UserPlaces"
        component={UserPlacesScreen}
        options={
          {
            gestureEnabled: false,
          } as DrawerOptions
        } // DrawerOptions 타입으로 캐스팅하여 gestureEnabled 속성 사용 가능
      />
      <Drawer.Screen
        name="UserCourses"
        component={UserCoursesScreen}
        options={
          {
            gestureEnabled: false,
          } as DrawerOptions
        } // DrawerOptions 타입으로 캐스팅하여 gestureEnabled 속성 사용 가능
      />
      <Drawer.Screen
        name="UserPayments"
        component={UserPaymentsScreen}
        options={
          {
            gestureEnabled: false,
          } as DrawerOptions
        } // DrawerOptions 타입으로 캐스팅하여 gestureEnabled 속성 사용 가능
      />
    </Drawer.Navigator>
  );
}

export default L3_MainDrawerNavigator;

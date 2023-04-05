/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import L1_RootStackNavigator from './src/navigations/L1_RootStackNavigator';
import {MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#7173C9',
    secondary: '#DF94C2',
    onPrimary: '#141060',
    tertiary: '#FFBDC1',
    surface: '#8398D1',
    surfaceVariant: '#70558E',
    surfaceDisabled: '#D9D9D9',
    shadow: '#0000009d',
  },
};

function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <L1_RootStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

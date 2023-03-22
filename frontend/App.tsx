/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {useState} from 'react';
import L1_RootStackNavigator from './src/navigations/L1_RootStackNavigator';
import LaunchScreen from './src/screens/LaunchScreen';
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
  const [isLoaded, setIsLoaded] = useState(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 3000);

  return (
    <PaperProvider theme={theme}>
      {isLoaded ? (
        <NavigationContainer>
          <L1_RootStackNavigator />
        </NavigationContainer>
      ) : (
        <LaunchScreen />
      )}
    </PaperProvider>
  );
}

export default App;

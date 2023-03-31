/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';
import L1_RootStackNavigator from './src/navigations/L1_RootStackNavigator';
import LaunchScreen from './src/screens/LaunchScreen';

import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

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
  }, 100);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          {isLoaded ? (
            <NavigationContainer>
              <L1_RootStackNavigator />
            </NavigationContainer>
          ) : (
            <LaunchScreen />
          )}
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

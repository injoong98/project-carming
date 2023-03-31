import {Image} from 'react-native';

export function MainHeaderTitleLogo() {
  return (
    <Image
      source={require('../assets/images/logo_white.png')}
      style={{resizeMode: 'contain', width: 90}}
    />
  );
}

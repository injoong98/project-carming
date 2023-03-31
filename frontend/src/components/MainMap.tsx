import {Image} from 'react-native';

const MainMap = () => {
  return (
    <Image
      source={require('../assets/images/main_map.png')}
      style={{resizeMode: 'contain', width: '100%', height: '60%'}}
    />
  );
};

export default MainMap;

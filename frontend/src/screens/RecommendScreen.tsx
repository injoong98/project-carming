import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {IconButton, useTheme} from 'react-native-paper';
import {SegmentedButtons} from 'react-native-paper';
import {useState} from 'react';
import PlacesRecommendScreen from './PlacesRecommendScreen';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {View} from 'react-native';
import CoursesRecommendScreen from './CoursesRecommendScreen';

const RecommendScreen = () => {
  const theme = useTheme();

  const [recommendType, setRecommendType] = useState<string>('0');
  const recommendTypeChangeButtons = [
    {
      value: '0',
      label: '장소',
      icon: 'map-marker',
      checkedColor: 'white',
      uncheckedColor: 'white',
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '0' ? theme.colors.primary : theme.colors.shadow,
      },
    },
    {
      value: '1',
      label: '코스',
      icon: 'routes',
      checkedColor: 'white',
      uncheckedColor: 'white',
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '1' ? theme.colors.primary : theme.colors.shadow,
      },
    },
  ];

  return (
    <AlertNotificationRoot theme={'light'}>
      <GradientBackground colors={['#70558e7a', '#df94c283', '#ffbdc1b0']}>
        <SafeAreaView style={{flex: 1}}>
          <StyledView style={{justifyContent: 'space-between'}}>
            <SegmentedButtons
              style={{width: 200}}
              value={recommendType}
              onValueChange={setRecommendType}
              buttons={recommendTypeChangeButtons}
            />
            <IconButton
              icon="home"
              size={30}
              onPress={() => {
                console.log('hello');
              }}
            />
          </StyledView>
          {recommendType === '0' ? (
            <PlacesRecommendScreen />
          ) : (
            <CoursesRecommendScreen />
          )}
        </SafeAreaView>
      </GradientBackground>
    </AlertNotificationRoot>
  );
};

const StyledView = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;

const GradientBackground = styled(LinearGradient)`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default RecommendScreen;

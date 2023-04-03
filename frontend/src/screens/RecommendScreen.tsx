import {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, useTheme, SegmentedButtons} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import PlacesRecommendScreen from './PlacesRecommendScreen';
import CoursesRecommendScreen from './CoursesRecommendScreen';
import {L4_CourseCreateStackParamList} from '../navigations/L4_CourseCreateStackNavigator';
import {CustomButton} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGetTagsQuery} from '../apis/tagApi';
import {setTagList} from '../redux/slices/tagSlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {L2_AppDrawerParamList} from '../navigations/L2_AppDrawerNavigator';

export type RecommendScreenProps = CompositeScreenProps<
  NativeStackScreenProps<L4_CourseCreateStackParamList, 'Recommend'>,
  DrawerScreenProps<L2_AppDrawerParamList>
>;

const RecommendScreen: React.FC<RecommendScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [recommendType, setRecommendType] = useState<string>('0');
  const {data: tagLists} = useGetTagsQuery();

  useEffect(() => {
    if (tagLists !== undefined) dispatch(setTagList(tagLists));
  }, [tagLists]);

  const homeBtnPressed = () => {
    navigation.navigate('Main');
  };

  const recommendTypeChangeButtons = [
    {
      value: '0',
      label: '장소',
      icon: 'map-marker',
      checkedColor: 'white',
      uncheckedColor: 'white',
      onPress: () => {},
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
      onPress: () => {},
      style: {
        borderRadius: 10,
        backgroundColor:
          recommendType === '1' ? theme.colors.primary : theme.colors.shadow,
      },
    },
  ];

  return (
    <GradientBackground colors={['#70558e7a', '#df94c283', '#ffbdc1b0']}>
      <SafeAreaView style={{flex: 1}}>
        <StyledView style={{justifyContent: 'space-between'}}>
          <SegmentedButtons
            style={{width: 200}}
            value={recommendType}
            onValueChange={setRecommendType}
            buttons={recommendTypeChangeButtons}
          />
          <IconButton icon="home" size={30} onPress={() => homeBtnPressed()} />
        </StyledView>
        {recommendType === '0' ? (
          <PlacesRecommendScreen />
        ) : (
          <CoursesRecommendScreen />
        )}
        <StyledView style={{justifyContent: 'center'}}>
          <CustomButton
            text={'선택 완료'}
            onPress={() => navigation.navigate('CourseEdit', {recommendType})}
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: theme.colors.surfaceVariant,
            }}
            textStyle={styles.buttonText}
          />
        </StyledView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 200,
    padding: 14,
    height: 50,
    marginTop: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

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

import {Image, ImageStyle, ImageBackground, Text, View} from 'react-native'; // 리액트 네이티브에서 제공하는 컴포넌트 추가
import styled, {useTheme} from 'styled-components';
import MainRegionSelectItem from './MainRegionSelectItem';
import CustomButton from './CustomButton';
import MainMapDistrictButton from './MainMapDistrictButton';
import {SeoulDistrict} from '../types/SeoulDistrict';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useEffect} from 'react';
import {initializeMainState} from '../redux/slices/mainSlice';
import {useNavigation} from '@react-navigation/native';
import {L2_AppDrawerParamList} from '../navigations/L2_AppDrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {setJourneyPlaceList} from '../redux/slices/journeySlice';
import {setPlaceCart, setPlaceList} from '../redux/slices/placeSlice';
import {Place} from '../types';

interface MainMapProps {
  imgStyle?: ImageStyle;
  onPress?: () => void;
  disabled?: boolean;
}

type MainMapNavigationProp = DrawerNavigationProp<L2_AppDrawerParamList>;

const MainMap: React.FC<MainMapProps> = ({imgStyle, onPress, disabled}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<MainMapNavigationProp>();
  //스크린이 처음 렌더링 될 때 main store 초기화(regionList, preCart)
  useEffect(() => {
    dispatch(initializeMainState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regionList = useSelector((state: RootState) => state.main.regionList);
  const startBtnPressed = () => {
    navigation.navigate('TotalJourney', {
      screen: 'CourseCreate',
      params: {screen: 'Recommend'},
    });
  };

  const preCart: Place[] = useSelector((state: RootState) => {
    return state.main.preCart;
  });

  return (
    <>
      {/* <View style={{height: '40%'}}> */}
      <MapContainer source={require('../assets/images/main_map_clean.png')}>
        <MainMapDistrictButton
          region={SeoulDistrict.DOBONG}
          top="8%"
          left="53%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.NOWON}
          top="15%"
          left="63%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GANGBUK}
          top="20%"
          left="49%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.SEONGBUK}
          top="32%"
          left="48%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.JUNGNANG}
          top="35%"
          left="67%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.DONGDAEMUN}
          top="40%"
          left="56%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GANGDONG}
          top="51%"
          left="79%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GWANGJIN}
          top="52%"
          left="66%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.SONGPA}
          top="66%"
          left="72%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.SEONGDONG}
          top="50%"
          left="55%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GANGNAM}
          top="72%"
          left="60%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.SEOCHO}
          top="76%"
          left="50%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.JUNG}
          top="48%"
          left="47%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.YONGSAN}
          top="58%"
          left="42%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.JONGNO}
          top="37%"
          left="40%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.EUNPYEONG}
          top="25%"
          left="31%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.SEODAEMUN}
          top="42%"
          left="31%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.MAPO}
          top="48%"
          left="26%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.YEONGDEUNGPO}
          top="62%"
          left="26%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.DONGJAK}
          top="68%"
          left="36%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GWANAK}
          top="80%"
          left="35%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GEUMCHEON}
          top="83%"
          left="24%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.YANGCHEON}
          top="62%"
          left="14%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GURO}
          top="70%"
          left="14%"
        />
        <MainMapDistrictButton
          region={SeoulDistrict.GANGSEO}
          top="47%"
          left="8%"
        />
      </MapContainer>
      <RegionListView>
        {regionList.map((region, index) => (
          <MainRegionSelectItem key={index} region={region} index={index} />
        ))}
      </RegionListView>
      <CustomButton
        text="출발하기"
        textStyle={{fontFamily: 'SeoulNamsanM', fontSize: 16}}
        buttonStyle={{
          backgroundColor: '#9480AA',
          paddingHorizontal: 40,
          borderRadius: 100,
        }}
        onPress={() => {
          startBtnPressed();
          dispatch(setPlaceCart(preCart));
        }}
      />
      <View style={{marginBottom: '5%'}}></View>
      {/* </View> */}
    </>
  );
};

const MapContainer = styled(ImageBackground)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  // height: 330px;
  aspect-ratio: 1.25;
`;
// aspect-ratio: 이미지의 가로/세로 비율을 유지

const MapRegionButtomContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
// 세로 중앙 정렬, 가로 중앙 정렬, 가운데 정렬

const RegionListView = styled(View)`
  margin: 5%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
  padding-horizontal: 7%;
  align-content: center;
  justify-items: flex-start;
  background-color: white;
`;

export default MainMap;

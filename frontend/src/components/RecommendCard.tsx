import {ImageBackground, Text, View} from 'react-native';
import styled from 'styled-components';

const RecommendCard = ({item, index}) => {
  return (
    <StyledCardView>
      <StyledImageBackGround source={{uri: item.imageUrl}}>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
      </StyledImageBackGround>
    </StyledCardView>
  );
};

const StyledCardView = styled(View)`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledImageBackGround = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default RecommendCard;

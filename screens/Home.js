import React,{useState} from "react";
import styled from "styled-components";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../config";
import Carousel from 'react-native-snap-carousel';
import {POST_MANY} from './HomeQuries'
import { useQuery } from "react-apollo-hooks";
import { ImageBackground } from "react-native";
const OutContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Container = styled.View`
  z-index:-2
  flex:1
`;

const ImageBack = styled.Image`
  z-index:-1
  width: ${SCREEN_WIDTH};
  height: ${SCREEN_HEIGHT};
`;

const CarouselContainer = styled.View`
  height: ${SCREEN_WIDTH / 3 * 1.2 +100};
`;

const TextItem = styled.Text`
  background:white
  border-radius:50px
  text-align:center
  width: ${SCREEN_WIDTH / 4 * 1.2};
  padding-left:20px
  padding-right:20px
  padding-top:10px
  padding-bottom:10px
`;

const Touchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`
const ImageCard = styled.Image`
  width: ${SCREEN_WIDTH / 4 * 1.2};
  height: ${SCREEN_WIDTH / 3 * 1.2};
  border-radius:30px
  margin-top:20px
`

const S3URL = "https://slaptory-s3.s3.ap-northeast-2.amazonaws.com/"
export default ({ navigation }) => {
  const postManyRes = useQuery(POST_MANY)
  postManyRes.refetch()
  const [image, setImage] = postManyRes.data!==undefined?useState(postManyRes.data.postMany[0].Images[0].url):useState("")

  const data = postManyRes.data!==undefined? postManyRes.data.postMany : [];
  const _renderItem = ({item, index}) => {
    return (
        <ImageContainer>
          <Touchable onPress = {()=>setImage({uri:S3URL+item.Images[0].url})}>
            <TextItem numberOfLines={1}>{item.title}</TextItem>
            <ImageCard  
              resizeMode={"cover"}
              source={item!==undefined? {uri: S3URL+item.Images[0].url} : null}/>
          </Touchable>
        </ImageContainer>
    );
  }

  return (
      <OutContainer>
          <Container>
            <ImageBack
              resizeMode={"cover"}
              source={image}/>
          </Container>
          <CarouselContainer>
            <Carousel
              layout={'stack'} layoutCardOffset={`160`}
              data={data}
              renderItem={_renderItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH / 4 * 1.1}
            />
          </CarouselContainer>
      </OutContainer>
  )
};

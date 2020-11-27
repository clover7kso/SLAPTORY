import React,{useState} from "react";
import styled from "styled-components";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../config";
import Carousel from '../components/MyCustomCarousel';
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
  height: ${SCREEN_WIDTH / 3 * 1.2 +130};
`;



export default ({ navigation }) => {
  const postManyRes = useQuery(POST_MANY)
  postManyRes.refetch()
  const [image, setImage] = postManyRes.data!==undefined?useState(postManyRes.data.postMany[0].Images[0].url):useState("")

  const data = postManyRes.data!==undefined? postManyRes.data.postMany : [];


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
              setImage={setImage}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH / 4 * 1.1}
            />
          </CarouselContainer>
      </OutContainer>
  )
};

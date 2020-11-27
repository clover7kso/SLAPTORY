import React, { PureComponent, useState } from 'react';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../config";
import styled from "styled-components";

const S3URL = "https://slaptory-s3.s3.ap-northeast-2.amazonaws.com/"

const TextItem = styled.Text`
  background:white
  border-radius:50px
  text-align:center
  width: ${SCREEN_WIDTH / 4 * 1.2};
  padding-left:20px
  padding-right:20px
  padding-top:10px
  padding-bottom:10px
  margin-top:20px
`;

const EmptyItem = styled.Text`
  width: ${SCREEN_WIDTH / 4 * 1.2};
  padding-left:20px
  padding-right:20px
  padding-top:10px
  padding-bottom:10px
  margin-top:20px
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

const CarouselContainer = styled.View`
  height: ${SCREEN_WIDTH / 3 * 1.2 +130};
`;


export default class MyCustomCarousel extends PureComponent {
    constructor(props) {
        super(props);
        this.setImage = props.setImage;      
        this.selected=0;
    }

    _renderItem = ({item, index}) => {
        return (
            <ImageContainer>
              <Touchable onPress = {()=>{
                  this.setImage({uri:S3URL+item.Images[0].url})
                  this.refs.carousel.snapToItem(index)
                  this.selected=index
                  this.forceUpdate()
                }}>
                {this.selected===index?<TextItem numberOfLines={1}>{item.title}</TextItem>:<EmptyItem/>}
                <ImageCard  
                  resizeMode={"cover"}
                  source={item!==undefined? {uri: S3URL+item.Images[0].url} : null}/>
              </Touchable>
            </ImageContainer>
        );
      }

    _scrollInterpolator (index, carouselProps) {
        const range = [2, 1, 0, -1, -2];
        const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
        const outputRange = range;

        return { inputRange, outputRange };
    }

    _animatedStyles (index, animatedValue, carouselProps) {
        const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

        return {
            zIndex: animatedValue.interpolate({
                inputRange: [-2, -1, 0, 1, 2],
                outputRange: [-2, -1, 0, -1, -2],
                extrapolate: 'clamp'
            }),
            opacity: animatedValue.interpolate({
                inputRange: [-2, -1, 0, 1, 2],
                outputRange: [0.8, 0.9, 1, 0.9, 0.8],
            }),
            transform: [{
                rotate: animatedValue.interpolate({
                    inputRange: [-2, -1, 0, 1, 2],
                    outputRange: ['-25deg', '-15deg', '0deg', '15deg', '25deg'],
                    extrapolate: 'clamp'
                }),
                translateY: animatedValue.interpolate({
                    inputRange: [-2, -1, 0, 1, 2],
                    outputRange: [60,15,0,15,60]  // 0 : 150, 0.5 : 75, 1 : 0
                  }),
            }, {
                [translateProp]: animatedValue.interpolate({
                    inputRange: [-2, -1, 0, 1, 2],
                    outputRange: [
                        0,
                        0,
                        0, // centered
                        0, // centered
                        0 // centered
                    ],
                    extrapolate: 'clamp'
                })
            }]
        };
    }

    render () {
        const {data,setImage} = this.props
        return (
            <CarouselContainer>
                <Carousel
                    // other props
                    extraData={this.selected}
                    ref={'carousel'}
                    data={data}
                    sliderWidth={SCREEN_WIDTH}
                    itemWidth={SCREEN_WIDTH / 4 * 1.1}
                    renderItem={this._renderItem}
                    scrollInterpolator={this._scrollInterpolator}
                    slideInterpolatedStyle={this._animatedStyles}
                    useScrollView={true}
                    lockScrollWhileSnapping={true}
                />
            </CarouselContainer>

        );
    }
}

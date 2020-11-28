import React,{useState} from "react";
import styled from "styled-components";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../config";
import Carousel from '../components/MyCustomCarousel';
import {POST_MANY,POST_ONE} from './HomeQuries'
import { useQuery } from "react-apollo-hooks";
import { BlurView } from 'expo-blur';
import {Animated} from 'react-native';

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

//Profile Infomation
const ProfileContainer = styled.View`
  flex-direction:row
  padding-left:20px
  padding-right:20px
  flex:1
  align-items:center
`;

const ProfileVerticalContainer = styled.View`
  padding-left:15px
  justify-content:space-around
  height:70
`;
const ProfileHorizontalContainer = styled.View`
  flex-direction:row
  align-items:baseline
`;

const ProfileName = styled.Text`
  font-family:NanumR
  font-size:20px
`

const BtnSubscribe = styled.TouchableOpacity`
  background:white
  border-radius:20px
  padding-top:3px
  padding-bottom:3px
  padding-left:10px
  padding-right:10px
  margin-right:10px
`

const BtnSubscribeText = styled.Text`
  font-family:NanumR
`

const ProfileNumSubscribers = styled.Text`
  font-family:NanumR
  color:grey
  font-size:11px
`

const ProfileImg = styled.Image`
  border-radius: 30px
  width: 70px;
  height: 70px;
`;


//Post Infomation
const PostVerticalContainer = styled.View`
  padding-left:20px
  justify-content:space-around
  height:70
`;

const PostTitle = styled.Text`
  font-family:NanumR
  font-size:25px
`

const PostDate = styled.Text`
  font-family:NanumR
  text-align:right
  padding-right:20px
  color:grey
  font-size:11px
`

//btn_back
const BtnContainer =styled.View`
  position: absolute
  top: ${SCREEN_HEIGHT-220}
  left: ${SCREEN_WIDTH/2-45}
  bottom: 0
  right: 0
`
const BtnPost = styled.TouchableOpacity`
`

const BtnPostImg = styled.Image`
  width:90px
  height:90px
`

const S3URL = "https://slaptory-s3.s3.ap-northeast-2.amazonaws.com/"

export default ({ navigation }) => {
  //animation Value
  const [positionTop, setPositionTop] = useState(new Animated.ValueXY({x:0,y:0}))
  const [positionBottom, setPositionBottom] = useState(new Animated.ValueXY({x:0,y:0}))
  const moveDisappear = () =>{
    Animated.timing(
      positionTop,{
        toValue:{x:0,y:-90},
        duration:400,
      }
    ).start()

    Animated.timing(
      positionBottom,{
        toValue:{x:0,y:SCREEN_WIDTH / 3 * 1.2 +160},
        duration:400,
      }
    ).start()
  }
  const moveBack = () =>{
    Animated.timing(
      positionTop,{
        toValue:{x:0,y:0},
        duration:400,
      }
    ).start()

    Animated.timing(
      positionBottom,{
        toValue:{x:0,y:0},
        duration:400,
      }
    ).start()
  }
  const getStyleTop = () =>{
    return{
      position: "absolute",
      transform:[{translateY:positionTop.y}]
    }
  }
  const getStyleBottom = () =>{
    return{
      transform:[{translateY:positionBottom.y}]
    }
  }

  //data start
  const postManyRes = useQuery(POST_MANY)
  var activeIndex = 0;
  const [postId, setPostId] = postManyRes.data!==undefined?useState(postManyRes.data.postMany[0].id):useState("")
  const [image, setImage] = postManyRes.data!==undefined?useState({uri:S3URL+postManyRes.data.postMany[0].Images[0].url}):useState("")

  const data = postManyRes.data!==undefined? postManyRes.data.postMany : [];

  const postOneRes = useQuery(POST_ONE,{variables:{id:postId}})
  var userName = ""
  var subscriberNum = ""
  var title = ""
  var date = ""
  if(postOneRes.data !== undefined)
  {
    userName = postOneRes.data.postOne.userName
    subscriberNum = postOneRes.data.postOne.subscriberCount
    title = postOneRes.data.postOne.title
    date = postOneRes.data.postOne.timeFromToday
  }
  
  const _handleDoubleClickItem = (clickedIndex) =>{
    if(clickedIndex===activeIndex) {moveDisappear()}
  }
  const _handleClickItem=(postId, imageUrl,index)=>{
    _handleDoubleClickItem(index)
    activeIndex = index
    setPostId(postId)
    setImage(imageUrl)
  }
  return (
      <OutContainer>
          <Container>
            <ImageBack
              resizeMode={"cover"}
              source={image}/>
              <Animated.View style={getStyleTop()}>
                <BlurView 
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: SCREEN_WIDTH,
                    height: 90
                  }}
                  intensity={250}>
                  <ProfileContainer>
                    <ProfileImg 
                      resizeMode={"contain"}
                      source={require("../assets/images/profile_img.png")}/>
                    <ProfileVerticalContainer>
                      <ProfileName>{userName}</ProfileName>
                      <ProfileHorizontalContainer>
                        <BtnSubscribe>
                          <BtnSubscribeText>
                            구독+
                          </BtnSubscribeText>
                        </BtnSubscribe>
                        <ProfileNumSubscribers>{subscriberNum}명</ProfileNumSubscribers>
                      </ProfileHorizontalContainer>
                    </ProfileVerticalContainer>
                  </ProfileContainer>
                </BlurView>

                <BlurView 
                  style={{
                    position: "absolute",
                    top: 90,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: SCREEN_WIDTH,
                    height: 70
                  }}
                  intensity={250}>
                  <PostVerticalContainer>
                    <PostTitle>{title}</PostTitle>
                    <PostDate>{date}</PostDate>
                  </PostVerticalContainer>
                </BlurView>
              </Animated.View>
          </Container>
          <Animated.View style={getStyleBottom()}>
            <Carousel
              data={data}
              handleClickItem={_handleClickItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH / 4 * 1.1}
            />
          </Animated.View>

          <BtnContainer>
            <BtnPost
              onPress={()=>moveBack()}>
              <BtnPostImg 
                resizeMode={"contain"}
                source={require("../assets/images/btn_post.png")}/>
              </BtnPost>
          </BtnContainer>
      </OutContainer>
  )
};

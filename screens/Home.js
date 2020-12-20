import React, { useState } from "react";
import styled from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config";
import Carousel from "../components/MyCustomCarousel";
import { POST_MANY, POST_ONE } from "./HomeQuries";
import { useQuery } from "react-apollo-hooks";
import { BlurView } from "expo-blur";
import { Animated } from "react-native";
import NewVerticalScroll from "../components/NewVerticalScroll";

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
`;

const Btn = styled.TouchableOpacity`
  flex-direction:row
  background:white
  border-radius:20px
  padding-top:3px
  padding-bottom:3px
  padding-left:10px
  padding-right:10px
  margin-right:10px
`;

const BtnText = styled.Text`
  font-family: NanumR;
`;

const ProfileNumSubscribers = styled.Text`
  font-family:NanumR
  color:grey
  font-size:11px
`;

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

const PostHorizontalContainer = styled.View`
  flex-direction:row
  align-items:baseline
  justify-content:space-between
`;

const PostHorizontalContainer2 = styled.View`
  flex-direction:row
  align-items:baseline
`;

const PostTitle = styled.Text`
  margin-top:10px
  font-family:NanumR
  font-size:25px
`;

const PostDate = styled.Text`
  font-family:NanumR
  text-align:right
  padding-right:20px
  color:grey
  font-size:11px
`;
const PostLike = styled.Image`  
  margin-right:5px
  width: 15px;
  height: 15px;
`;

//btn_back
const BtnContainer = styled.View`
  position: absolute
  top: ${SCREEN_HEIGHT - 220}
  left: ${SCREEN_WIDTH / 2 - 45}
  bottom: 0
  right: 0
`;
const BtnPost = styled.TouchableOpacity``;

const BtnPostImg = styled.Image`
  width:90px
  height:90px
`;

const S3URL = "https://slaptory-s3.s3.ap-northeast-2.amazonaws.com/";

export default ({ navigation }) => {
  //animation Value
  const [positionTop] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [positionBottom] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const moveDisappear = () => {
    Animated.timing(positionTop, {
      toValue: { x: 0, y: -170 },
      duration: 400,
    }).start();

    Animated.timing(positionBottom, {
      toValue: { x: 0, y: (SCREEN_WIDTH / 3) * 1.2 + 160 },
      duration: 400,
    }).start();
  };
  const moveBack = () => {
    Animated.timing(positionTop, {
      toValue: { x: 0, y: 0 },
      duration: 400,
    }).start();

    Animated.timing(positionBottom, {
      toValue: { x: 0, y: 0 },
      duration: 400,
    }).start();
  };
  const getStyleTop = () => {
    return {
      position: "absolute",
      transform: [{ translateY: positionTop.y }],
    };
  };
  const getStyleBottom = () => {
    return {
      transform: [{ translateY: positionBottom.y }],
      position: "absolute",
      top: SCREEN_HEIGHT - 450,
    };
  };

  //data start
  const postManyRes = useQuery(POST_MANY);
  var activeIndex = 0;
  var [viewOn, setViewOn] = useState(false);
  const [postId, setPostId] =
    postManyRes.data !== undefined
      ? useState(postManyRes.data.postMany[0].id)
      : useState("");
  const [image, setImage] =
    postManyRes.data !== undefined
      ? useState({ uri: S3URL + postManyRes.data.postMany[0].Images[0].url })
      : useState("");

  const data = postManyRes.data !== undefined ? postManyRes.data.postMany : [];

  const postOneRes = useQuery(POST_ONE, { variables: { id: postId } });
  var userName = "";
  var subscriberNum = "";
  var title = "";
  var date = "";
  var likeNum = "";
  if (postOneRes.data !== undefined) {
    userName = postOneRes.data.postOne.userName;
    subscriberNum = postOneRes.data.postOne.subscriberCount;
    title = postOneRes.data.postOne.title;
    date = postOneRes.data.postOne.timeFromToday;
    likeNum = postOneRes.data.postOne.likes;
  }

  const _handleClickMain = () => {
    if (viewOn === true) {
      setViewOn(false);
      moveBack();
    } else if (viewOn === false) {
      console.log("post add");
    }
  };

  const _handleDoubleClickItem = (clickedIndex) => {
    if (clickedIndex === activeIndex) {
      moveDisappear();
      setViewOn(true);
    }
  };
  const _handleClickItem = async (postId, imageUrl, index) => {
    _handleDoubleClickItem(index);
    activeIndex = index;
    setPostId(postId);
    setImage(imageUrl);
  };
  return (
    <OutContainer>
      <Container>
        {viewOn === false ? (
          <ImageBack resizeMode={"cover"} source={image} />
        ) : (
          <NewVerticalScroll />
        )}
        <Animated.View style={getStyleTop()}>
          <BlurView
            style={{
              width: SCREEN_WIDTH,
              height: 90,
            }}
            intensity={250}
          >
            <ProfileContainer>
              <ProfileImg
                resizeMode={"contain"}
                source={require("../assets/images/profile_img.png")}
              />
              <ProfileVerticalContainer>
                <ProfileName>{userName}</ProfileName>
                <ProfileHorizontalContainer>
                  <Btn onPress={() => console.log("메세지")}>
                    <BtnText>메세지</BtnText>
                  </Btn>
                  <Btn onPress={() => console.log("구독+")}>
                    <BtnText>구독+</BtnText>
                  </Btn>
                  <ProfileNumSubscribers>
                    {subscriberNum}명
                  </ProfileNumSubscribers>
                </ProfileHorizontalContainer>
              </ProfileVerticalContainer>
            </ProfileContainer>
          </BlurView>

          <BlurView
            style={{
              width: SCREEN_WIDTH,
              height: 80,
            }}
            intensity={250}
          >
            <PostVerticalContainer>
              <PostTitle>{title}</PostTitle>
              <PostHorizontalContainer>
                <PostHorizontalContainer2>
                  <Btn onPress={() => console.log("좋아요")}>
                    <PostLike
                      resizeMode={"contain"}
                      source={require("../assets/images/btn_like.png")}
                    />
                    <BtnText>좋아요</BtnText>
                  </Btn>
                  <PostDate>{likeNum}명</PostDate>
                </PostHorizontalContainer2>
                <PostDate>{date}</PostDate>
              </PostHorizontalContainer>
            </PostVerticalContainer>
          </BlurView>
        </Animated.View>
      </Container>
      <Animated.View style={getStyleBottom()}>
        <Carousel
          data={data}
          handleClickItem={_handleClickItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={(SCREEN_WIDTH / 4) * 1.1}
        />
      </Animated.View>

      <BtnContainer>
        <BtnPost onPress={() => _handleClickMain()}>
          <BtnPostImg
            resizeMode={"contain"}
            source={
              viewOn === false
                ? require("../assets/images/btn_post.png")
                : require("../assets/images/btn_appear.png")
            }
          />
        </BtnPost>
      </BtnContainer>
    </OutContainer>
  );
};

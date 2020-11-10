import React from "react";
import styled from "styled-components";
import {SCREEN_WIDTH} from "../../config";
import AuthButton from "../../components/AuthButton";
import AuthButtonText from "../../components/AuthButtonText";
import { TouchableWithoutFeedback, Keyboard  } from "react-native";

const OutContainer = styled.View`
  flex: 1;
  paddingTop: ${Expo.Constants.statusBarHeight};
  background:${props => props.theme.WHITE}
`;

const InContainer1 = styled.View`
  margin-top: 45%;
  flex: 3;
  align-items: center;
`;
const InContainer2 = styled.View`
  flex: 5;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
`;

const LogoImg = styled.Image`
  width: ${SCREEN_WIDTH / 1.6};
  height: ${SCREEN_WIDTH / 1.6};
`;


export default ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <OutContainer>
          <InContainer1>
            <LogoImg
              resizeMode={"contain"}
              source={require("../../assets/images/splash.png")}
            />
          </InContainer1>
          <InContainer2>
            <AuthButton
              onPress={() => navigation.navigate("Login")}
              text="로그인"
            />
            <AuthButtonText
              onPress={() => navigation.navigate("Signup")}
              text="처음이신가요? 계정을 생성하세요"
            />
          </InContainer2>
        </OutContainer>
    </TouchableWithoutFeedback>
  );
};

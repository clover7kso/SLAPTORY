import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {SCREEN_WIDTH} from "../config";

const Touchable = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  margin:10px;
  width: ${SCREEN_WIDTH / 14};
  height: ${SCREEN_WIDTH / 14};
`;


const BackImg = styled.Image`  
  width: ${SCREEN_WIDTH / 16};
  height: ${SCREEN_WIDTH / 16};
`;

const Container = styled.View`
  align-items: center;
`;

const TopBarContainer = styled.View`
  padding-top: ${(Expo.Constants.statusBarHeight)+5};
  padding-bottom:5px
  background: ${props => props.theme.WHITE};
  flex-direction: row;
  width: ${SCREEN_WIDTH};
  align-items: center;
  justify-content: flex-start;
`;

const BackPressHeader = ({ navigation }) => {
  const goBackSafe = () => {
    // Traverse parent stack until we can go back
    let parent = navigation;
    while (
      parent.dangerouslyGetState()?.index === 0 &&
      parent.dangerouslyGetParent()
    ) {
      parent = parent.dangerouslyGetParent();
    }
    parent?.goBack();
  };
  return (
    <Container>
      <TopBarContainer>
        <Touchable onPress={goBackSafe}>
          <BackImg
            resizeMode={"contain"}
            source={require("../assets/images/navi_back.png")}
          />
        </Touchable>
      </TopBarContainer>
      
    </Container>
  );
};

BackPressHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BackPressHeader;

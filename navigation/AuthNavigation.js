import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";
import styled from "styled-components";
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

const Stack = createStackNavigator();

function AuthNavigation() {
  const headerOption = ({ navigation, route }) => ({
    headerRight: (props) => {
      <Touchable onPress={navigation.pop(1)}>
        <BackImg
          resizeMode={"contain"}
          source={require("../assets/images/navi_back.png")}
        />
      </Touchable>
    }
  })
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption}/>
        <Stack.Screen name="SignUp" component={SignUp} options={headerOption}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;

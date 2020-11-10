import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components";
import {SCREEN_WIDTH} from "../config";

import Home from "../screens/Home";
import Profile from "../screens/Profile/Profile";
import Rooms from "../screens/Room/Rooms";

const Touchable = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  width: ${SCREEN_WIDTH / 6};
  height: ${SCREEN_WIDTH / 6};
`;


const BackImg = styled.Image`  
  width: ${SCREEN_WIDTH / 8};
  height: ${SCREEN_WIDTH / 8};
`;

const TitleImg = styled.Image`
  width: ${SCREEN_WIDTH / 2.4};
`;

const Stack = createStackNavigator();

function MainNavigation() {
  const headerOption = ({ navigation, route }) => ({
    title: null,
    headerStyle: {
      backgroundColor: "#ffffff"
    },
    headerLeft: () => (
      <Touchable onPress={() => {navigation.navigate("Rooms")}}>
        <BackImg
          resizeMode={"contain"}
          source={require("../assets/images/btn_rooms.png")}/>
      </Touchable>
    ),
    headerRight: () => (
      <Touchable onPress={() => {navigation.navigate("Profile")}}>
        <BackImg
          resizeMode={"contain"}
          source={require("../assets/images/btn_profile.png")}/>
      </Touchable>
    ),
    headerTitle:()=>(
      <TitleImg
        resizeMode={"contain"}
        source={require("../assets/images/header_img.png")}/>
    )
  })

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen" screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Home" component={Home} options={headerOption} />
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

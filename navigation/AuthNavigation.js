import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator,  } from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";
import styled from "styled-components";
import {SCREEN_WIDTH} from "../config";
import useAlert from "../hooks/useAlert";
import CustomAlert from "../components/CustomAlert";


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
  const alert_1 = useAlert(false,"뒤로가기하려구요?","현재까지 내용은 저장되지 않습니다");
  const headerOption = ({ navigation, route }) => ({
    title: null,
    headerStyle: {
      backgroundColor: "#ffffff",
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <Touchable onPress={() => {
        if(route.name==="SignUp")
          alert_1.onChange(true)
        else
          navigation.goBack()
      }}>
        <BackImg
          resizeMode={"contain"}
          source={require("../assets/images/navi_back.png")}/>
          <CustomAlert alertValue = {alert_1} onConfirm={async()=>{
            await alert_1.onChange(false)
            navigation.goBack()
          }} onCancle={()=>{}}/>
      </Touchable>
    ),
  })
  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name="AuthHome" component={AuthHome} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption}/>
        <Stack.Screen name="SignUp" component={SignUp} options={headerOption}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default AuthNavigation;

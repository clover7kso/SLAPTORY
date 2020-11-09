import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AppAuthContext";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};

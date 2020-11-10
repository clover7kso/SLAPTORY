import React from "react";
import { View } from "react-native";
import { useIsSignedIn } from "../AppAuthContext";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

export default () => {
  const isSignedIn = useIsSignedIn();
  return (
    <View style={{ flex: 1 }}>
      {isSignedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};

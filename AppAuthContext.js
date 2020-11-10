import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const AppAuthContext = createContext();

export const AuthProvider = ({ isSignedIn: isSignedInProp, children }) => {
  const [isSignedIn, setIsSignedIn] = useState(isSignedInProp);
  const signUserIn = async (token) => {
    console.log(token);
    try {
      await AsyncStorage.setItem("isSignedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsSignedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const signUserOut = async () => {
    try {
      await AsyncStorage.setItem("isSignedIn", "false");
      await AsyncStorage.setItem("jwt", "");
      setIsSignedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppAuthContext.Provider value={{ isSignedIn, signUserIn, signUserOut }}>
      {children}
    </AppAuthContext.Provider>
  );
};

export const useIsSignedIn = () => {
  const { isSignedIn } = useContext(AppAuthContext);
  return isSignedIn;
};

export const useSignIn = () => {
  const { signUserIn } = useContext(AppAuthContext);
  return signUserIn;
};

export const useSignOut = () => {
  const { signUserOut } = useContext(AppAuthContext);
  return signUserOut;
};

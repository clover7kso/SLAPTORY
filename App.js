import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-community/async-storage'
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import styles from "./styles";
import NavController from "./navigation/NavController";
import { AuthProvider } from "./AppAuthContext";
import {SERVER_URL, WEB_SOCKET_URL} from "./config"
import {ApolloClient,HttpLink, split} from 'apollo-boost';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from 'apollo-link-context';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        'NanumB': require('./assets/fonts/NanumBarunGothic.ttf'),
        'NanumR': require('./assets/fonts/NanumSquareR.ttf'),
      });
      await Asset.loadAsync([require("./assets/images/logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const httpLink = new HttpLink({
        uri: SERVER_URL
      });
      
      const wsLink = new WebSocketLink({
        uri: WEB_SOCKET_URL,
        options: {
          reconnect: true
        }
      });
      const authLink = setContext(async (_, { headers }) => {
        const token = await AsyncStorage.getItem("jwt");
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });
      const link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
      );
      const client = new ApolloClient({
        link:authLink.concat(link),
        cache,
      });
      //client.resetStore();
      //client.cache.reset();
      const isSignedIn = await AsyncStorage.getItem("isSignedIn");
      if (!isSignedIn || isSignedIn === "false") {
        setIsSignedIn(false);
      } else {
        setIsSignedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isSignedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isSignedIn={isSignedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}

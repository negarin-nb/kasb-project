import { useState, useEffect, useCallback, useContext } from "react";
//import { useFonts } from "expo-font";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from './src/navigation/navigation';
import {AuthContext, AuthContextProvider} from "./src/store/auth-context";
import 'react-native-gesture-handler';
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";


//SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const getFonts = async () => {
    return Font.loadAsync({
      YekanBakhBold: require("./assets/fonts/YekanBakhBold.ttf"),
      YekanBakhMedium: require("./assets/fonts/YekanBakhMedium.ttf"),
      YekanBakhThin: require("./assets/fonts/YekanBakhThin.ttf"),
      IranYekanBold: require("./assets/fonts/IRANYekanBold.ttf"),
      IranYekanRegular: require("./assets/fonts/IRANYekanRegular.ttf"),
      IranYekanThin: require("./assets/fonts/IRANYekanThin.ttf"),
      IranYekanLight: require("./assets/fonts/IRANYekanLight.ttf"),
    });
  };

  /* let [fontsLoaded] = useFonts({
    YekanBakhBold: require("./assets/fonts/YekanBakhBold.ttf"),
    YekanBakhMedium: require("./assets/fonts/YekanBakhMedium.ttf"),
    YekanBakhThin: require("./assets/fonts/YekanBakhThin.ttf"),
    IranYekanBold: require("./assets/fonts/IRANYekanBold.ttf"),
    IranYekanRegular: require("./assets/fonts/IRANYekanRegular.ttf"),
    IranYekanThin: require("./assets/fonts/IRANYekanThin.ttf"),
    IranYekanLight: require("./assets/fonts/IRANYekanLight.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } */
  function Root() {
  //const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
        await loadToken();
        console.log("isAuthenticated:");
        console.log(authCtx.isAuthenticated);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      console.log("appIsReady");
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

    async function loadToken() {
      const storedToken = await AsyncStorage.getItem("Token");
      console.log(storedToken);
      if (storedToken) {
        const data = JSON.parse(storedToken);
        await authCtx.authenticate({
          authAccessToken: data.authAccessToken,
          authRefreshToken: data.authRefreshToken,
        });
      }
      //setIsTryingLogin(false);
    }
    /* if (isTryingLogin) {
    return <AppLoading />;
  }  */
    return <Navigation />;
  } 

  return (
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
  );
}

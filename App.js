import { useState, useEffect,useMemo, useReducer,useContext } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
//import { AppLoading } from "expo";
//import { AuthContext } from './src/services/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from './src/navigation/navigation';
import {AuthContext, AuthContextProvider} from "./src/store/auth-context";
import 'react-native-gesture-handler';


export default function App() {

  let [fontsLoaded] = useFonts({
    YekanBakhBold: require("./assets/fonts/YekanBakhBold.ttf"),
    YekanBakhMedium: require("./assets/fonts/YekanBakhMedium.ttf"),
    YekanBakhThin: require("./assets/fonts/YekanBakhThin.ttf"),
    IranYekanRegular: require("./assets/fonts/IRANYekanRegular.ttf"),
    IranYekanBold: require("./assets/fonts/IRANYekanBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect( () => {
    loadToken();
  }, []);

  async function loadToken() {
      const storedToken = await AsyncStorage.getItem("Token");
      console.log(storedToken);
      if (storedToken) {
        const data = JSON.parse(storedToken);
          authCtx.authenticate({
            authAccessToken: data.authAccessToken,
            authRefreshToken: data.authRefreshToken,
          });
      }
      setIsTryingLogin(false);
    }
  
  
  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

  return (
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
  );
}

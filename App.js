import { useState, useEffect,useMemo, useReducer,useContext } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
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

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

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

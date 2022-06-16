import React , {useContext} from "react";
import AuthStack from "./authStack";
import AppDrawer from "./appDrawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import BottomTabNavigator from "./bottomTabNavigator";

export default function Navigation() {
  const authCtx = useContext(AuthContext);

  return (

  <NavigationContainer>
      {/*!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AppDrawer />*/}
      {authCtx.isAuthenticated ? <AppDrawer /> : <AuthStack />}
  </NavigationContainer>
  );
}

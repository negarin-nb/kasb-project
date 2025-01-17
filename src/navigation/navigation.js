import React , {useContext} from "react";
import AuthStack from "./authStack";
import AppDrawer from "./appDrawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import BottomTabNavigator from "./bottomTabNavigator";


const linking = {
  /* prefixes: [
    ["https://kasb-co.com"],
  ], */
  config: {
    /* configuration for matching screens with paths */
    screens: {
      Onboarding: "onboarding",
      Login: "login",
      HomeS: {
        screens: {
          Home: "home",
          AccountingManageScreen: "accounting",
          InventoryManageScreen: "inventory",
          OrderSubmitScreen: "order-submit",
        },
      },
      Notification: "notification",
      Support: "support",
      More: "more",
    },
  },
};

export default function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer linking={linking}>
     {/*  <BottomTabNavigator /> */}

      {authCtx.isAuthenticated ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

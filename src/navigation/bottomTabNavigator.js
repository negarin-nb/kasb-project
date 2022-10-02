import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationScreen from "../screens/profileScreens/notificationScreen";
import SupportScreen from "../screens/profileScreens/supportScreen";
import MoreScreen from "../screens/profileScreens/moreScreen";
import { Image, View ,Text} from "react-native";
import HomeScreenStack from './stacks/homeScreenStack'
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor:"#63D98A",
        tabBarInactiveTintColor:'#fff',
        tabBarLabelStyle: {fontSize: 14, fontFamily:"YekanBakhMedium"},
        tabBarStyle: {
          position: "absolute",
          paddingBottom: 15,
          paddingTop: 7,
          height:70,
          left: 20,
          right: 20,
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          backgroundColor: "#24438E",
        },
      }}
    >

<Tab.Screen
          name="HomeS"
          component={HomeScreenStack}
          options={{
            tabBarLabel: 'خانه', 
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  style={{ width: 23, height: 23 }}
                  source={require("../../assets/icons/home.png")}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen name="Notification" component={NotificationScreen} options={{
        tabBarLabel: 'اعلان‌ها', 
        tabBarIcon: () => (
          <View>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/icons/notif.png")}
              />
            </View>
          ),
        }} />
  
      <Tab.Screen name="Support" component={SupportScreen} options={{
        tabBarLabel: 'پشتیبانی', 
        tabBarIcon: () => (
          <View>
              <Image
                style={{ width: 23, height: 23 }}
                source={require("../../assets/icons/support.png")} 
              />
            </View>
          ),
        }} />

        <Tab.Screen name="More" component={MoreScreen} options={{
        
        tabBarLabel: 'جستجو', 
        tabBarIcon: () => (
          <View>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/icons/search.png")}
              />
            </View>
          ),
        }} />
    
    </Tab.Navigator>
  );
}

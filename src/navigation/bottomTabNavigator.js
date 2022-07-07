import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/profileScreens/homeScreen";
import NotificationScreen from "../screens/profileScreens/notificationScreen";
import SupportScreen from "../screens/profileScreens/supportScreen";
import MoreScreen from "../screens/profileScreens/moreScreen";
import { Image, View ,Text} from "react-native";
import { color } from "react-native-reanimated";
import HomeScreenStack from './stacks/homeScreenStack'
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarActiveTintColor:"#63D98A",
        tabBarInactiveTintColor:'#fff',
        tabBarLabelStyle: {fontSize: 14, fontFamily:"YekanBakhMedium"},
        tabBarStyle: {
          position: "absolute",
          paddingBottom: 5,
          paddingTop: 7,
          height: 60,
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
        
        tabBarLabel: 'بیشتر', 
        tabBarIcon: () => (
          <View>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/icons/more.png")}
              />
            </View>
          ),
        }} />
    
    </Tab.Navigator>
  );
}

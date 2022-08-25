import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import getCurrentDate from "../../util/getCurrentDate";
import authApi from "../../api/auth.js";
import { AuthContext } from "../../store/auth-context";


export default function HeaderScreen({navigation}) {
  const [userLoadFaild, setUserLoadFailed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [userName, setUserName] = useState(" ");
  const [shopName, setShopName] = useState("فروشگاه ");
  const [userProfile, setUserProfile] = useState({});
  const authCtx = React.useContext(AuthContext);
  const { height } = useWindowDimensions();

  const onImageNotFound = () => {
    setImageError(true);
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
    loadUserInfo();
  }, [userName]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
    setCurrentDate(getCurrentDate());
    loadUserInfo();
    });

    return unsubscribe;
  }, []);

  /* useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  ); */



  async function fetchUser() {
    console.log("api get user called");
    const user = await authApi.getProfile(authCtx.accessToken);
    if (!user.ok) console.log("fetchUser faild");
    console.log("fetchUser succeed");
    authCtx.setUserData(user.data.Item);
    setUserName(user.data.Item.first_name);
    setShopName(user.data.Item.shop_name);
  }
  const loadUserInfo = async () => {
      let user =  await authCtx.getUser();
      console.log("loadUserInfo " + JSON.stringify(user));
      if (!user){
        fetchUser();
      }
      else{
      console.log(user.first_name);
      setUserName(user.first_name);
      setShopName(user.shop_name);
      }
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />

      <View style={{ flexDirection: "row", marginTop: height * 0.04 }}>
        <Text style={[styles.topBarText, { textAlign: "left" }]}>
          {currentDate}
        </Text>
        <Text style={styles.topBarText}>سلام {userName}</Text>
      </View>

      {/*title and avatar*/}
      {/*const scrollBorder = {window.scrollY >= 40 ? "#63D98A" :"#fff"};*/}
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingBottom: 8,
          //borderBottomWidth: 1,
          borderBottomColor: "#63D98A",
        }}
      >
        {/*avatar*/}
        <TouchableOpacity onPress = {() => navigation.navigate("EditProfileScreen")}>
        <Image
          style={styles.avatar}
          source={
            imageError
              ? require("../../../assets/images/profile.png")
              : {
                  uri: "https://rganicthemes.com/demo/profile/files/2018/05/profile-pic.jpg",
                }
          }
          onError={() => onImageNotFound()}
        />
        </TouchableOpacity>

        <Text style={styles.titleText}>{shopName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 5,
  },
  topBarText: {
    flex: 1,
    fontFamily: "IranYekanBold",
    textAlign: "right",
    color: "#8E8E93",
    fontSize: 12,
  },
  avatar: {
    resizeMode: "cover",
    height: 41,
    width: 41,
    alignSelf: "center",
    borderRadius: 100,
    //marginBottom: 50,
  },

  titleText: {
    flex: 1,
    fontFamily: "YekanBakhBold",
    textAlign: "right",
    color: "#24438E",
    fontSize: 26,
  },
});

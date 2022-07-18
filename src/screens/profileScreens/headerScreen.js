import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import getCurrentDate from "../../util/getCurrentDate";

export default function HeaderScreen() {
  
  const [imageError, setImageError] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [shopName, setShopName] = useState("فروشگاه سفال‌های مریم");
  const [userName, setUserName] = useState("مریم");

  const onImageNotFound = () => {
    setImageError(true);
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);


  return (
    <View style={styles.container}>
     <StatusBar barStyle={"dark-content"} />

      <View style={{ flexDirection: "row", marginTop: 30 }}>
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
        <Image
          style={styles.avatar}
          source={
            imageError
              ? require("../../../assets/images/profile.png")
              : {
                  uri: "https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg",
                }
          }
          onError={() => onImageNotFound()}
        />

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

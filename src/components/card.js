import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  LayoutAnimation,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({children, title, imageSource}) {
  const [isExpand, setIsExpand] = useState(false);
  const { width } = useWindowDimensions();

  const handleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpand(!isExpand);
  };

  return (
    <View style={styles.container}>
     
      <LinearGradient
        colors={["#63D98A", "#24438E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.btn, { width: width - 40 }]}
      >
        <TouchableOpacity style={{ height: "auto" }} onPress={handleExpand}>
          <ImageBackground
            style={{
              //flex:1,
              flexDirection: "row",
             // minHeight: 70,
              justifyContent: "flex-end",
              //padding: 20,
              paddingHorizontal:20,
              paddingVertical:30
            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 20 }}
            source={isExpand
                    ? require("../../assets/images/transparentImage.png") 
                    :imageSource}
          >
            <View style={{ alignItems: "right", justifyContent: "top" }}>
              <Text style={styles.btnTitle}>{title}</Text>
            </View>
            <View
              style={{
                alignItems: "right",
                justifyContent: "top",
                paddingTop: 10,
              }}
            >
              <Image
                style={{ width: 15, height: 11 }}
                source={
                  isExpand
                    ? require("../../assets/icons/chevrontop.png")
                    : require("../../assets/icons/chevronbottom.png")
                }
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View>
          {isExpand ? (
            children()
          ) : null}
        </View>
      </LinearGradient>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  btn: {
    //flex: 1,
    marginBottom: 10,
    borderRadius: 20,
    // minHeight: 70,
    //justifyContent: "center",
    // alignItems: "center",
  },
  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    paddingEnd: 10,
    //paddingTop: 20,
  },
});

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
export default function BusinessBtn({ imageSource, btnTitle, navigation , onPressComponent}) {
  return (
    <ImageBackground
      style={{
        marginTop: 8,
        justifyContent: "center",
      }}
      resizeMode="cover"
      imageStyle={{ borderRadius: 20 }}
      source={imageSource}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", paddingEnd: 20, height: 92 }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.btnTitle}>{btnTitle}</Text>
        </View>
        <View style={{ alignItems: "right", justifyContent: "center" }}>
          <Image
            style={{ width: 11, height: 15.5 }}
            source={require("../../assets/icons/chevronright.png")}
          />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    paddingEnd: 10,
  },
});

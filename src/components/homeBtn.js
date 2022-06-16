import React from "react";
import { Image, Text, TouchableOpacity,StyleSheet } from "react-native";

export default function HomeBtn({ text, imgSource, width,onPressComponent, navigation }) {
  return (
    <TouchableOpacity
      style={[styles.button, { width: width / 2, marginEnd: 5 }]}
      onPress={() => navigation.navigate(onPressComponent)}
    >
      <Text style={styles.buttonText}>{text}</Text>
      <Image style={{ width: 24, height: 24 }} source={imgSource} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
button: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'flex-end',
    backgroundColor: "#24438E",
    height: "auto",
    borderRadius: 15,
    padding: 14,
    paddingEnd: 25,
    marginEnd: 4,
    marginStart:4
  },

  buttonText: {
    fontFamily: "YekanBakhMedium",
    textAlign: "right",
    color: "#fff",
    fontSize: 20,
    marginEnd: 10,
  }});

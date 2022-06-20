import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ContactBtn({ btnTitle, navigation , onPressComponent}) {
        const { width } = useWindowDimensions();

  return (
    <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { width: width - 40 }]}
        >
      <TouchableOpacity
        style={{ flexDirection: "row", height: 92 }}
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
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
    
    btn: {
    marginTop: 10,
    borderRadius: 20,
    height: 104,
    justifyContent: "center",
    //alignItems: "center",
    paddingEnd: 20,
    paddingStart: 20,
  },
  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    paddingEnd: 10,
  },
});

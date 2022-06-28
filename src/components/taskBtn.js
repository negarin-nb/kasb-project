import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function TaskBtn({ btnTitle, onPressComponent }) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#63D98A", "#24438E"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={[styles.btn, { width: width - 40 }]}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", paddingEnd: 10, height: 92 }}
        onPress={() => navigation.navigate(onPressComponent)}
      >
        <View style={{ justifyContent: "center" }}>
          <Image
            style={{ width: 11, height: 15.5 }}
            source={require("../../assets/icons/leftchevron.png")}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.btnTitle}>{btnTitle}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  btn: {
    marginBottom: 10,
    borderRadius: 20,
    height: 86,
    justifyContent: "center",
    paddingStart: 20,
  },

  btnTitle: {
    color: "#fff",
    textAlign: "right",
    fontSize: 20,
    fontFamily: "YekanBakhMedium",
    paddingEnd: 10,
  },
});

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BottomSheetButtons() {
     const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 75,
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonSheet, { width: width / 8 }]}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/bill.png")}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.buttonSheetText}>به زودی</Text>
      </View>

      <View style={{ flexDirection: "column" }}>
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonSheet, { width: width / 8 }]}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/basket.png")}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.buttonSheetText}>به زودی</Text>
      </View>

      <View style={{ flexDirection: "column" }}>
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonSheet, { width: width / 8 }]}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/shop.png")}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.buttonSheetText}>به زودی</Text>
      </View>

      <View style={{ flexDirection: "column" }}>
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonSheet, { width: width / 8 }]}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/calendar.png")}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.buttonSheetText}>به زودی</Text>
      </View>

      <View style={{ flexDirection: "column" }}>
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonSheet, { width: width / 8 }]}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/add.png")}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.buttonSheetText}>به زودی</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonSheet: {
    justifyContent: "space-evenly",
    alignContent: "center",
    height: 50,
    marginTop: 8,
    borderRadius: 200,
    marginEnd: 11,
    marginStart: 11,
    opacity: 0.5,
  },

  buttonSheetText: {
    fontFamily: "YekanBakhBold",
    textAlign: "center",
    color: "#24438E",
    fontSize: 11,
    marginTop: 5,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import { LinearGradient } from "expo-linear-gradient";
import CashExpand from "../../components/cashExpand";

export default function FinancialScreen2({ navigation }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View>
        {/*Top Bar*/}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.TopBar, { width: width - 40 }]}
        >
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 24, height: 24, marginStart: 20, marginTop: 2 }}
                source={require("../../../assets/icons/mathcalculation.png")}
              />
            </View>
            <Text style={styles.TopBarTitle}>مدیریت مالی</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <CashExpand />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingEnd: 20,
    paddingStart: 20,
    //marginTop:5
  },
  TopBar: {
    borderRadius: 20,
    height: 43,
    paddingEnd: 20,
    marginTop: 10,
  },
  TopBarTitle: {
    fontFamily: "YekanBakhMedium",
    textAlign: "right",
    color: "#fff",
    fontSize: 18,
  },
});

import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import CashExpand from "../../components/cashExpand";
import TopBar from "../../components/topBar";

export default function FinancialScreen2({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/mathcalculation.png")}
          title="مدیریت مالی"
        />
      </View>
      {/*cash list detail*/}
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
  }
});

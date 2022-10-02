import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import TaskBtn from "../../components/taskBtn";

export default function InvoiceScreen({navigation}) {
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <TopBar
        iconSourc={require("../../../assets/icons/invoice2w.png")}
        title="صدور فاکتور"
      />

      {/* <TaskBtn
        btnTitle={"صدور پیش‌فاکتور"}
        navigation={navigation}
        onPressComponent="InvoiceCreatScreen"
      /> */}

      <TaskBtn
        btnTitle={"لیست پیش‌فاکتورها"}
        navigation={navigation}
        onPressComponent="InvoiceListScreen"
      />
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
  },
});

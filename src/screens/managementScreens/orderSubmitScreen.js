import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import OrderEntry from "../../components/orderEntry";

export default function OrderSubmitScreen() {
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/shop.png")}
          title="مدیریت سفارش‌ها"
        />
        <Card title={"ثبت سفارش"} children={() => <OrderEntry />} />
        <Card title={"لیست سفارش"} children={() => <OrderList />} />
      </View>
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

import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../orderDetail.js/topBar";
import CardExpand from "../../orderDetail.js/cardExpand";
import OrderList from "../../orderDetail.js/orderList";

export default function OrderListScreen() {
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <TopBar
        iconSourc={require("../../../assets/icons/shop.png")}
        title="مدیریت سفارش‌ها"
      />
      <CardExpand title={"جزئیات سفارش"} children={() => <OrderList />} />
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

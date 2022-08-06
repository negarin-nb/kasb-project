import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../orderDetail.js/topBar";
import OrderEntry from "../../orderDetail.js/orderEntry";
import CardExpand from '../../orderDetail.js/cardExpand';



export default function OrderSubmitScreen() {
  
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <TopBar
        iconSourc={require("../../../assets/icons/shop.png")}
        title="مدیریت سفارش‌ها"
      />
      <CardExpand title={"ثبت سفارش"} children={() => <OrderEntry />} />
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

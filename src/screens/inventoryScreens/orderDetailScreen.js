import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import OrderEntry from "../../components/inventory/orderEntry";


export default function OrderDetailScreen({route, navigation}) {
  console.log("orderDetailScreen");
  console.log(route.params.order_items);
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <TopBar
        iconSourc={require("../../../assets/icons/shop.png")}
        title="مدیریت سفارش‌ها"
      />
      <Card
        title={"جزئیات سفارش"}
        children={() => <OrderEntry prevOrder={route.params} />}
        expanded={true}
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

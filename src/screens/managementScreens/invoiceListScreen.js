import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import OrderList from "../../components/orderList";

export default function OrderListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <TopBar
        iconSourc={require("../../../assets/icons/bill.png")}
        title="مشاهده پیش‌فاکتورها"
      />
      <Card
        title={"لیست پیش‌فاکتورها"}
        children={() => <OrderList navigation={navigation} />}
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

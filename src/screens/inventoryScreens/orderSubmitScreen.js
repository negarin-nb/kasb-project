import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import OrderEntry from "../../components/inventory/orderEntry";
import Card from "../../components/card";

export default function OrderSubmitScreen({navigation}) {
  
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <TopBar
        iconSourc={require("../../../assets/icons/shop.png")}
        title="مدیریت سفارش‌ها"
      />
      <Card
        title={"ثبت سفارش"}
        children={() => <OrderEntry prevOrder={{}} />}
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

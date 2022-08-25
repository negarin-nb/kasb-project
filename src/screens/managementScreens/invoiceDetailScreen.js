import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import OrderEntry from "../../components/orderEntry";

export default function InvoiceDetailScreen({ route }) {
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <TopBar
        iconSourc={require("../../../assets/icons/invoice2w.png")}
        title="مشاهده پیش‌فاکتورها"
      />
      <Card
        title={"لیست پیش‌فاکتورها"}
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

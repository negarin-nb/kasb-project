import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import StorageEntry from "../../components/storageEntry";
import Card from "../../components/card";

export default function StorageSubmitScreen({ navigation }) {
  const nullItem = {
    name: "",
    category:'',
    barcode: "",
    count: "",
    purchase_price:'' ,
    suggested_selling_price: '',
    expiration_date: "",
    registration_date:"",
    inventory_warning_interval: "",
    expiration_warning_interval: "",
    labels: [{ name: "" }],
  };
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <TopBar
        iconSourc={require("../../../assets/icons/box.png")}
        title="انبار"
      />
      <Card
        title={"ثبت کالا"}
        children={() => <StorageEntry prevItem={nullItem} />}
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

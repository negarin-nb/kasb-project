import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import TopBar from "../../components/topBar";
import HeaderScreen from "../profileScreens/headerScreen";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/card";
import StorageEntry from "../../components/storageEntry";
import StorageList from "../../components/storageList";

export default function StorageScreen({ navigation }) {

  const nullItem = {
    name: "",
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
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/box.png")}
          title="انبار"
        />
        {/* <Card
          title={"ثبت کالا"}
          children={() => <StorageEntry prevItem={nullItem} />}
          expanded={false}
        /> */}
        <Card
          title={"مشاهده انبار"}
          children={() => <StorageList />}
          expanded={true}
        />
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

  btn: {
    marginTop: 10,
    borderRadius: 20,
    height: 92,
    justifyContent: "center",
    // alignItems: "center",
    //paddingEnd: 20,
    //paddingStart: 20,
  },
  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    paddingEnd: 10,
  },
});

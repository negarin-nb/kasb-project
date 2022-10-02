import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import ContactBtn from '../../components/contactBtn';

export default function CustomerContactScreen({navigation}) {
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/shop.png")}
          title="مدیریت ارتباط با مشتری"
        />
        <ContactBtn
          btnTitle={"مشتریان"}
          onPressComponent=""
          navigation={navigation}
        />
        <ContactBtn
          btnTitle={"تأمین‌کنندگان"}
          onPressComponent=""
          navigation={navigation}
        />
        <ContactBtn
          btnTitle={"همکاران"}
          onPressComponent=""
          navigation={navigation}
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
  },})

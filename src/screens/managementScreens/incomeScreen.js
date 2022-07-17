import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import IncomeEntry from "../../components/incomeEntry";
import IncomeList from "../../components/incomeList";
export default function IncomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/withdrawal.png")}
          title="مدیریت درآمدها"
        />
        <Card title={"ثبت درآمد"} children={() => <IncomeEntry />} />
        <Card title={"لیست درآمد"} children={() => <IncomeList />} />
        <Card title={"گزارش درآمدها"} children={() => <AddProductForm />} />
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
})

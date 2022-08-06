import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import IncomeEntry from "../../components/incomeEntry";
import IncomeList from "../../components/incomeList";
import AppPieChart from "../../components/appPieChart";

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
        <Card
          title={"ثبت درآمد"}
          children={() => <IncomeEntry />}
          expanded={false}
        />
        <Card
          title={"لیست درآمد"}
          children={() => <IncomeList />}
          expanded={false}
        />
        <Card
          title={"گزارش درآمدها"}
          children={() => <AppPieChart />}
          expanded={false}
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
    paddingBottom:70,
  },
});

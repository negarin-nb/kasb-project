import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import Card from "../../components/card";
import IncomeEntry from "../../components/accounting/incomeEntry";
import IncomeList from "../../components/accounting/incomeList";
import AppPieChart from "../../components/accounting/appPieChart";

export default function IncomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
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

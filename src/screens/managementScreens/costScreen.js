import React from 'react';
import { View, StyleSheet } from "react-native";
import HeaderScreen from '../profileScreens/headerScreen';
import TopBar from '../../components/topBar';
import Card from "../../components/card";
import CostEntry from "../../components/costEntry";
import CostList from "../../components/costList";
import AppPieChart from '../../components/appPieChart';


export default function CostScreen() {
  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/deposite.png")}
          title="مدیریت هزینه‌ها"
        />
        <Card title={"ثبت هزینه"} children={() => <CostEntry />} />
        <Card title={"لیست هزینه"} children={() => <CostList />} />
        <Card title={"گزارش هزینه‌ها"} children={() => <AppPieChart />} />
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
});


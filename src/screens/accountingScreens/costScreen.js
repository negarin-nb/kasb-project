import React from 'react';
import { View, StyleSheet } from "react-native";
import HeaderScreen from '../profileScreens/headerScreen';
import TopBar from '../../components/topBar';
import Card from "../../components/card";
import CostEntry from "../../components/accounting/costEntry";
import CostList from "../../components/accounting/costList";
import AppPieChart from '../../components/accounting/appPieChart';


export default function CostScreen({ navigation }) {

  const emptyData = {
      title: "",
      category: "",
      amount: "",
      reminder_interval: "",
      registration_date: "",
    };
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/deposite.png")}
          title="مدیریت هزینه‌ها"
        />
        <Card
          title={"ثبت هزینه"}
          children={() => <CostEntry updateItem={emptyData} />}
          expanded={false}
        />
        <Card
          title={"لیست هزینه"}
          children={() => <CostList />}
          expanded={false}
        />
        <Card
          title={"گزارش هزینه‌ها"}
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
    alignItems: "center",
    backgroundColor: "#fff",
    paddingEnd: 20,
    paddingStart: 20,
  },
});


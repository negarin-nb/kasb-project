import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import CashListItem from "./cashListItem";
import { getIncomes } from "../../model/incomes";
import { getCosts } from "../../model/costs";
import IncomeList from './incomeList';
import CostList from "./costList";
import CurrencyFormat from '../currencyFormat';
import { AuthContext } from '../../store/auth-context';

export default function CashList() {
  const authCtx = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [cash, setCash] = useState();
  const [incomeDetail,setIncomesDetail] = useState();
  const [costDetail, setCostDetail] = useState();+

useEffect(() => {
  getCashData();
}, []);
const getCashData = async () => {
    const cashData = await authCtx.getUserCash();
    setCash(cashData);
  }
 

  return (
    <View>
      <LinearGradient
        colors={["#63D98A", "#24438E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cashWrapper, { width: width - 40 }]}
      >
        <Text style={[styles.cashWrapperTitle]}>صندوق </Text>
        <TouchableOpacity>
          <CurrencyFormat amount={cash} customeStyle={styles.cashWrapperText} />
        </TouchableOpacity>

        {/*first white area */}
        <View style={[styles.whiteArea, { width: width - 70 }]}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../../assets/icons/withdrawal.png")}
            />
            <Text style={styles.whiteAreaTitle}>دریافت</Text>
          </View>

          <IncomeList />

          {/* <FlatList
            data={incomeDetail}
            renderItem={({ item }) => <CashListItem item={item} />}
            style={{ width: width - 90 }}
          /> */}
        </View>
        {/*second white area */}
        <View style={[styles.whiteArea, { width: width - 70 }]}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 24, height: 24, marginStart: 0 }}
              source={require("../../../assets/icons/deposite.png")}
            />
            <Text style={styles.whiteAreaTitle}>پرداخت</Text>
          </View>

          <CostList />

          {/* <FlatList
            data={costDetail}
            renderItem={({ item }) => <CashListItem item={item} />}
            style={{ width: width - 90 }}
          /> */}
        </View>
      </LinearGradient>
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
    //marginTop:5
  },
  cashWrapperTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 20,
    fontFamily: "YekanBakhMedium",
  },
  cashWrapperText: {
    color: "#fff",
    textAlign: "left",
    fontSize: 25,
    fontFamily: "IranYekanBold",
    marginLeft: 5,
    marginTop: -10,
  },
  cashWrapper: {
    borderRadius: 20,
    height: "auto",
    //justifyContent: "center",
    //alignItems: "center",
    padding: 15,
    paddingTop: 10,
  },
  whiteArea: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    height: 180,
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF41",
  },
  whiteAreaTitle: {
    flex: 1,
    textAlign: "right",
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    fontSize: 18,
    marginBottom:5
  },
});

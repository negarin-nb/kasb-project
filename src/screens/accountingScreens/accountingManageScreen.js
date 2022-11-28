import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "../../components/topBar";
import accountingApi from "../../api/accounting";
import { AuthContext } from "../../store/auth-context";
import { NumericFormat } from 'react-number-format';
import CurrencyFormat from '../../components/currencyFormat';

export default function AccountingManageScreen({ navigation }) {
  
  const authCtx = useContext(AuthContext);
  const { width } = useWindowDimensions();
  
  const [income, setIncome] = useState(0);
  const [cost, setCost] = useState(0);
  const [cash, setCash] = useState();
  const [netProfit, setNetProfit] = useState(0);

  useEffect(() => {
      fetchAccountingReport();
      getCashData();
  }, []);

  const getCashData = async () => {
    const cashData = await authCtx.getUserCash();
    setCash(cashData);
  }
 
  const fetchAccountingReport = async () => {
    const result = await accountingApi.getTotalReport(authCtx.accessToken);
    if (!result.ok) alert("خطایی در بازیابی گزارش‌ها پیش آمده!");
    else {
      const arr = Object.values(result.data.Item);
      console.log(arr);
      setIncome(arr[0]);
      setCost(arr[1]);
      setNetProfit(arr[2]);
    }
    console.log(result.data.Message);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/mathcalculation.png")}
          title="مدیریت کسب"
        />

        {/*income button */}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { width: width - 40 }]}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", marginTop: 10 }}
            onPress={() => navigation.navigate("IncomeScreen")}
          >
            <View
              style={{ justifyContent: "center", marginEnd: 20, marginTop: -5 }}
            >
              <Image
                style={{ width: 11, height: 15.5 }}
                source={require("../../../assets/icons/leftchevron.png")}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={{ width: 27, height: 27, marginTop: -10 }}
                source={require("../../../assets/icons/withdrawal.png")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.btnTitle}>درآمدها</Text>
              <CurrencyFormat amount={income} customeStyle={styles.btnText} />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/*cost button */}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { width: width - 40 }]}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", marginTop: 10 }}
            onPress={() => navigation.navigate("CostScreen")}
          >
            <View
              style={{ justifyContent: "center", marginEnd: 20, marginTop: -5 }}
            >
              <Image
                style={{ width: 11, height: 15.5 }}
                source={require("../../../assets/icons/leftchevron.png")}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={{ width: 27, height: 27, marginTop: -10 }}
                source={require("../../../assets/icons/deposite.png")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.btnTitle}>هزینه‌ها</Text>
              <CurrencyFormat amount={cost} customeStyle={styles.btnText} />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/*cash button */}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { width: width - 40 }]}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", marginTop: 10 }}
            onPress={() => navigation.navigate("CashScreen")}
          >
            <View
              style={{ justifyContent: "center", marginEnd: 20, marginTop: -5 }}
            >
              <Image
                style={{ width: 11, height: 15.5 }}
                source={require("../../../assets/icons/leftchevron.png")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.btnTitle}>صندوق</Text>
              <CurrencyFormat amount={cash} customeStyle={styles.btnText} />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/*net profit*/}
      <View style={{ alignSelf: "flex-end" }}>
        <Text style={styles.profitTitle}>سود خالص</Text>
      </View>
      <View style={[styles.profit, { width: width - 40 }]}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Image
              style={{ width: 24, height: 24, marginStart: 20 }}
              source={require("../../../assets/icons/invoice.png")}
            />
          </View>
          <Text style={styles.profitText}>{" تومان"}</Text>
          <NumericFormat
            value={netProfit}
            displayType="text"
            thousandSeparator=","
            decimalSeparator="/"
            renderText={(value) => (
              <Text style={styles.profitText}>{value}</Text>
            )}
          />
        </TouchableOpacity>
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
    marginBottom: 10,
    borderRadius: 20,
    height: 104,
    justifyContent: "center",
    paddingEnd: 20,
    paddingStart: 20,
  },

  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
  },
  btnText: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 20,
    fontFamily: "IranYekanBold",
  },
  profit: {
    // alignItems: "flex-end",
    backgroundColor: "#24438E",
    borderRadius: 20,
    height: 43,
    paddingEnd: 20,
    marginTop: 10,
    paddingTop: 5,
    marginBottom: 90,
  },

  profitTitle: {
    color: "#24438E",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhMedium",
    paddingEnd: 20,
  },

  profitText: {
    color: "#fff",
    //textAlign: "right",
    fontSize: 18,
    fontFamily: "IranYekanBold",
    alignSelf: "flex-end",
  },
});

import React, { useState } from "react";
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

export default function BusinessScreen({ navigation }) {
  [income, setIncome] = useState(2780000);
  [cost, setCost] = useState(650000);
  [cash, setCash] = useState(4750000);
  [netProfit, setNetProfit] = useState(2130000);

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <HeaderScreen />
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
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
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
              <Text style={styles.btnText}>{income.toString()} تومان</Text>
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
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
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
              <Text style={styles.btnText}>{cost.toString()} تومان</Text>
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
            onPress={() => navigation.navigate("CashListScreen")}
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
              <Text style={styles.btnText}>{cash.toString()} تومان</Text>
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

          <Text style={styles.profitText}>{netProfit.toString()} تومان</Text>
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
    fontSize: 24,
    fontFamily: "YekanBakhBold",
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
    textAlign: "right",
    fontSize: 24,
    fontFamily: "YekanBakhBold",
  },
});

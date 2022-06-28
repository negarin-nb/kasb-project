import React, {useState} from "react";
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
import Incomes from "../model/incomes";
import Payments from "../model/payments";


export default function CashList() {
  const { width } = useWindowDimensions();
  const [incomesDetail,setIncomesDetail] = useState(Incomes);
  const [paymentsDetail,setPaymentsDetail] = useState(Payments);
  return (
    <View>
      <LinearGradient
        colors={["#63D98A", "#24438E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cashWrapper, { width: width - 40 }]}
      >
        <Text style={[styles.cashWrapperTitle, { marginBottom: 20 }]}>
          صندوق{" "}
        </Text>
        <TouchableOpacity>
          <Text style={styles.cashWrapperText}>4750000 تومان </Text>
        </TouchableOpacity>
        {/*first white area */}
        <View style={[styles.whiteArea, { width: width - 70 }]}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              justifyContent: "flex-end",
            }}
          >
            <Image
              style={{ width: 24, height: 24, marginStart:5 }}
              source={require("../../assets/icons/withdrawal.png")}
            />
            <Text style={styles.whiteAreaTitle}>دریافت</Text>
          </View>

          <FlatList
            data={incomesDetail}
            renderItem={({ item }) => <CashListItem item={item} />}
            style={{ width: width - 90 }}
          />
        </View>
        {/*second white area */}
        <View style={[styles.whiteArea, { width: width - 70, marginTop:10 }]}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              justifyContent: "flex-end",
            }}
          >
            <Image
              style={{ width: 24, height: 24, marginStart:5 }}
              source={require("../../assets/icons/deposite.png")}
            />
            <Text style={styles.whiteAreaTitle}>پرداخت</Text>
          </View>

          <FlatList
            data={paymentsDetail}
            renderItem={({ item }) => <CashListItem item={item} />}
            style={{ width: width - 90 }}
          />
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
    fontSize: 34,
    fontFamily: "YekanBakhBold",
    marginLeft: 5,
    marginTop: -20,
  },
  cashWrapper: {
    marginTop: 10,
    borderRadius: 20,
    height: "auto",
    //justifyContent: "center",
    //alignItems: "center",
    padding: 15,
    paddingTop: 10,
  },
  whiteArea: {
    padding: 10,
    borderRadius: 20,
    height: 180,
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
  },
  whiteAreaTitle: {
    flex: 1,
    textAlign: "right",
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    fontSize: 18,
  },
});

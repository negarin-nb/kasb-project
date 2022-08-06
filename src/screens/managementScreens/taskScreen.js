import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import TaskBtn from "../../components/taskBtn";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../../components/topBar";

export default function TaskScreen(navigation) {
  return (
    <View style={styles.container}>
      <HeaderScreen />

      {/*Top Bar*/}
      <View style={{ flex: 1 }}>
        <TopBar
          iconSourc={require("../../../assets/icons/shop.png")}
          title="مدیریت کار"
        />

        {/*storage button*/}
        <ScrollView>
          <TaskBtn
            btnTitle={"مدیریت ارتباط با مشتری"}
            navigation={navigation}
            onPressComponent="CustomerContactScreen"
          />
          <TaskBtn
            btnTitle={"ثبت سفارش"}
            onPressComponent="OrderSubmitScreen"
            navigation={navigation}
          />
          <TaskBtn
            btnTitle={"صدور فاکتور"}
            onPressComponent="InvoiceScreen"
            navigation={navigation}
          />
          <TaskBtn
            btnTitle={"لیست سفارش‌ها"}
            onPressComponent="OrderListScreen"
            navigation={navigation}
          />

          <TaskBtn
            btnTitle={"انبار"}
            onPressComponent="StorageScreen"
            navigation={navigation}
          />
        </ScrollView>
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
    //marginTop:5
  },
  TopBar: {
    borderRadius: 20,
    height: 43,
    paddingEnd: 20,
    marginTop: 10,
  },
  TopBarTitle: {
    fontFamily: "YekanBakhMedium",
    textAlign: "right",
    color: "#fff",
    fontSize: 18,
  },
  btn: {
    //marginTop: 10,
    borderRadius: 20,
    height: 104,
    justifyContent: "center",
    //alignItems: "center",
    paddingEnd: 20,
    paddingStart: 20,
  },

  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    paddingEnd: 10,
  },
  btnText: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 24,
    fontFamily: "YekanBakhBold",
    
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import BusinessBtn from "../../components/businessBtn";
import { ScrollView } from "react-native-gesture-handler";
import TopBar from "../../components/topBar";

export default function BusinessScreen(navigation) {
  return (
    <View style={styles.container}>
      <HeaderScreen />

      {/*Top Bar*/}
      <View style={{ flex: 1 }}>
        <TopBar
          iconSourc={require("../../../assets/icons/shop.png")}
          title="مدیریت کسب"
        />

        {/*storage button*/}
        <ScrollView>
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle2.jpeg")}
            btnTitle={"انبارداری"}
            onPressComponent="StorageScreen"
            navigation={navigation}
          />
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle3.jpeg")}
            btnTitle={"مدیریت ارتباط با مشتری"}
            navigation={navigation}
            onPressComponent="CustomerContactScreen"
          />
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle4.jpeg")}
            btnTitle={"تأمین کنندگان"}
            onPressComponent="BusinessScreen"
            navigation={navigation}
          />
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle5.jpeg")}
            btnTitle={"سفارشات"}
            onPressComponent="BusinessScreen"
            navigation={navigation}
          />
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle6.jpeg")}
            btnTitle={"یادآوری‌ها"}
            onPressComponent="BusinessScreen"
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
    marginTop: 10,
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

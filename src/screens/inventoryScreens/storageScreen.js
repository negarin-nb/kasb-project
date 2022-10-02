import React from "react";
import {View,StyleSheet} from "react-native";
import TopBar from "../../components/topBar";
import HeaderScreen from "../profileScreens/headerScreen";
import Card from "../../components/card";
import StorageList from "../../components/inventory/storageList";

export default function StorageScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/box.png")}
          title="انبار"
        />
        {/* <Card
          title={"ثبت کالا"}
          children={() => <StorageEntry prevItem={nullItem} />}
          expanded={false}
        /> */}
        <Card
          title={"مشاهده انبار"}
          children={() => <StorageList />}
          expanded={true}
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
  },

  btn: {
    marginTop: 10,
    borderRadius: 20,
    height: 92,
    justifyContent: "center",
    // alignItems: "center",
    //paddingEnd: 20,
    //paddingStart: 20,
  },
  btnTitle: {
    //flex: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    paddingEnd: 10,
  },
});

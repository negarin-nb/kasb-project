import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderScreen from "../profileScreens/headerScreen";
import TopBar from "../../components/topBar";
import TaskBtn from "../../components/taskBtn";

export default function ContactManageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderScreen navigation={navigation} />

      {/*Top Bar*/}
      <View style={{ flex: 1 }}>
        <TopBar
          iconSourc={require("../../../assets/icons/MegaphoneWhite.png")}
          title="ارتباطات"
        />

        {/*storage button*/}
        <ScrollView>
          <TaskBtn
            btnTitle={"تقویم محتوایی"}
            onPressComponent="ContentCalendarScreen"
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
});

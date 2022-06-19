import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import HeaderScreen from "../profileScreens/headerScreen";
import { LinearGradient } from "expo-linear-gradient";
import BusinessBtn from "../../components/businessBtn";
import { ScrollView } from "react-native-gesture-handler";

export default function BusinessScreen(navigation) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.TopBar, { width: width - 40 }]}
        >
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 24, height: 24, marginStart: 20, marginTop: 2 }}
                source={require("../../../assets/icons/shop.png")}
              />
            </View>
            <Text style={styles.TopBarTitle}>مدیریت کسب</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/*storage button*/}
        <ScrollView>
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle2.jpeg")}
            btnTitle={"انبارداری"}
            onPressComponent="BusinessScreen"
            navigation={navigation}
          />
          <BusinessBtn
            imageSource={require("../../../assets/images/Rectangle3.jpeg")}
            btnTitle={"مدیریت ارتباط با مشتری"}
            onPressComponent="BusinessScreen"
            navigation={navigation}
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

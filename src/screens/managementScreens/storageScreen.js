import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import TopBar from "../../components/topBar";
import HeaderScreen from "../profileScreens/headerScreen";
import { LinearGradient } from "expo-linear-gradient";
import AddProductForm from "../../components/addProductForm";
import Card from "../../components/card";

export default function StorageScreen({ navigation }) {
  //const [isExpand, setIsExpand] = useState(false);
  const { width } = useWindowDimensions();

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };


  

  

  function ExpandedCard() {
    return (
      <LinearGradient
        colors={["#63D98A", "#24438E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.btn, { width: width - 40 }]}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 92,
            paddingEnd: 20,
            paddingRight: 20,
          }}
          onPress={handleExpand}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.btnTitle}>ورود</Text>
          </View>
          <View style={{ alignItems: "right", justifyContent: "center" }}>
            <Image
              style={{ width: 15.5, height: 11 }}
              source={require("../../../assets/icons/chevronright.png")}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/shop.png")}
          title="انبار"
        />

         <Card children={}  />
         <Card  />
           

        {/*isExpand ? <ExpandedCard /> : <Card />*/}
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

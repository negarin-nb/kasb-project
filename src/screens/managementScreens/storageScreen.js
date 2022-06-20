import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
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

  function handleComponent() {
    return <AddProductForm />;
  }

  return (
    <View style={styles.container}>
      <HeaderScreen />
      <View style={{ flex: 1 }}>
        {/*Top Bar*/}
        <TopBar
          iconSourc={require("../../../assets/icons/box.png")}
          title="انبار"
        />
        <ScrollView>
          <Card
            title={"ورود"}
            imageSource={require("../../../assets/images/storageRect1.jpeg")}
            children={() => <AddProductForm />}
          />
          <Card
            title={"خروج"}
            imageSource={require("../../../assets/images/storageRect2.jpeg")}
            children={() => <AddProductForm />}
          />
          <Card
            title={"مرجوعی"}
            imageSource={require("../../../assets/images/storageRect3.jpeg")}
            children={() => <AddProductForm />}
          />

          <Card
            title={"ضایعات"}
            imageSource={require("../../../assets/images/storageRect4.jpeg")}
            children={() => <AddProductForm />}
          />
          <Card
            title={"موجودی"}
            imageSource={require("../../../assets/images/Rectangle2.jpeg")}
            children={() => <AddProductForm />}
          />
        </ScrollView>
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

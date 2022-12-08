import React, { useState, useEffect, useFocusEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../store/auth-context";
import Chart from "../../components/chart";
import BottomSheetButtons from "../../components/bottomSheetButtons";
import HomeBtn from "../../components/homeBtn";
import pickImage from "../../util/myImagePicker";
import HeaderScreen from "./headerScreen";
import { NumericFormat } from "react-number-format";
import accountingApi from "../../api/accounting";
import CurrencyFormat from '../../components/currencyFormat';


export default function HomeScreen({ navigation }) {
  const authCtx = React.useContext(AuthContext);
  const [currentCash, setCurrentCash] = useState(12346);
  const [cashArray, setCashArray] = useState([]);
  const [question, setQuestion] = useState("");
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const resultImage = await pickImage();
    if (!resultImage.cancelled) {
      setImage(resultImage.uri);
    }
  };

  useEffect(() => {
    fetchCash()
  }, []);

   async function fetchCash() {
    setLoading(true);
    const result = await accountingApi.getCash(authCtx.accessToken);
    setLoading(false);
    if (!result.ok) alert("خطایی در بازیابی صندوق پیش آمده!");
    else {
      const arr = Object.values(result.data.Item);
      setCurrentCash(arr[0]);
      authCtx.setUserCash(arr[0]);
    }
    console.log(result.data.Message);
  }
  //const authCtv=React.useContext(AuthContext2);
  //setCash(authCtx.user[0].cash);
  //const response = await axios.get(apiEndpoint/cash).then((response) => {setCash(response.data)});

  //React.useEffect(  () => {
  //let cash = respose.data.cash;
  //async function fetchUser() {
  // const storedUser = await AsyncStorage.getItem('user');

  // if (storedUser) {
  //  authCtx.setUserData(storedUser);
  //setCash(storedUser[0].cash);
  // }
  // fetchUser();
  // }, []);
  return (
    <View style={[styles.container, { height }]}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <HeaderScreen navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/*cash button*/}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cashButton, { width: width - 40 }]}
        >
          <Text style={styles.cashTitle}>صندوق</Text>
          <TouchableOpacity onPress={() => navigation.navigate("CashScreen")}>
            {!loading && (
              <CurrencyFormat
                amount={currentCash}
                customeStyle={styles.cashText}
              />
            )}
            {loading && <ActivityIndicator animating={loading} size="large" />}
          </TouchableOpacity>
        </LinearGradient>

        {/*chart*/}
        <Chart tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} />

        {/*four buttons */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <HomeBtn
            text="به زودی"
            imgSource={require("../../../assets/icons/openbook.png")}
            onPressComponent=""
            navigation={navigation}
          />
          <HomeBtn
            text="مدیریت کار"
            imgSource={require("../../../assets/icons/greenshop.png")}
            onPressComponent="InventoryManageScreen"
            navigation={navigation}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <HomeBtn
            text="ارتباطات"
            imgSource={require("../../../assets/icons/megaphone.png")}
            onPressComponent="ContactManageScreen"
            navigation={navigation}
          />
          <HomeBtn
            text="مدیریت کسب"
            imgSource={require("../../../assets/icons/calculation.png")}
            onPressComponent="AccountingManageScreen"
            navigation={navigation}
          />
        </View>
      </ScrollView>
      {/*bottom buttons */}
      <BottomSheetButtons />
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

  cashButton: {
    marginTop: 0,
    paddingVertical: 10,
    borderRadius: 20,
    height: 104,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },

  cashTitle: {
    color: "#fff",
    textAlign: "right",
    fontSize: 20,
    fontFamily: "YekanBakhThin",
    marginRight: 20,
  },

  cashText: {
    color: "#fff",
    textAlign: "left",
    fontSize: 26,
    fontFamily: "IranYekanBold",
    marginLeft: 20,
    marginTop: -5,
  },

  btn: {
    marginTop: 10,
    borderRadius: 20,
    height: 104,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "YekanBakhMedium",
  },

  questionWrapper: {
    marginTop: 10,
    marginBottom: 50,
    borderRadius: 20,
    height: "auto",
    //justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 30,
  },
  questionArea: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    height: "auto",
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
  },
});

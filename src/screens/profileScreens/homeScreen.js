import React, { useState, useEffect, useFocusEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../store/auth-context";
import Chart from "../../components/chart";
import BottomSheetButtons from "../../components/bottomSheetButtons";
import HomeBtn from "../../components/homeBtn";
import pickImage from "../../util/myImagePicker";
import HeaderScreen from "./headerScreen";
import authApi from "../../api/auth.js";


export default function HomeScreen({ navigation }) {
  const authCtx = React.useContext(AuthContext);
  
  const [currentCash, setCurrentCash] = useState(0);
  const [cashArray, setCashArray] = useState([]);
  const [question, setQuestion] = useState("");
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const { width } = useWindowDimensions();
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    const resultImage = await pickImage();
    if (!resultImage.cancelled) {
      setImage(resultImage.uri);
    }
  };

  




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

  const handleLogout = () => {
    authCtx.logout();
  };


  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <HeaderScreen />

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
            <Text style={styles.cashText}>{currentCash.toString()} تومان </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/*chart*/}
        <Chart tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} />

        {/*four buttons */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <HomeBtn
            text="آکادمی"
            imgSource={require("../../../assets/icons/openbook.png")}
          />
          <HomeBtn
            text="مدیریت کار"
            imgSource={require("../../../assets/icons/greenshop.png")}
            onPressComponent="TaskScreen"
            navigation={navigation}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <HomeBtn
            text="ارتباطات"
            imgSource={require("../../../assets/icons/megaphone.png")}
            onPressComponent="CustomerContactScreen"
            navigation={navigation}
          />
          <HomeBtn
            text="مدیریت کسب"
            imgSource={require("../../../assets/icons/calculation.png")}
            onPressComponent="BusinessScreen"
            navigation={navigation}
          />
        </View>

        {/*FAQ button */}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { width: width - 40 }]}
        >
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 11, height: 17, marginStart: 20, marginTop: 2 }}
                source={require("../../../assets/icons/leftchevron.png")}
              />
            </View>
            <Text style={styles.btnText}>سؤالات متداول</Text>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={{ width: 39, height: 39, marginTop: -10 }}
                source={require("../../../assets/icons/books.png")}
              />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/*answer buttons */}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { width: width - 40 }]}
        >
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 11, height: 17, marginStart: 20, marginTop: 2 }}
                source={require("../../../assets/icons/leftchevron.png")}
              />
            </View>
            <Text style={styles.btnText}>پاسخ سؤالات شما</Text>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={{ width: 39, height: 39, marginTop: -10 }}
                source={require("../../../assets/icons/helpfile.png")}
              />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* question submit */}
        <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.questionWrapper, { width: width - 40 }]}
        >
          <Text style={[styles.btnText, { marginBottom: 20 }]}>
            ثبت سؤال شما
          </Text>
          {/* white area */}
          <View style={[styles.questionArea, { width: width - 70 }]}>
            {/* left buttons */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../../assets/icons/document.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePickImage}>
                <Image
                  style={{ width: 24, height: 24, marginTop: 10 }}
                  source={require("../../../assets/icons/addimage.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24, marginTop: 10 }}
                  source={require("../../../assets/icons/mic.png")}
                />
              </TouchableOpacity>

              {/* submit button */}
              <TouchableOpacity
                style={{
                  flex: 10,
                  alignItems: "flex-end",
                  flexDirection: "row",
                  marginTop: 80,
                }}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../../assets/icons/submit.png")}
                />
                <Text
                  style={{
                    color: "#24438E30",
                    marginStart: 5,
                    fontFamily: "YekanBakhMedium",
                    marginTop: 2,
                    fontSize: 15,
                  }}
                >
                  ارسال
                </Text>
              </TouchableOpacity>
            </View>

            {/* text area input */}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View>
                <TextInput
                  placeholder="متن سؤال"
                  numberOfLines={4}
                  multiline
                  value={question}
                  maxLength={700}
                  onChangeText={(text) => setQuestion(text)}
                  style={{
                    flex: 4,
                    textAlign: "right",
                    fontFamily: "YekanBakhMedium",
                    fontSize: 16,
                    width: width - 150,
                  }}
                  required
                />

                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity onPress={handlePickImage}>
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 80, height: 80, marginTop: 5 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </LinearGradient>

        <Button title="log out" onPress={handleLogout} />
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
    fontSize: 30,
    fontFamily: "IranYekanBold",
    marginLeft: 20,
    marginTop: -12,
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

import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import pickImage from "../../util/myImagePicker";
import HeaderScreen from "./headerScreen";

export default function SupportScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    const resultImage = await pickImage();
    if (!resultImage.cancelled) {
      setImage(resultImage.uri);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <HeaderScreen navigation={navigation} />
      {/* <Text>SupportScreen</Text> */}
      <View style={{ flex: 1 }}>
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
                  numberOfLines={5}
                  multiline
                  value={question}
                  maxLength={700}
                  onChangeText={(text) => setQuestion(text)}
                  style={{
                    textAlignVertical: "top",
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingEnd: 20,
    paddingStart: 20,
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

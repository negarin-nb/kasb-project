import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../../styles/styles.js";
import AppButton from "../../components/appButton.js";
import { AuthContext } from "../../store/auth-context.js";
import authApi from "../../api/auth.js";
import { toEnglish } from 'persian';

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const authCtx = useContext(AuthContext);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  async function handleRegister ({firstName, lastName, shopName, phone}){
    
    const phoneInfo = { phone_number: toEnglish(phone), dev_mode: false };
    const result = await authApi.phoneSubmit(phoneInfo);
    console.log(result.data.Message);
    if (!result.ok){
      alert(result.data.Message);
    }
      if (result.ok)
        navigation.navigate("RegiCodeSubmit", {
          phone_number: phone,
          password: password,
          first_name: firstName,
          last_name: lastName,
          shop_name: shopName,
        });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ flex: 4, alignItems: "center" }}>
          <Image
            style={styles.authImage}
            source={require("../../../assets/images/profile.png")}
          />
          <Text style={styles.title}>حساب خود را بسازید</Text>

          <TextInput
            placeholder="نام خود را وارد نمایید"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder=" نام‌خانوادگی خود را وارد نمایید"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="نام کار و کسب خود را وارد نمایید"
            value={shopName}
            onChangeText={(text) => setShopName(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="شماره تلفن خود را وارد نمایید"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="رمز عبور خود را وارد نمایید"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.title, { marginTop: 20 }]}>
              قوانین و مقررات را مطالعه کردم و با آن موافقم
            </Text>
            <Switch
              style={styles.switchButton}
              trackColor={{ false: "#E4F1ED", true: "#9CF8D7" }}
              thumbColor={isEnabled ? "#00EE98" : "#BBE7C9"}
              ios_backgroundColor="#E4F1ED"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <AppButton
              handleButton={handleRegister}
              data={{ firstName, lastName, shopName, phone }}
              textButton="ثبت"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

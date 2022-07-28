import React, { useEffect, useState, useRoute, useContext } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import styles from "../../styles/styles.js";
import AppButton from "../../components/appButton.js";
import authApi from "../../api/auth.js";
import { AuthContext } from "../../store/auth-context.js";

export default function RegiCodeSubmitScreen({ route , navigation }) {
  const authCtx = useContext(AuthContext);
 const [code, setCode] = useState("");

  const {
    phone_number,
    verification_code,
    password,
    first_name,
    last_name,
    shop_name,
  } = route.params;

  //const userInfo = useRoute();
  //userInfo.params.verification_code;
  
 
  console.log(phone_number);

  const handleCodeSubmit = async () => {
    if (code !== verification_code) {
      alert("کد وارد شده اشتباه است.");
    } else {
      const userInfo = {
        phone_number,
        verification_code : code,
        password,
        first_name,
        last_name,
        shop_name,
      };
      const result = await authApi.register(userInfo);
      if (result.ok) {
        authCtx.authenticate({
          authAccessToken: result.data.Item.access,
          authRefreshToken: result.data.Item.refresh,
        });
       // const result = await authApi.login(phone_number, password);
      }
    }

    //navigation.navigate("PassSubmit");
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          style={styles.authImage}
          source={require("../../../assets/images/unlockKey.png")}
        />
        <Text tyle={styles.title}>{route.params.verification_code}</Text>
        <TextInput
          value={code}
          onChangeText={(text) => setCode(text)}
          style={styles.input}
        />
        <Text style={[styles.title, { marginTop: 20 }]}>
          کد دریافتی را وارد نمایید
        </Text>
      </View>
      <Text style={[styles.title, { marginBottom: 40 }]}>
        هنوز کدی دریافت نکردم
      </Text>
      <AppButton handleButton={handleCodeSubmit} textButton="ارسال کد" />
    </KeyboardAvoidingView>
  );
}

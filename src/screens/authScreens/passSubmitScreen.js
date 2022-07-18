import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import styles from "../../styles/styles.js";
import AppButton from "../../components/appButton.js";


export default function PassSubmitScreen({ navigation }) {
  
  const [password, setPassword] = useState("");

  const handlePassSubmit = () => {
    {
      navigation.navigate("Login");
      /*auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))*/
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          style={styles.authImage}
          source={require("../../../assets/images/unlockKey.png")}
        />

        <TextInput
          placeholder="رمز عبور جدید را وارد نمایید"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="رمز عبور جدید را تکرار نمایید"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

      </View>
      <AppButton handleButton={handlePassSubmit} textButton="ثبت رمز جدید"/>
    </KeyboardAvoidingView>
  );
}

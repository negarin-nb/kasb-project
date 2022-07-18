import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import AppButton from "../../components/appButton.js";
import styles from "../../styles/styles.js";



export default function PassRecoverScreen({ navigation }) {
  
  const [phone, setPhone] = useState("");

  const handleRecoverPass = () => navigation.navigate('CodeSubmit');
      /*auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))*/
  
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          style={styles.authImage}
          source={require("../../../assets/images/unlockKey.png")}
        />

        <TextInput
          //placeholder="شماره تلفن خود را وارد نمایید"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
        />
        <Text style={[styles.title, { marginTop: 20 }]}>
          شماره تلفن خود را وارد نمایید
        </Text>
      </View>
      <AppButton handleButton={handleRecoverPass} textButton="بازیابی رمز عبور"/>
    </KeyboardAvoidingView>
  );
}

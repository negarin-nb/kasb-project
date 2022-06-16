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


export default function CodeSubmitScreen({ navigation }) {
  
  const [code, setCode] = useState("");

  const handleCodeSubmit = () => navigation.navigate('PassSubmit');


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-top" }}>
        <Image
          style={styles.authImage}
          source={require("../../../assets/images/unlockKey.png")}
        />

        <TextInput
          value={code}
          onChangeText={(text) => setCode(text)}
          style={styles.input}
        />
        <Text style={[styles.title, { marginTop: 20 }]}>
          کد دریافتی را وارد نمایید
        </Text>
      </View>
      <AppButton handleButton={handleCodeSubmit} textButton="ارسال کد"/>
    </KeyboardAvoidingView>
  );
}

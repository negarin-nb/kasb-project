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

export default function RegiCodeSubmitScreen({ navigation }) {
  const [code, setCode] = useState("");

  const handleCodeSubmit = () => navigation.navigate("PassSubmit");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 1 }}>
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
      <Text style={[styles.title, { marginBottom: 40 }]}>
        هنوز کدی دریافت نکردم
      </Text>
      <AppButton handleButton={handleCodeSubmit} textButton="ارسال کد" />
    </KeyboardAvoidingView>
  );
}

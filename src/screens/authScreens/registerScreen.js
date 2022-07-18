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
import { createUser, createFakeUser } from "../../util/auth.js";
import LoadingOverlay from "../../components/loadingOverlay.js";
import { AuthContext } from "../../store/auth-context.js";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  //const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  async function handleRegister(name, job, phone) {
    setIsAuthenticating(true);
    try {
      //const token = await createUser(name,job,phone );
      const token = fakeCreateUser(name, job, phone);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Registration failed!");
      setIsAuthenticating(false);
    }
    //navigation.navigate('RegiCodeSubmit');
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
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
            placeholder="نام و نام‌خانوادگی خود را وارد نمایید"
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="نام کار و کسب خود را وارد نمایید"
            value={job}
            onChangeText={(text) => setJob(text)}
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
          <Text style={[styles.title, { marginTop: 20 }]}>
            شماره تلفن خود را وارد نمایید
          </Text>

          {/*<TextInput
            placeholder="رمز عبور خود را وارد نمایید"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
            required
        />*/}

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
            <AppButton handleButton={handleRegister} textButton="ثبت" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

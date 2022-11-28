import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Alert,
  Keyboard,
} from "react-native";
import styles from "../../styles/styles.js";
import AppButton from "../../components/appButton.js";
import { login, fakeLogin } from "../../util/auth.js";
import LoadingOverlay from "../../components/loadingOverlay.js";
import { AuthContext } from "../../store/auth-context.js";
import authApi from "../../api/auth.js";

export default function LogInScreen({ navigation }) {
  const authCtx = React.useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async ({phone, password}) => {
    //setIsAuthenticating(true);
    const result = await authApi.login(phone, password);
    // const user = fakeLogin(phone, password);
    if (!result.ok) {
      console.log(result.data.message);
      return setLoginFailed(true);}
    setLoginFailed(false);
    authCtx.authenticate({
      authAccessToken: result.data.access,
      authRefreshToken: result.data.refresh,
    });
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <View style={{ flex: 3 }}>
          <Image
            style={styles.authImage}
            source={require("../../../assets/images/profile.png")}
          />
          <Text style={styles.title}>ورود به حساب کاربری</Text>
          {loginFailed ? <Text>Invalid username and/or password!</Text> : null}
          

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
            style={styles.input}
            secureTextEntry
            required
          />

          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpButton}>ایجاد حساب کاربری جدید</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("PassRecover")}>
            <Text style={styles.forgotPassButton}>
              رمز عبور خود را فراموش کرده‌ام
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <AppButton
              handleButton={handleLogin}
              data={{ phone, password }}
              textButton="ورود به حساب کاربری"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import AppButton from "../../components/appButton";

export default function EditProfileScreen() {
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [imageError, setImageError] = useState(false);

  const onImageNotFound = () => {
    setImageError(true);
  };
  const handleEditProfile = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/*header and date*/}
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={[styles.topBarText, { textAlign: "left" }]}>تاریخ</Text>
          <Text style={styles.topBarText}>سلام مریم</Text>
        </View>

        {/*avatar*/}
        <View style={{ flex: 4, justifyContent: "flex-top" }}>
          <Image
            style={styles.avatar}
            source={
              imageError
                ? require("../../../assets/images/profile.png")
                : {
                    uri: "https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg",
                  }
            }
            onError={() => onImageNotFound()}
          />

          {/*form*/}
          <TextInput
            placeholder="تغییر نام و نام‌خانوادگی"
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="تغییر نام فروشگاه"
            value={shopName}
            onChangeText={(text) => setShopName(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="صنف خود را انتخاب کنید"
            value={job}
            onChangeText={(text) => setJob(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="آدرس ایمیل"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <AppButton
            handleButton={handleEditProfile}
            textButton="ثبت تغییرات"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topBarText: {
    flex: 1,
    fontFamily: "YekanBakhMedium",
    textAlign: "right",
    color: "#8E8E93",
    fontSize: 16,
  },
  avatar: {
    resizeMode: "cover",
    height: 110,
    width: 110,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 25,
    marginBottom: 50,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#3A9458",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: 250,
    height: 50,
    alignItems: "center",
    textAlign: "center",
    fontFamily: "YekanBakhThin",
  },
});

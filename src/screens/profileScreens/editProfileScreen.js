import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AppButton from "../../components/appButton";
import authApi from "../../api/auth.js";
import { AuthContext } from "../../store/auth-context";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shopName, setShopName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phonNumber, setPhoneNumber] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const authCtx = React.useContext(AuthContext);

  const onImageNotFound = () => {
    setImageError(true);
  };

  useEffect(() => {
    loadProfile();
  }, [userProfile]);

  async function loadProfile() {
    const user = await authCtx.getUser();
    console.log("user");
    console.log(user);
    if(user){
      setUserProfile(user);
      //console.log("set userProfile");
      //console.log(userProfile);
      setName(userProfile.first_name);
      setLastName(userProfile.last_name);
      setShopName(userProfile.shop_name);
      setPhoneNumber(userProfile.phone_number);
      console.log("userProfile");
      console.log(userProfile);
    }
    else alert("خطا در بازیابی اطلاعات، لطفا دوباره وارد شوید!")
  }
  const handleEditProfile = async () => {
    const _userProfile = {
      first_name: name,
      last_name: lastName,
      shop_name: shopName,
      phone_number: phonNumber,
    };
  console.log(_userProfile);
   const result = await authApi.editProfile(authCtx.accessToken, _userProfile);
   if (!result.ok) console.log("Edit profile faild");
   else alert("اطلاعات شما با موفقیت ویرایش شد!");
   console.log(result.data.Message);
   console.log(result.data);
   authCtx.setUserData(_userProfile);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/*avatar*/}
        <View style={{ flex: 4, marginTop: 70 }}>
          <Image
            style={styles.avatar}
            source={
              imageError
                ? require("../../../assets/images/profile.png")
                : {
                    uri: "https//organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg",
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
            placeholder="شماره تماس"
            value={phonNumber}
            onChangeText={(text) => setPhonNumber(text)}
            autoCapitalize="none"
            style={styles.input}
          />
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 50 }}
          >
            <AppButton
              handleButton={handleEditProfile}
              textButton="ثبت تغییرات"
            />
          </View>
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


import React, { useState, useContext } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import ModalPicker from "./modalPicker";
import CustomDatePicker from "../util/customDatePicker";
import { AuthContext } from "../store/auth-context";
import storageApi from "../api/storage.js";

export default function StorageEntry() {
  const authCtx = useContext(AuthContext);

  const [itemName, setItemName] = useState("");
  const [number, setNumber] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [entryDate, setEntryDate] = useState("تاریخ ثبت"); //modal
  const [enDateModalVisible, setEnDateModalVisible] = useState(false);

  const [barcode, setBarcode] = useState("");
  const [expireDate, setExpireDate] = useState("تاریخ انقضا"); //modal
  const [exDateModalVisible, setExDateModalVisible] = useState(false);

  const [supplyWarn, setSupplyWarn] = useState(""); //modal
  const [expireWarn, setExpireWarn] = useState("");
  const [lable, setLable] = useState("برچسب"); //modal
  const [lableList, setLableList] = useState(["برچسب"]);
  const [lableModalVisible, setLableModalVisible] = useState(false);


  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  const handleStorageEntry = async () => {
    const itemData = {
      name: itemName,
      category: "",
      purchase_price: purchasePrice,
      suggested_selling_price: sellingPrice,
      barcode: "0123443",
      expire_date: entryDate,
      labels: lable,
      registration_date: expireDate,
      warning_interval: supplyWarn,
      count: number,
    };
   // console.log(itemData.name);
   //console.log(authCtx.accessToken);
    const result = await storageApi.storeItem(authCtx.accessToken, itemData);
    if (!result.ok) alert("ثبت آیتم با خطا مواجه شده است!");
    alert("کالای مورد نظر ثبت شد");
  };

  return (
    <View style={styles.container}>
      {/*Item title*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../../assets/icons/order.png")}
        />
        <Text style={styles.title}>افزودن کالا</Text>
      </View>
      {/*row 1 *******/}
      <View style={{ flexDirection: "row" }}>
        {/*number*/}
        <TextInput
          placeholder="تعداد"
          placeholderTextColor="#24408E"
          value={number}
          onChangeText={(text) => setNumber(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 0.8 }]}
        />
        {/*itemName*/}
        <TextInput
          placeholder="نام محصول"
          placeholderTextColor="#24408E"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 2 }]}
        />
      </View>
      {/*row 2 *******/}
      <View style={{ flexDirection: "row" }}>
        {/*sellingPrice*/}
        <TextInput
          placeholder="قیمت پیشنهادی فروش"
          placeholderTextColor="#24408E"
          value={sellingPrice}
          onChangeText={(text) => setSellingPrice(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 2 }]}
        />
        {/*purchasePrice*/}
        <TextInput
          placeholder="قیمت خرید"
          placeholderTextColor="#24408E"
          value={purchasePrice}
          onChangeText={(text) => setPurchasePrice(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 2 }]}
        />
      </View>
      {/*row 3 *******/}
      <View style={{ flexDirection: "row" }}>
        {/*Barcode*/}
        <TextInput
          placeholder="بارکد"
          placeholderTextColor="#24408E"
          value={barcode}
          onChangeText={(text) => setBarcode(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 2 }]}
        />
        {/*Entry date*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setEnDateModalVisible)}
          style={[styles.input, { flex: 0.8 }]}
        >
          <Text style={[styles.inputDate]}>{entryDate}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={enDateModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setEnDateModalVisible)
          }
        >
          <CustomDatePicker
            setDate={setEntryDate}
            changeModalVisibiblity={changeModalVisibiblity}
            setDateModalVisible={setEnDateModalVisible}
          />
        </Modal>
      </View>
      {/*row 4 *******/}
      <View style={{ flexDirection: "row" }}>
        {/*Tag */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setLableModalVisible)}
          style={[styles.input, { flex: 1.2 }]}
        >
          <Text style={styles.inputText}>{lable}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={lableModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setLableModalVisible)
          }
        >
          <ModalPicker
            addNew={"+ ایجاد برچسب جدید"}
            dataList={lableList}
            setData={setLable}
            setModalVisible={setLableModalVisible}
            changeModalVisibiblity={changeModalVisibiblity}
          />
        </Modal>
        {/*Warn interval*/}
        <TextInput
          placeholder="بازه هشدار"
          placeholderTextColor="#24408E"
          value={supplyWarn}
          onChangeText={(text) => setSupplyWarn(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 0.8 }]}
        />

        {/*Expire date*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setExDateModalVisible)}
          style={[styles.input, { flex: 0.8 }]}
        >
          <Text style={[styles.inputDate]}>{expireDate}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={exDateModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setExDateModalVisible)
          }
        >
          <CustomDatePicker
            setDate={setExpireDate}
            changeModalVisibiblity={changeModalVisibiblity}
            setDateModalVisible={setExDateModalVisible}
          />
        </Modal>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleStorageEntry}>
            ثبت کالا
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    paddingTop: 5,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#24438E15",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 2,
    marginTop: 5,
    height: 35,
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "YekanBakhThin",
    color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
  inputText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "YekanBakhThin",
    color: "#24408E",
  },
  inputDate: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
  },
  addButton: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    alignItems: "flex-end",
  },
  button: {
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    textAlign: "center",
  },
  title: {
    color: "#24408E",
    textAlign: "right",
    fontSize: 16,
    fontFamily: "IranYekanBold",
  },
});

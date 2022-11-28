
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import CustomDatePicker from "../../util/customDatePicker";
import { AuthContext } from "../../store/auth-context";
import storageApi from "../../api/storage.js";
import searchApi from "../../api/search";
import { toEnglish } from 'persian';

export default function StorageEntry({prevItem, setModalVisible, handleCancelModal}) {
  const authCtx = useContext(AuthContext);
  const [itemName, setItemName] = useState(prevItem.name || "");
  const [itemCategory, setItemCategory] = useState(prevItem.category.name || "");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);//modal
  const [categoryList, setCategoryList] = useState([]);

  const [number, setNumber] = useState(prevItem.count.toString() || "");
  const [purchasePrice, setPurchasePrice] = useState(prevItem.purchase_price.toString() || "");
  const [sellingPrice, setSellingPrice] = useState(prevItem.suggested_selling_price.toString() || "");
  
  const [entryDate, setEntryDate] = useState(prevItem.registration_date || "تاریخ ثبت"); //modal
  const [enDateModalVisible, setEnDateModalVisible] = useState(false);
  
  const [barcode, setBarcode] = useState(prevItem.barcode || "");
  
  const [expireDate, setExpireDate] = useState(prevItem.expiration_date || "تاریخ انقضا"); //modal
  const [exDateModalVisible, setExDateModalVisible] = useState(false);

  const [supplyWarn, setSupplyWarn] = useState(prevItem.inventory_warning_interval.toString() || ""); //modal
  const [expireWarn, setExpireWarn] = useState(prevItem.expiration_warning_interval.toString() || "");
  const [warnModalVisible, setWarnModalVisible] = useState(false);
  const [lable, setLable] = useState(prevItem.labels.name || ""); //modal
  const [lableList, setLableList] = useState([]);
  const [labelModalVisible, setLabelModalVisible] = useState(false);

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  const handleCategoryList = async (text) => {
    if (text.length > 1) {
      const result = await searchApi.searchCategory(authCtx.accessToken, text);
      if (!result.ok) console.log("error in getting Category List!");
      setCategoryList(result.data.ListItems);
      console.log(result.data.Message);
    }
  }
  const handleLabelList = async (text) => {
    if (text.length > 1) {
      const result = await searchApi.searchLabel(authCtx.accessToken, text);
      if (!result.ok) console.log("error in getting Lable List!");
      setLableList(result.data.ListItems);
      console.log(result.data.Message);
    }
  };

  const reRender = () => {
    setItemName("");
    setItemCategory("");
    setPurchasePrice("");
    setNumber("");
    setSellingPrice("");
    setExpireDate("تاریخ انقضا");
    setEntryDate("تاریخ ثبت");
    setSupplyWarn("");
    setExpireWarn("");
    setLable("");
  };

  const handleStorageEntry = async () => {
    const itemData = {
      name: itemName,
      category: itemCategory,
      purchase_price: parseInt(toEnglish(purchasePrice)),
      barcode: "0123443",
      count: parseInt(toEnglish(number)),
      suggested_selling_price: parseInt(toEnglish(sellingPrice)),
      registration_date: expireDate,
      inventory_warning_interval: parseInt(toEnglish(supplyWarn)),
      expiration_date: entryDate,
      expiration_warning_interval: parseInt(toEnglish(expireWarn)),
      labels: [lable],
    };


   console.log(itemData);
   //console.log(authCtx.accessToken);
    const result = await storageApi.storeItem(authCtx.accessToken, itemData);
    console.log(result.data.Message);
    if (!result.ok) alert("ثبت آیتم با خطا مواجه شده است!");
    else {
      alert("کالای مورد نظر ثبت شد"); 
      reRender();

    }
  };
  const handleStorageEdit = async () => {
    const itemData = {
      id: prevItem.id,
      name: itemName,
      category: "",
      purchase_price: purchasePrice,
      barcode: "0123443",
      count: number,
      suggested_selling_price: sellingPrice,
      registration_date: entryDate,
      inventory_warning_interval: supplyWarn,
      expiration_date: expireDate,
      expiration_warning_interval: expireWarn,
      labels: [lable],
    };
    // console.log(itemData.name);
    //console.log(authCtx.accessToken);
    const result = await storageApi.updateItem(authCtx.accessToken, itemData);
    console.log("in edit");
    console.log(result.data.Message);
    if (!result.ok) alert("به روز رسانی آیتم با خطا مواجه شده است!");
    else alert("کالای مورد نظر به روز رسانی شد!");
    setModalVisible(false);
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
          source={require("../../../assets/icons/order.png")}
        />
        <Text style={styles.title}>
          {prevItem.name ? "به روزرسانی کالا" : "افزودن کالا"}
        </Text>
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
        {/*itemCategory*/}
        <TouchableOpacity
          onPress={() => {
            changeModalVisibiblity(true, setCategoryModalVisible);
          }}
          style={[styles.input, { flex: 1.2 }]}
        >
          <Text style={styles.inputText}>{itemCategory || "دسته‌بندی"}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={categoryModalVisible}
        >
          <TouchableOpacity
            style={[styles.modalContainer]}
            onPress={() => {
              setCategoryModalVisible(false);
            }}
          >
            <View style={[styles.dropDown]}>
              <TextInput
                placeholder="دسته‌بندی"
                placeholderTextColor="#24408E"
                value={itemCategory}
                onChangeText={(text) => {
                  setItemCategory(text);
                  handleCategoryList(text);
                  // handleOnChangeItem(text, index);
                  //setSuggestionsVisible(true);
                }}
                autoCapitalize="none"
                autoFocus={true}
                style={[styles.input]}
              />
              {categoryList.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setItemCategory(item);
                    setCategoryModalVisible(false);
                    //changSuggestionsVisibility(index+1, false);
                  }}
                >
                  <Text style={styles.dropDownText}>{item}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.button, { width: 70, alignSelf: "center" }]}
                onPress={() => {
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>ثبت</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* <Modal
          transparent={true}
          animationType="fade"
          visible={categoryModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setCategoryModalVisible)
          }
        >
          <TextInput
            placeholder="دسته‌بندی"
            placeholderTextColor="#24408E"
            value={itemCategory}
            onChangeText={(text) => setItemCategory(text)}
            autoCapitalize="none"
            style={[styles.input, { flex: 2 }]}
          />
          <ModalPicker
            addNew={"+ ایجاد دسته‌بندی جدید"}
            dataList={categoryList}
            setData={setItemCategory}
            setModalVisible={setCategoryModalVisible}
            changeModalVisibiblity={changeModalVisibiblity}
          />
        </Modal> */}
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
          onPress={() => changeModalVisibiblity(true, setLabelModalVisible)}
          style={[styles.input, { flex: 1.2 }]}
        >
          <Text style={styles.inputText}>{lable || "برچسب"}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={labelModalVisible}
        >
          <TouchableOpacity
            style={[styles.modalContainer]}
            onPress={() => {
              setLabelModalVisible(false);
            }}
          >
            <View style={[styles.dropDown]}>
              <TextInput
                placeholder="برچسب"
                placeholderTextColor="#24408E"
                value={lable}
                onChangeText={(text) => {
                  setLable(text);
                  handleLabelList(text);
                }}
                autoCapitalize="none"
                autoFocus={true}
                style={[styles.input]}
              />
              {lableList.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setLable(item);
                    setLabelModalVisible(false);
                  }}
                >
                  <Text style={styles.dropDownText}>{item}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.button, { width: 70, alignSelf: "center" }]}
                onPress={() => {
                  setLabelModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>ثبت</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/*Warn interval*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setWarnModalVisible)}
          style={[styles.input, { flex: 0.8 }]}
        >
          <Text
            style={styles.inputText}
          >{` ${expireWarn} روز ، ${supplyWarn} عدد`}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={warnModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setWarnModalVisible)
          }
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modal, { width: 300 }]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TextInput
                  placeholder="کمتر از ۱۰ عدد"
                  placeholderTextColor="#24408E70"
                  value={supplyWarn}
                  onChangeText={(text) => setSupplyWarn(text)}
                  autoCapitalize="none"
                  style={[styles.input, { flex: 1 }]}
                />
                <Text style={[styles.modalText]}>بازه هشدار موجودی</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TextInput
                  placeholder="کمتر از ۱۰ روز"
                  placeholderTextColor="#24408E70"
                  value={expireWarn}
                  onChangeText={(text) => setExpireWarn(text)}
                  autoCapitalize="none"
                  style={[styles.input, { flex: 1 }]}
                />
                <Text style={[styles.modalText]}>بازه هشدار انقضا</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={[styles.button]}>
                  <Text
                    style={styles.buttonText}
                    onPress={() =>
                      changeModalVisibiblity(false, setWarnModalVisible)
                    }
                  >
                    ثبت
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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

      {prevItem.name ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleStorageEdit}>
              به روزرسانی کالا
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancleButton]}>
            <Text style={styles.buttonText} onPress={handleCancelModal}>
              لغو
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.button, { justifyContent: "flex-start" }]}
          >
            <Text style={styles.buttonText} onPress={handleStorageEntry}>
              ثبت کالا
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 5,
    paddingTop: 5,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#24438E15",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
  },
  input: {
    marginTop: 8,
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginHorizontal: 2,
    height: 32,
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
  inputText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
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
    marginHorizontal: 2,
    backgroundColor: "#63D98A",
    borderColor: "#63D98A",
    borderWidth: 2,
    borderRadius: 20,
    color: "#fff",
  },
  cancleButton: {
    backgroundColor: "#fff",
    borderColor: "#63D98A",
    borderWidth: 2,
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

  modalContainer: {
    flex: 1,
    backgroundColor: "#00000087",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    padding: 20,
    width: 140,
    height: "auto",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "center",
  },

  modalText: {
    flex: 1,
    paddingEnd: 10,
    marginVertical: 8,
    color: "#24408E",
    fontSize: 16,
    fontFamily: "YekanBakhThin",
    textAlign: "right",
  },

  dropDown: {
    padding: 10,
    width: 200,
    minHeight: 100,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
  },
  dropDownText: {
    marginVertical: 5,
    color: "#24408E",
    fontSize: 13,
    fontFamily: "IranYekanLight",
    textAlign: "center",
  },
});

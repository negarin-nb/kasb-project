import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import ModalPicker from "../modalPicker";


export default function IncomeUpdate({ setUpdateModalVisible, item, handleUpdateIncome }) {
  const id = item.id;
  const [incomeTitle, setIncomeTitle] = useState(item.title);
  const [entryDate, setEntryDate] = useState(item.registration_date);
  const [incomeType, setIncomeType] = useState(item.category.name);
  const [incomeTypeList, setIncomeTypeList] = useState([
    "امانی",
    "عمده",
    "نقد",
    "خرده فروشی",
    "آنلاین",
    "آفلاین",
  ]);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [incomeTag, setIncomeTag] = useState("برچسب");
  const [incomeTagList, setIncomeTagList] = useState([
    "اینستاگرام",
    "دیجیکالا",
    "باسلام",
    "بازارچه",
    "کارگاه",
  ]);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState(item.amount.toString());
  const { width } = useWindowDimensions();

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  const handleFinalUpdate = () => {
    changeModalVisibiblity(false, setUpdateModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {/*Income Type*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setTypeModalVisible)}
          style={{ flex: 1 }}
        >
          <Text style={[styles.input]}>{incomeType}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={typeModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setTypeModalVisible)
          }
        >
          <ModalPicker
            addNew={"+ ایجاد نوع درآمد جدید"}
            dataList={incomeTypeList}
            setData={setIncomeType}
            setModalVisible={setTypeModalVisible}
            changeModalVisibiblity={changeModalVisibiblity}
          />
        </Modal>

        <TextInput
          placeholder="تاریخ ثبت"
          placeholderTextColor="#24408E"
          value={entryDate}
          onChangeText={(text) => setEntryDate(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 0.8 }]}
        />

        <TextInput
          placeholder={incomeTitle}
          placeholderTextColor="#24408E"
          value={incomeTitle}
          onChangeText={(text) => setIncomeTitle(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 0.8 }]}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={incomeAmount}
          placeholderTextColor="#24408E"
          value={incomeAmount}
          onChangeText={(text) => setIncomeAmount(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1.5 }]}
        />

        {/*Tag */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setTagModalVisible)}
          style={{ flex: 1.2 }}
        >
          <Text style={styles.input}>{incomeTag}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={tagModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setTagModalVisible)
          }
        >
          <ModalPicker
            addNew={"+ ایجاد برچسب جدید"}
            dataList={incomeTagList}
            setData={setIncomeTag}
            setModalVisible={setTagModalVisible}
            changeModalVisibiblity={changeModalVisibiblity}
          />
        </Modal>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            handleUpdateIncome({
              id,
              incomeTitle,
              entryDate,
              incomeAmount,
              incomeType,
            })
          }
        >
          <Text style={styles.buttonText}>ثبت نهایی</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addButton]}>
          <Image
            style={{ width: 10, height: 10 }}
            source={require("../../../assets/icons/plus.png")}
          />
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    margin: 10,
    width:350,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 1,
    marginTop: 5,
    height: 35,
    alignItems: "center",
    textAlign: "center",
    fontSize: 10,
    fontFamily: "IranYekanRegular",
    color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
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
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: 95,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "YekanBakhMedium",
    color: "#fff",
    textAlign: "center",
  },
});

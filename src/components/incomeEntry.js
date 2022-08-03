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
} from "react-native";
import ModalPicker from "./modalPicker";
import CustomDatePicker from "../util/customDatePicker";

export default function IncomeEntry() {
  const [incomeTitle, setIncomeTitle] = useState();
  const [entryDate, setEntryDate] = useState("تاریخ ثبت");
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [incomeType, setIncomeType] = useState("نوع درآمد");
  const [incomeTypeList, setIncomeTypeList] = useState(["امانی","عمده" , "نقد","خرده فروشی", "آنلاین", "آفلاین"]);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [incomeTag, setIncomeTag] = useState("برچسب");
  const [incomeTagList, setIncomeTagList] = useState(["اینستاگرام", "دیجیکالا", "باسلام", "بازارچه", "کارگاه"]);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState();
  const { width } = useWindowDimensions();
  
  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };
  console.log("here:" + entryDate);
  

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {/*Income Type*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setTypeModalVisible)}
          style={[styles.input, { flex: 1 }]}
        >
          <Text style={[styles.inputText]}>{incomeType}</Text>
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

        {/* Date entry */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setDateModalVisible)}
          style={[styles.input, { flex: 0.8 }]}
        >
          <Text style={[styles.inputText, { fontFamily: "IranYekanRegular", fontSize:12 }]}>
            {entryDate}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={dateModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setDateModalVisible)
          }
        >
          <CustomDatePicker
            setDate={setEntryDate}
            changeModalVisibiblity={changeModalVisibiblity}
            setDateModalVisible={setDateModalVisible}
          />
        </Modal>

        <TextInput
          placeholder="عنوان درآمد"
          placeholderTextColor="#24408E"
          value={incomeTitle}
          onChangeText={(text) => setIncomeTitle(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 0.8 }]}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="مقدار درآمد"
          placeholderTextColor="#24408E"
          value={incomeAmount}
          onChangeText={(text) => setIncomeAmount(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1.5 }]}
        />

        {/*Tag */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setTagModalVisible)}
          style={[styles.input, { flex: 1.2 }]}
        >
          <Text style={styles.inputText}>{incomeTag}</Text>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ثبت نهایی</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addButton]}>
          <Image
            style={{ width: 10, height: 10 }}
            source={require("../../assets/icons/plus.png")}
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
    color:"#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
  inputText:{
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "YekanBakhThin",
    color:"#24408E",
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

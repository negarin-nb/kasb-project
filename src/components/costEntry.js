import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Modal
} from "react-native";
import ModalPicker from "./modalPicker";

export default function CostEntry() {
  const [costTitle, setCostTitle] = useState();
  const [entryDate, setEntryDate] = useState();
  const [costType, setCostType] = useState("نوع هزینه");
  const [costTypeList, setCostTypeList] = useState(["ثابت","عملیاتی"]);
  const [typeModalVisible, setTypeModalVisible] = useState("false");
  const [costTag, setCostTag] = useState();
  const [costAmount, setCostAmount] = useState();

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        

        {/*cost Type*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setTypeModalVisible)}
          style={{flex:1.4}}
        >
          <Text style={styles.input}>{costType}</Text>
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
            dataList={costTypeList}
            setData={setCostType}
            setModalVisible={setTypeModalVisible}
            changeModalVisibiblity={changeModalVisibiblity}
          />
        </Modal>

        <TextInput
          placeholder="عنوان هزینه"
          placeholderTextColor="#24408E"
          value={costTitle}
          onChangeText={(text) => setCostTitle(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 2 }]}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="بازه یادآوری"
          placeholderTextColor="#24408E"
          value={costTag}
          onChangeText={(text) => setIncomeTag(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1 }]}
        />
        <TextInput
          placeholder="تاریخ ثبت"
          placeholderTextColor="#24408E"
          value={entryDate}
          onChangeText={(text) => setEntryDate(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1 }]}
        />
        <TextInput
          placeholder="مقدار هزینه"
          placeholderTextColor="#24408E"
          value={costAmount}
          onChangeText={(text) => setCostAmount(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1.5 }]}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={[styles.button, {}]}>
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
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 1,
    marginTop: 5,
    height: 35,
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    color: "#24408E",
    fontFamily: "YekanBakhThin",
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

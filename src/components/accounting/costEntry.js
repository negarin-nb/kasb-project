import React, { useState, useContext, useEffect } from "react";
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
import ModalPicker from "../modalPicker";
import CustomDatePicker from "../../util/customDatePicker";
import { toEnglish } from "persian";
import { AuthContext } from "../../store/auth-context";
import costApi from "../../api/cost";
import accountingApi from "../../api/accounting";

export default function CostEntry({ updateItem, handleUpdateCost, setModalVisible }) {
  const id = updateItem.id;
  const authCtx = useContext(AuthContext);
  const [costTitle, setCostTitle] = useState();
  const [entryDate, setEntryDate] = useState("تاریخ ثبت");
  const [dateModalVisible, setDateModalVisible] = useState(false); //modal
  const [costType, setCostType] = useState();
  const [costTypeList, setCostTypeList] = useState([]);
  const [typeModalVisible, setTypeModalVisible] = useState(false); //modal
  const [reminderInterval, setReminderInterval] = useState();
  const [costAmount, setCostAmount] = useState("");
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (updateItem.title) {
      setCostTitle(updateItem.title);
      setEntryDate(updateItem.registration_date);
      setCostType(updateItem.category.name);
      setReminderInterval(updateItem.reminder_interval.toString());
      setCostAmount(updateItem.amount.toString());
    }
  }, []);

  const handleCostTypeList = async (text) => {
    if (text.length > 1) {
    const result = await accountingApi.searchCategory(authCtx.accessToken, "cost", text);
    if (!result.ok) console.log("error in getting Cost Category List!");
    else setCostTypeList(result.data.ListItems);
    console.log(result.data.ListItems);
    }
  };

  const reRender = () => {
    setCostTitle("");
    setCostType("نوع هزینه");
    setEntryDate("تاریخ ثبت");
    setReminderInterval("");
    setCostAmount("");
  };

  const handleCostEntry = async () => {
    const costData = {
      title: costTitle,
      category: costType,
      amount: parseInt(toEnglish(costAmount)),
      reminder_interval: reminderInterval,
      registration_date: entryDate,
    };
    console.log(costData);
    //console.log(authCtx.accessToken);
    const result = await costApi.enterCost(authCtx.accessToken, costData);
    console.log(result.data.Message);
    if (!result.ok) alert("ثبت هزینه با خطا مواجه شده است!");
    else {
      alert("هزینه مورد نظر ثبت شد");
      reRender();
    }
  };

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  return (
    <View style={[styles.container, { width: width - 60 }]}>
      <View style={{ flexDirection: "row" }}>
        {/*cost Type*/}
        <TouchableOpacity
          onPress={() => {
            changeModalVisibiblity(true, setTypeModalVisible);
            //handleCostTypeList(); //remove after adding search api
          }}
          style={[styles.input, { flex: 1.4 }]}
        >
          <Text style={styles.inputText}>{costType || "نوع هزینه"}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={typeModalVisible}
        >
          <TouchableOpacity
            style={[styles.modalContainer]}
            onPress={() => {
              setTypeModalVisible(false);
            }}
          >
            <View style={[styles.dropDown]}>
              {/* modal input */}
              <TextInput
                placeholder="نوع هزینه"
                placeholderTextColor="#24408E"
                value={costType}
                onChangeText={(text) => {
                  setCostType(text);
                  handleCostTypeList(text); //it is for search api
                }}
                autoCapitalize="none"
                autoFocus={true}
                style={[styles.input]}
              />
              {/* modal list */}
              {costTypeList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCostType(item.name);
                    setTypeModalVisible(false);
                  }}
                >
                  <Text style={styles.dropDownText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              {/* modal submit button */}
              <TouchableOpacity
                style={[styles.button, { width: 70, alignSelf: "center" }]}
                onPress={() => {
                  setTypeModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>ثبت</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
          value={reminderInterval}
          onChangeText={(text) => setReminderInterval(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1 }]}
        />
        {/* Date entry */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setDateModalVisible)}
          style={[styles.input, { flex: 1 }]}
        >
          <Text
            style={[
              styles.inputText,
              { fontFamily: "IranYekanLight", fontSize: 12 },
            ]}
          >
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
          placeholder="مقدار هزینه"
          placeholderTextColor="#24408E"
          value={costAmount}
          onChangeText={(text) => setCostAmount(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1.5 }]}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {updateItem.title ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleUpdateCost({
                  id,
                  costTitle,
                  entryDate,
                  costAmount,
                  reminderInterval,
                  costType,
                })
              }
            >
              <Text style={styles.buttonText}>به روز رسانی</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.input}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.inputText,{paddingHorizontal:20}]}>بازگشت</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleCostEntry}
          >
            <Text style={styles.buttonText}>ثبت نهایی</Text>
          </TouchableOpacity>
        )}
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
    borderColor: "#24438E30",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000087",
    justifyContent: "center",
    alignItems: "center",
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
  addButton: {
    marginTop: 5,
    marginHorizontal: 2,
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
    marginHorizontal: 2,
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

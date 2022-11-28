import React, { useState, useContext, useEffect } from "react";
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
import ModalPicker from "../modalPicker";
import CustomDatePicker from "../../util/customDatePicker";
import incomeApi from "../../api/income";
import accountingApi from "../../api/accounting";
import { toEnglish } from "persian";
import { AuthContext } from "../../store/auth-context";

export default function IncomeEntry({ updateItem, handleUpdateIncome, setModalVisible }) {
  const id = updateItem.id;
  const authCtx = useContext(AuthContext);
  const [incomeTitle, setIncomeTitle] = useState();
  const [entryDate, setEntryDate] = useState("تاریخ ثبت");
  const [dateModalVisible, setDateModalVisible] = useState(false); //modal
  const [incomeType, setIncomeType] = useState("");
  const [incomeTypeList, setIncomeTypeList] = useState([]);
  const [typeModalVisible, setTypeModalVisible] = useState(false); //modal
  const [incomeTag, setIncomeTag] = useState("برچسب");
  const [incomeTagList, setIncomeTagList] = useState([
    "اینستاگرام",
    "دیجیکالا",
    "باسلام",
    "بازارچه",
    "کارگاه",
  ]);
  const [tagModalVisible, setTagModalVisible] = useState(false); //modal
  const [incomeAmount, setIncomeAmount] = useState();
  const { width } = useWindowDimensions();
  
  useEffect(() => {
    if (updateItem.title) {
      setIncomeTitle(updateItem.title);
      setEntryDate(updateItem.registration_date);
      setIncomeType(updateItem.category.name);
     // setReminderInterval(updateItem.reminder_interval.toString()); it is for tag
      setIncomeAmount(updateItem.amount.toString());
    }
  }, []);

   const handleIncomeTypeList = async (text) => {
     const result = await accountingApi.searchCategory(
       authCtx.accessToken,
       "income",
       text
     );
     if (!result.ok) console.log("error in getting Income Category List!");
     setIncomeTypeList(result.data.ListItems);
     console.log(incomeTypeList);
   };

  const reRender = () => {
    setIncomeTitle("");
    setIncomeType("");
    setEntryDate("تاریخ ثبت");
    setIncomeAmount("");
  };

  const handleIncomeEntry = async () => {
    const incomeData = {
      title: incomeTitle,
      category: incomeType,
      amount: parseInt(toEnglish(incomeAmount)),
      registration_date: entryDate,
    };
    console.log(incomeData);
    //console.log(authCtx.accessToken);
    const result = await incomeApi.enterIncome(authCtx.accessToken, incomeData);
    console.log(result.data.Message);
    if (!result.ok) alert("ثبت درآمد با خطا مواجه شده است!");
    else {
      alert("درآمد مورد نظر ثبت شد");
      reRender();
    }
  };
  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  return (
    <View style={[styles.container, { width: width - 60 }]}>
      <View style={{ flexDirection: "row" }}>
        {/*Income Type*/}
        <TouchableOpacity
          onPress={() => {
            changeModalVisibiblity(true, setTypeModalVisible);
            //handleIncomeTypeList(); //remove after adding search api
          }}
          style={[styles.input, { flex: 1 }]}
        >
          <Text style={[styles.inputText]}>{incomeType || "نوع درآمد"}</Text>
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
                placeholder="نوع درآمد"
                placeholderTextColor="#24408E"
                value={incomeType}
                onChangeText={(text) => {
                  setIncomeType(text);
                  handleIncomeTypeList(text); //it is for search api
                }}
                autoCapitalize="none"
                autoFocus={true}
                style={[styles.input]}
              />
              {/* modal list */}
              {incomeTypeList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setIncomeType(item);
                    setTypeModalVisible(false);
                  }}
                >
                  <Text style={styles.dropDownText}>{item}</Text>
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

        {/* Date entry */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setDateModalVisible)}
          style={[styles.input, { flex: 0.8 }]}
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
        {updateItem.title ? (
          <View style={{ flexDirection: "row" }}>
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
              <Text style={styles.buttonText}>به روز رسانی</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.inputText, { paddingHorizontal: 20 }]}>
                بازگشت
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={[styles.button]} onPress={handleIncomeEntry}>
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
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000087",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
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

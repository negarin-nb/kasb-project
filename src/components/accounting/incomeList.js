import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import IncomeUpdate from "./incomeUpdate";
import ListItem from "./listItem";
import incomeApi from "../../api/income";
import { AuthContext } from "../../store/auth-context";
import { toEnglish } from "persian";
import IncomeEntry from "./incomeEntry";




export default function IncomeList() {
  const authCtx = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [incomesDetail, setIncomesDetail] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateItem, setUpdateItem] = useState([]);
  const [deleteItem, setDeleteItem] = useState();

  useEffect(() => {
    loadIncomes();
  }, []);
  const loadIncomes = async () => {
    const result = await incomeApi.getIncomeList(authCtx.accessToken);
    if (!result.ok) alert(" خطایی در بازیابی درآمدها پیش آمده است!");
    else setIncomesDetail(result.data.ListItems);
    console.log(result.data.Message);
  };

  const handleDeleteModal =  (item) => {
    setDeleteModalVisible(true);
    setDeleteItem(item);
  };

  const handleUpdateModal = (item) => {
    setUpdateModalVisible(true);
    setUpdateItem(item);
  };

  const handleDeleteIncome = async (item) => {
    setDeleteModalVisible(false);
    const result = await incomeApi.deleteIncome(authCtx.accessToken, item.id);
    if (!result.ok) alert("خطایی در حذف درآمد پیش آمده است!");
    else setIncomesDetail(result.data.ListItems);
    console.log(result.data.Message);
    loadIncomes();
  };

  const handleUpdateIncome = async (item) => {
    console.log(item);
    const incomeData = {
      id: item.id,
      title: item.incomeTitle,
      category: item.incomeType,
      amount: parseInt(toEnglish(item.incomeAmount)),
      registration_date: item.entryDate,
    };
    setUpdateModalVisible(false);
    const result = await incomeApi.updateIncome(authCtx.accessToken, incomeData);
    if (!result.ok) alert("خطایی در به روز رسانی درآمد پیش آمده است!");
    else {setIncomesDetail(result.data.ListItems); 
    alert("درآمد با موفقیت به روز رسانی شد!");}
    console.log(result.data.Message);
    loadIncomes();
  };
  
  //Delete Modal Function
  function DeleteItemModal({
    deleteItem,
    modalVisible,
    setModalVisible,
  }) {
    return (
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={[styles.modal, { paddingVertical: 20 }]}>
            <Text style={styles.text}>از حذف این درآمد مطمئن هستید؟</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>خیر</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeleteIncome(deleteItem)}
              >
                <Text style={styles.buttonText}>بله</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  //Update Modal Function
  function UpdateItemModal({
    updateItem,
    modalVisible,
    setModalVisible,
  }) {
    return (
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[styles.modal, { width: width - 40, alignItems: "center" }]}
          >
            <IncomeEntry
              updateItem={updateItem}
              handleUpdateIncome={handleUpdateIncome}
              setModalVisible={setModalVisible}
              style={{ alignItems: "center", alignItems: "center" }}
            />

            {/* <IncomeUpdate
            item={updateItem}
            setUpdateModalVisible={setUpdateModalVisible}
            handleUpdateIncome={handleUpdateIncome}
          /> */}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  // main render
  return (
    <View style={[styles.container]}>
      {/* Income List */}
      <FlatList
        data={incomesDetail}
        renderItem={({ item }) => (
          <ListItem
            handleDeleteModal={handleDeleteModal}
            handleUpdateModal={handleUpdateModal}
            item={item}
          />
        )}
        style={{ width: width - 90 }}
      />
      {/* Delete Modal */}
      <DeleteItemModal
        deleteItem={deleteItem}
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
      />

      {/* Update Modal */}
      <UpdateItemModal
        updateItem={updateItem}
        modalVisible={updateModalVisible}
        setModalVisible={setUpdateModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingEnd: 20,
    paddingStart: 20,
    marginBottom: 20,
  },
  cashWrapperTitle: {
    color: "#fff",
    textAlign: "right",
    fontSize: 20,
    fontFamily: "YekanBakhMedium",
  },
  cashWrapperText: {
    color: "#fff",
    textAlign: "left",
    fontSize: 34,
    fontFamily: "YekanBakhBold",
    marginLeft: 5,
    marginTop: -20,
  },
  cashWrapper: {
    borderRadius: 20,
    height: "auto",
    //justifyContent: "center",
    //alignItems: "center",
    padding: 15,
    paddingTop: 10,
  },
  whiteArea: {
    padding: 10,
    borderRadius: 20,
    height: 180,
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
  },
  whiteAreaTitle: {
    flex: 1,
    textAlign: "right",
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    fontSize: 18,
  },

  modalContainer: {
    backgroundColor: "#00000087",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    paddingTop:10,
    width: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    margin: 8,
    marginHorizontal: 20,
    color: "#24408E",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    textAlign: "center",
  },
  button: {
    marginTop: 5,
    marginHorizontal: 2,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: 70,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#fff",
    textAlign: "center",
  },
});

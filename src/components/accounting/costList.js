import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "./listItem";
import costApi from "../../api/cost";
import { AuthContext } from "../../store/auth-context";
import CostEntry from './costEntry';
import { toEnglish } from 'persian';
import UpdateModal from "./updateModal";

export default function CostList() {
  const authCtx = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [costsDetail, setCostsDetail] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateItem, setUpdateItem] = useState({
      id:"",
      title: "",
      category: "",
      amount: "",
      reminder_interval: "",
      registration_date: "",
    });
  const [deleteItem, setDeleteItem] = useState();

  useEffect(() => {
    loadCost();
  }, []);
  const loadCost = async () => {
    const result = await costApi.getCostList(authCtx.accessToken);
    if (!result.ok) alert("خطایی در بازیابی هزینه‌ها پیش آمده!");
    else setCostsDetail(result.data.ListItems);
    console.log(result.data.Message);
  };

  const handleDeleteModal = (item) => {
    setDeleteModalVisible(true);
    setDeleteItem(item);
  };

  const handleUpdateModal = (item) => {
    setUpdateModalVisible(true);
    setUpdateItem(item);
  };

  const handleDeleteIncome = async (item) => {
    setDeleteModalVisible(false);
    const result = await costApi.deleteCost(authCtx.accessToken, item.id);
    if (!result.ok) alert("خطایی در حذف هزینه پیش آمده است!");
    else {setCostsDetail(result.data.ListItems);
    alert("هزینه با موفقیت حذف شد!");}
    console.log(result.data.Message);
    loadCost();
  };

  const handleUpdateCost = async (item) => {
     console.log(item);
    const costData = {
      id: item.id,
      title: item.costTitle,
      category: item.costType,
      amount: parseInt(toEnglish(item.costAmount)),
      registration_date: item.entryDate,
      reminder_interval : item.reminderInterval,
    };
    setUpdateModalVisible(false);
    const result = await costApi.updateCost(authCtx.accessToken, costData);
    if (!result.ok) alert("خطایی در به روز رسانی هزینه پیش آمده است!");
    else {setCostsDetail(result.data.ListItems)
    alert("هزینه با موفقیت به روز رسانی شد!");};
    console.log(result.data.Message);
    loadCost(); 
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
            <Text style={styles.text}>از حذف این هزینه مطمئن هستید؟</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
          style={[styles.modalContainer]}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[styles.modal, { width: width - 40, alignItems: "center" }]}
          >
            {/* <TouchableOpacity
              style={{
                paddingHorizontal: 5,
                paddingTop: 5,
                alignSelf: "flex-start",
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../../assets/icons/close.png")}
              />
            </TouchableOpacity>
 */}
            <CostEntry
              updateItem={updateItem}
              handleUpdateCost={handleUpdateCost}
              setModalVisible={setUpdateModalVisible}
              style={{ alignItems: "center", alignItems: "center" }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  } 

  //Main render
  return (
    <View style={styles.container}>
      {/* Cost List */}
      <FlatList
        data={costsDetail}
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

      {/* Update Modal */}
      {/* <UpdateModal
        updateItem={updateItem}
        modalVisibe={updateModalVisible}
        setModalVisible={setUpdateModalVisible}
        handleUpdateCost={handleUpdateCost}
        children={() => (
          <CostEntry
            handleUpdateCost={handleUpdateCost}
            updateItem={updateItem}
            style={{ alignItems: "center", alignItems: "center" }}
          />
        )}
      /> */}
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

  modalContainer: {
    backgroundColor: "#00000087",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    paddingTop: 10,
    width: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
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

import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Incomes from "../model/incomes";
import IncomeUpdate from "./incomeUpdate";
import ListItem from "./listItem";
//import Modal from "react-native-modal";

export default function IncomeList() {
  const { width } = useWindowDimensions();
  const [incomesDetail, setIncomesDetail] = useState(Incomes);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateItem, setUpdateItem] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };
  const handleDeleteModal = (item) => {
    changeModalVisibiblity(true, setDeleteModalVisible);
    setDeleteItem(item);
  };
  const handleUpdateModal = (item) => {
    changeModalVisibiblity(true, setUpdateModalVisible);
    setUpdateItem(item);
  };

  function DeleteItemModal({
    deleteItem,
    setModalVisible,
    changeModalVisibiblity,
  }) {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.text}>از حذف این درآمد مطمئن هستید؟</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => changeModalVisibiblity(false, setModalVisible)}
              >
                <Text style={styles.text}>خیر</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeleteModal(deleteItem)}>
                <Text style={styles.text}>بله</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function UpdateItemModal({
    updateItem,
    setModalVisible,
    changeModalVisibiblity,
  }) {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={updateModalVisible}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => changeModalVisibiblity(false, setModalVisible)}
        >
          <IncomeUpdate item={updateItem} />
        </TouchableOpacity>
      </Modal>
    );
  }
    
  return (
    <View style={styles.container}>
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
        setModalVisible={setDeleteModalVisible}
        changeModalVisibiblity={changeModalVisibiblity}
      />

      {/* Update Modal */}
      <UpdateItemModal
        updateItem={updateItem}
        setModalVisible={setUpdateModalVisible}
        changeModalVisibiblity={changeModalVisibiblity}
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
    padding: 20,
    width: 300,
    height: "auto",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    margin: 8,
    color: "#24408E",
    fontSize: 15,
    fontFamily: "YekanBakhThin",
    textAlign: "center",
  },
});

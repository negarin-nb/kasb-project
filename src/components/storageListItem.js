import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  useWindowDimensions,
} from "react-native";
import OrderEntry from "./orderEntry";
import StorageEntry from "./storageEntry";

export default function StorageListItem({ item, handleDeleteItem }) {

  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [returnedModalVisible, setReturnedModalVisible] = useState(false);
  const [wasteModalVisible, setWastedModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleMoreButton = () => {
    console.log("press button");
    changeModalVisibiblity(true ,setMoreModalVisible);
  };
  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  const handleModalButton = (item) => {
    changeModalVisibiblity(false, setMoreModalVisible);
    item.setVisiblity(true);
};

  const dataList = [
    {
      name: "حذف",
      imgSource: require("../../assets/icons/delete.png"),
      handleOnPress: handleDeleteButton,
      visiblity: deleteModalVisible,
      setVisiblity: setDeleteModalVisible,
    },
    {
      name: "ویرایش",
      imgSource: require("../../assets/icons/edit.png"),
      handleOnPress: handleEditButton,
      visiblity: editModalVisible,
      setVisiblity: setEditModalVisible,
    },
    {
      name: "خروج",
      imgSource: require("../../assets/icons/exit.png"),
      handleOnPress: handleExitButton,
      visiblity: exitModalVisible,
      setVisiblity: setExitModalVisible,
    },
    {
      name: "مرجوع",
      imgSource: require("../../assets/icons/returned.png"),
      handleOnPress: handleReturnedButton,
      visiblity: returnedModalVisible,
      setVisiblity: setReturnedModalVisible,
    },
    {
      name: "ضایعات",
      imgSource: require("../../assets/icons/wast.png"),
      handleOnPress: handleWasteButton,
      visiblity: wasteModalVisible,
      setVisiblity: setWastedModalVisible,
    },
  ];

  const handleDeleteButton = (deleteItem) => {
    handleDeleteItem(deleteItem);
    changeModalVisibiblity(false, setMoreModalVisible);

  };
  const handleEditButton = () => {};
  const handleExitButton = () => {};
  const handleReturnedButton = () => {};
  const handleWasteButton = () => {};

  return (
    <View>
      <View style={styles.container}>
        {/*More button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.7 }]}
          onPress={handleMoreButton}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/icons/more.png")}
          />
        </TouchableOpacity>
        {/* More modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={moreModalVisible}
          nRequestClose={() =>
            changeModalVisibiblity(false, setMoreModalVisible)
          }
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              {dataList.map((it, index) => {
                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleModalButton(it)}
                    key={index}
                  >
                    <Text style={styles.text}>{it.name}</Text>
                    <Image style={styles.icon} source={it.imgSource} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>

        {/*Delete modal*/}
        <Modal
          transparent={true}
          animationType="fade"
          visible={dataList[0].visiblity}
          onRequestClose={() =>
            changeModalVisibiblity(false, setMoreModalVisible)
          }
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modal, { width: 300 }]}>
              <Text style={styles.text}>از حذف این آیتم مطمئن هستید؟</Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() => dataList[0].setVisiblity(false)}
                >
                  <Text style={[styles.text]}>خیر</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                  <Text style={[styles.text, { paddingHorizontal: 30 }]}>
                    بله
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/*Edit modal*/}
        <Modal
          transparent={true}
          animationType="fade"
          visible={dataList[1].visiblity}
          onRequestClose={() =>
            changeModalVisibiblity(false, setEditModalVisible)
          }
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modal,
                {
                  padding: 0,
                  paddingTop: 10,
                  width: width - 40,
                },
              ]}
            >
              {/*console.log("item in edit modal")}
              {console.log(item)*/}
              <StorageEntry
                prevItem={item}
                setModalVisible={setEditModalVisible}
                handleCancelModal={() =>
                  changeModalVisibiblity(false, setEditModalVisible)
                }
              />
            </View>
          </View>
        </Modal>

        {/*List item*/}
        <Text style={[styles.item, { flex: 1 }]}>وضعیت</Text>
        <Text style={[styles.item, { flex: 1.4 }]}>{item.expire_date}</Text>
        <Text style={[styles.item, { flex: 1.2 }]}>{item.purchase_price}</Text>
        <Text style={[styles.item, { flex: 1.4, paddingEnd: 2 }]}>
          {item.name}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderBottomColor: "#24408E",
    justifyContent: "space-between",
    alignContent: "flex-end",
  },
  item: {
    fontFamily: "IranYekanRegular",
    fontSize: 11,
    color: "#24408E",
    marginBottom: 6,
    marginTop: 6,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  button: {
    justifyContent: "flex-end",
    marginBottom: 7,
    alignItems: "center",
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
    justifyContent: "flex-end",
  },
  icon: {
    marginVertical: 8,
    marginTop: 13,
    width: 13,
    height: 13,
  },
  text: {
    paddingEnd: 10,
    marginVertical: 8,
    color: "#24408E",
    fontSize: 16,
    fontFamily: "YekanBakhThin",
    textAlign: "center",
  },
});

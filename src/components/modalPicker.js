import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ModalPicker({
  addNew,
  dataList,
  setData,
  setModalVisible,
  changeModalVisibiblity,
}) {
  const onPressItem = (item) => {
    changeModalVisibiblity(false, setModalVisible);
    setData(item);
  };

  const listOption = dataList.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.listOption}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      style={styles.modalContainer}
      onPress={() => changeModalVisibiblity(false, setModalVisible)}
    >
      <View style={[styles.modal]}>
        {addNew ?
        <TouchableOpacity style={styles.listOption}>
          <Text style={styles.text}>{addNew}</Text>
        </TouchableOpacity>
        : null}
        {listOption}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
modalContainer: {
    backgroundColor: "#00000087",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    padding: 20,
    width: 200,
    height: "auto",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  listOption: {
    justifyContent: "center",
  },
  text: {
    margin: 8,
    color: "#24408E",
    fontSize: 15,
    fontFamily: "YekanBakhThin",
    textAlign: "center",
  },
})
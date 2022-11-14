import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
  Image,
} from "react-native";
import CostEntry from './costEntry';

export default function UpdateModal({
  children,
  modalVisible,
  setModalVisible,
  updateItem,
  handleUpdateCost,
}) {
  const { width } = useWindowDimensions();
  const [updateModalVisible, setUpdateModalVisible] = useState(modalVisible);


  return (
    <Modal transparent={true} animationType="fade" visible={updateModalVisible}>
      <TouchableOpacity
        style={[styles.modalContainer]}
        onPress={() => setUpdateModalVisible(false)}
      >
        <View
          style={[styles.modal, { width: width - 40, alignItems: "center" }]}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 5,
              paddingTop: 5,
              alignSelf: "flex-start",
            }}
            onPress={() => {
              setUpdateModalVisible(false);
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../assets/icons/close.png")}
            />
          </TouchableOpacity>

          {children()}

          {/* <CostEntry
            updateItem={updateItem}
            handleUpdateCost={handleUpdateCost}
            style={{ alignItems: "center", alignItems: "center" }}
          /> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
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
    width: 300,
    //height: "auto",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
  },
});


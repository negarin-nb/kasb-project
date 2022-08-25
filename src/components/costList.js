import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getCosts } from "../model/costs";
import ListItem from "./listItem";
import Modal from "react-native-modal";

export default function CostList() {
  const { width } = useWindowDimensions();
  const Costs = getCosts();
  const [costsDetail, setCostsDetail] = useState(Costs);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUdateModalVisible] = useState(false);

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };
  const toggleUpdateModal = () => {
    setIsUdateModalVisible(!isUpdateModalVisible);
  };

  const handleDelete = () =>{
    toggleDeleteModal();
  }
  const handleUpdate = () => {
    toggleUpdateModal();
  };
  return (
    <View style={styles.container}>
      {/* Cost List */}
      <FlatList
        data={costsDetail}
        renderItem={({ item }) => (
          <ListItem
            toggleDeleteModal={toggleDeleteModal}
            toggleUpdateModal={toggleUpdateModal}
            item={item}
          />
        )}
        style={{ width: width - 90 }}
      />
      {/*Delete Modal */}
      <Modal isVisible={isDeleteModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Delete item?</Text>
          <Button title="Hide modal" onPress={handleDelete} />
        </View>
      </Modal>
      {/*Update Modal */}
      <Modal isVisible={isUpdateModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Update item?</Text>
          <Button title="Hide modal" onPress={handleUpdate} />
        </View>
      </Modal>
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
});

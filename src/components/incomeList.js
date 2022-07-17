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
import Incomes from "../model/incomes";
import IncomeListItem from './incomeListItem';
import Modal from "react-native-modal";


export default function IncomeList() {
  const { width } = useWindowDimensions();
  const [incomeDetail, setIncomesDetail] = useState(Incomes);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={incomeDetail}
        renderItem={({ item }) => (
          <IncomeListItem toggleModal={toggleModal} item={item} />
        )}
        style={{ width: width - 90 }}
      />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
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
    marginBottom:20
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

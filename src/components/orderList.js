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
import Orders from "../model/orders";
import OrderListItem from "./orderListItem";
//import Modal from "react-native-modal";

export default function OrderList() {
    const { width } = useWindowDimensions();
    const [orderDetail, setOrderDetail] = useState(Orders);
  return (
    <View style={styles.container}>
      {/* Orsder List */}
      <FlatList
        data={orderDetail}
        renderItem={({ item }) => <OrderListItem item={item} />}
        style={{ width: width - 90 }}
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
})

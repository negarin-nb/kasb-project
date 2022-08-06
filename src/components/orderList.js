import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Orders from "../model/orders";
import OrderListItem from "./orderListItem";
//import Modal from "react-native-modal";

export default function OrderList({navigation}) {
    const { width } = useWindowDimensions();
    const [orderDetail, setOrderDetail] = useState(Orders);
  return (
    <View style={styles.container}>
      {/* Orsder List */}
      <FlatList
        data={orderDetail}
        renderItem={({ item }) => <OrderListItem item={item} navigation={navigation} />}
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

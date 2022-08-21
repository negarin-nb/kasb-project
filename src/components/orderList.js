import React, { useState, useContext, useEffect } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import orderApi from "../api/order";
import Orders from "../model/orders";
import OrderListItem from "./orderListItem";
//import Modal from "react-native-modal";
import { AuthContext } from '../store/auth-context';

export default function OrderList({navigation}) {
   const authCtx= useContext(AuthContext);
    const { width } = useWindowDimensions();
    const [orderList, setOrderList] = useState();
    const [orderDetail, setOrderDetail] = useState(Orders);

    useEffect(() => {loadOrders();} ,[]);
    const loadOrders = async () => {
      const result = await orderApi.getOrderList(authCtx.accessToken);
      if (!result.ok) alert("خطایی در بازیابی سفارش ها پیش آمده!");
      else setOrderList(result.data.ListItems);
      console.log(result.data.Message);
    }
  return (
    <View style={styles.container}>
      {/* Orsder List */}
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <OrderListItem item={item} navigation={navigation} />
        )}
        style={{ width: width - 90 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    padding: 20,
    paddingTop: 5,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#24438E15",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
  },
});

import React, { useState, useReducer } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import ModalPicker from "./modalPicker";
import CustomDatePicker from "../util/customDatePicker";

export default function OrderEntry() {
  
  const [customer, setCustomer] = useState();
  const [entryDate, setEntryDate] = useState("تاریخ ثبت"); //modal
  const [enDateModalVisible, setEnDateModalVisible] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState("تاریخ تحویل"); //modal
  const [delDateModalVisible, setDelDateModalVisible] = useState(false);

  const [deliveryMethod, setDeliveryMethod] = useState("روش تحویل"); //modal
  const [deliveryMethodList, setDeliveryMethodList] = useState(["پیک"]); //list
  const [methodModalVisible, setMethodModalVisible] = useState(false); //visibility

  const [orderStatus, setOrderStatus] = useState([
    "پیش‌پرداخت",
    "نقد",
    "تسویه",
  ]);
//array of order items
  const [orderItems, setOrderItems] = useState([{
    orderName: '',
    number: '',
    unitPrice: '',
    totalPrice: '',
  }]);

  const [order, setOrder] = useState({
    customer: customer,
    entryDate: entryDate,
    deliveryDate: deliveryDate,
    deliveryMethod: deliveryMethod,
    orderItems: orderItems,
    orderStatus: orderStatus,
  });


  const handleOrderName = (text, index) => {
    const _orderItems = [...orderItems];
    _orderItems[index] = { ..._orderItems[index], orderName: text };
    console.log("handleOrderName" )
    console.log(_orderItems);
    setOrderItems(_orderItems);
  };
  const handleNumber = (text, index) => {
    const _orderItems = [...orderItems];
    _orderItems[index] = { ..._orderItems[index], number: text };
    console.log("handleNumber: ");
    console.log(_orderItems);
    setOrderItems(_orderItems);
  };
  const handleUnitPrice = (text, index) => {
    const _orderItems = [...orderItems];
    _orderItems[index] = { ..._orderItems[index], unitPrice: text };
    console.log("handleUnitPrice");
    console.log(_orderItems);
    setOrderItems(_orderItems);
  };
  const handleTotalPrice = (text, index) => {
    const _orderItems = [...orderItems];
    _orderItems[index] = { ..._orderItems[index], totalPrice: text };
    console.log("handleTotalPrice");
    console.log(_orderItems);
    setOrderItems(_orderItems);
  };

  const addFormField = () => {
    console.log(orderItems);
    const _orderItems = [...orderItems];
    _orderItems.push({
      orderName: null,
      number: null,
      unitPrice: null,
      totalPrice: null,
    });
    setOrderItems(_orderItems);
    console.log(orderItems);
  };

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };


  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {/*Delivery Method*/}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setMethodModalVisible)}
          style={[styles.input, { flex: 0.6 }]}
        >
          <Text style={[styles.inputText]}>{deliveryMethod}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={methodModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setMethodModalVisible)
          }
        >
          <ModalPicker
            addNew={"+ ایجاد روش تحویل جدید"}
            dataList={deliveryMethodList}
            setData={setDeliveryMethod}
            setModalVisible={setMethodModalVisible}
            changeModalVisibiblity={changeModalVisibiblity}
          />
        </Modal>

        {/* Delivery date */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setDelDateModalVisible)}
          style={[styles.input, { flex: 1 }]}
        >
          <Text
            style={[
              styles.inputText,
              { fontFamily: "IranYekanLight", fontSize: 11 },
            ]}
          >
            {deliveryDate}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={delDateModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setDelDateModalVisible)
          }
        >
          <CustomDatePicker
            setDate={setDeliveryDate}
            changeModalVisibiblity={changeModalVisibiblity}
            setDateModalVisible={setDelDateModalVisible}
          />
        </Modal>

        {/* Entry date */}
        <TouchableOpacity
          onPress={() => changeModalVisibiblity(true, setEnDateModalVisible)}
          style={[styles.input, { flex: 1 }]}
        >
          <Text
            style={[
              styles.inputText,
              { fontFamily: "IranYekanLight", fontSize: 11 },
            ]}
          >
            {entryDate}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={enDateModalVisible}
          onRequestClose={() =>
            changeModalVisibiblity(false, setEnDateModalVisible)
          }
        >
          <CustomDatePicker
            setDate={setEntryDate}
            changeModalVisibiblity={changeModalVisibiblity}
            setDateModalVisible={setEnDateModalVisible}
          />
        </Modal>

        {/*customer */}
        <TextInput
          placeholder="سفارش دهنده"
          placeholderTextColor="#24408E"
          value={customer}
          onChangeText={(text) => setCustomer(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1.7 }]}
        />
      </View>

      {/*Repeater ***************/}
      {orderItems.map((orderItem, index) => (
        <View style={{ flexDirection: "row" }} key={index}>
          {/*TotalPrice */}
          <TextInput
            placeholder="بهای کل"
            placeholderTextColor="#24408E"
            value={orderItem.totalPrice}
            onChangeText={(text) => {
              handleTotalPrice(text, index);
            }}
            autoCapitalize="none"
            style={[styles.input, { flex: 1 }]}
          />
          {/*َUnitPrice */}
          <TextInput
            placeholder="فی"
            placeholderTextColor="#24408E"
            value={orderItem.unitPrice}
            onChangeText={(text) => {
              handleUnitPrice(text, index);
            }}
            autoCapitalize="none"
            style={[styles.input, { flex: 1 }]}
          />
          {/*Number */}
          <TextInput
            placeholder="تعداد"
            placeholderTextColor="#24408E"
            value={orderItem.number}
            onChangeText={(text) => {
              handleNumber(text, index);
            }}
            autoCapitalize="none"
            style={[styles.input, { flex: 0.6 }]}
          />
          {/*OrderName */}
          <TextInput
            placeholder="سفارش"
            placeholderTextColor="#24408E"
            value={orderItem.orderName}
            onChangeText={(text) => {
              handleOrderName(text, index);
            }}
            autoCapitalize="none"
            style={[styles.input, { flex: 1.7 }]}
          />
        </View>
      ))}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ثبت سفارش</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addButton]} onPress={addFormField}>
          <Image
            style={{ width: 10, height: 10 }}
            source={require("../../assets/icons/plus.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    paddingTop: 5,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#24438E15",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginHorizontal: 1,
    marginTop: 4,
    height: 35,
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
  inputText: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
  },
  addButton: {
    marginHorizontal: 2,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    alignItems: "flex-end",
  },
  button: {
    marginHorizontal: 2,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: 95,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "YekanBakhMedium",
    color: "#fff",
    textAlign: "center",
  },
});

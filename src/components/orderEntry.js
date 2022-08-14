import React, { useState, useEffect } from "react";
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

export default function OrderEntry({prevOrder}) {
  
  const [customer, setCustomer] = useState(prevOrder.customer);
  const [entryDate, setEntryDate] = useState(prevOrder.entryDate || "تاریخ ثبت"); //modal
  const [enDateModalVisible, setEnDateModalVisible] = useState(false); //visibility

  const [deliveryDate, setDeliveryDate] = useState(prevOrder.deliveryDate || "تاریخ تحویل"); //modal
  const [delDateModalVisible, setDelDateModalVisible] = useState(false); //visibility

  const [deliveryMethod, setDeliveryMethod] = useState( prevOrder.deliveryMethod || "روش"); //modal
  const [deliveryMethodList, setDeliveryMethodList] = useState(["پیک" , 'پست']); //list
  const [methodModalVisible, setMethodModalVisible] = useState(false); //visibility

  const [orderStatus, setOrderStatus] = useState( prevOrder.orderStatus || [
    "پیش‌پرداخت",
    "نقد",
    "تسویه",
  ]);
//array of order items
  const [orderItems, setOrderItems] = useState(
    prevOrder.orderItems || [
      {
        orderName:  "",
        number: "",
        unitPrice: "",
        totalPrice: "",
      },
    ]
  );

  const [order, setOrder] = useState( prevOrder || {
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
    console.log( parseInt(prevOrder.orderItems.number));
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

  useEffect(() => {
    if (prevOrder) {
      order == prevOrder;
      orderItems == prevOrder.orderItems;
    }
  }, [prevOrder]);
    
  return (
    <View style={styles.container}>
      {/*Order title*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../../assets/icons/order.png")}
        />
        <Text style={styles.title}>سفارش ۰۱۰۳۲۲۰۱</Text>
      </View>

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
          style={[styles.input, { flex: 0.8 }]}
        >
          <Text
            style={[
              styles.inputText,
              { fontFamily: "IranYekanLight", fontSize: 12 },
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
          style={[styles.input, { flex: 0.8 }]}
        >
          <Text
            style={[
              styles.inputText,
              { fontFamily: "IranYekanLight", fontSize: 12 },
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
          style={[styles.input, { flex: 1 }]}
        />
      </View>

      {/*Repeater field ***************/}
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
        {prevOrder.customer ? (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> به روزرسانی سفارش</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ثبت سفارش</Text>
          </TouchableOpacity>
        )}

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
    borderWidth: 2,
    borderColor: "#24438E15",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 8,
    marginTop: 0,
  },
  input: {
    marginTop: 8,
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginHorizontal: 1,
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
    fontSize: 12,
    fontFamily: "IranYekanLight",
    color: "#24408E",
  },
  addButton: {
    marginHorizontal: 4,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    alignItems: "flex-end",
  },
  button: {
    marginHorizontal: 4,
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 15,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: "auto",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    textAlign: "center",
  },
  title: {
    color: "#24408E",
    textAlign: "right",
    fontSize: 16,
    fontFamily: "IranYekanBold",
    
  },
});

import React, { useState, useEffect, useContext, useRef } from "react";
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
import searchApi from "../api/search";
import { AuthContext } from "../store/auth-context";
import orderApi from "../api/order";

export default function OrderEntry({prevOrder}) {
  const authCtx = useContext(AuthContext);
  const [customer, setCustomer] = useState(prevOrder.customer);
  const [entryDate, setEntryDate] = useState(prevOrder.registration_date || "تاریخ ثبت"); //modal
  const [enDateModalVisible, setEnDateModalVisible] = useState(false); //visibility

  const [deliveryDate, setDeliveryDate] = useState(prevOrder.delivery_date || "تاریخ تحویل"); //modal
  const [delDateModalVisible, setDelDateModalVisible] = useState(false); //visibility

  const [deliveryMethod, setDeliveryMethod] = useState( prevOrder.delivery_type || "روش"); //modal
  const [deliveryMethodList, setDeliveryMethodList] = useState(["پیک" , 'پست']); //list
  const [methodModalVisible, setMethodModalVisible] = useState(false); //visibility

  const [orderStatus, setOrderStatus] = useState( prevOrder.payment_type || "نحوه پرداخت");
  const [orderStatusList, setOrderStatusList] = useState(["نقد", "تسویه"]);
  const [prepaid, setPrepaid] = useState(prevOrder.prepaid || "پیش‌پرداخت");

  const [suggestions, setSuggestions] = useState([]);
  const [custSuggestions, setCustSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState([false]);
  const [custSuggestionsVisible, setCustSuggestionsVisible] = useState(false);
//array of order items
  const [orderItems, setOrderItems] = useState(
    prevOrder.items || [
      {
        orderName: "",
        number: "",
        unitPrice: "",
        totalPrice: "",
      },
    ]
  );

  const finalOrderItems = [];
  orderItems.map((item) =>
    finalOrderItems.push({
      item_name: item.orderName,
      count: parseInt(item.number),
      selling_price: parseInt(item.unitPrice),
      total_price: parseInt(item.totalPrice),
    })
  );

  console.log("finalOrderItems");
  console.log(finalOrderItems);

  //order.items = [...orderItems];
  const order = {
    customer_name: customer,
    registration_date: entryDate,
    delivery_date: deliveryDate,
    delivery_type: deliveryMethodList.indexOf(deliveryMethod),
    items: finalOrderItems,
    /*items: [{
            item_name: "کالا 1",
            count: 5,
            selling_price: 10000,
            total_price: 50000
        }],*/
    payment_type: 1, //orderStatusList.indexOf(orderStatus),
    prepaid: 1000,
  };

   console.log("items");
  console.log(order.items);

  const order2 = {
    customer_name: "مشتری1",
    registration_date: "1401/03/26",
    delivery_date: "1401/03/29",
    delivery_type: 1,
    payment_type: 1,
    prepaid: 10000,
    items: [
        {
            "item_name": "کالا 1",
            "count": 5,
            "selling_price": 10000,
            "total_price": 50000
        }]
      }

  

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };
  const changSuggestionsVisibility = (index, bool) => {
    const _suggestionsVisible = [...suggestionsVisible];
    _suggestionsVisible[index] = bool;
    setSuggestionsVisible(_suggestionsVisible);
}

  const handleOnChangeItem = (text, index) => {
    handleAutoCompleteItem(text);
    handleOrderName (text, index);
  }
  
  const handleAutoCompleteItem = async (text) => {
   if (text.length >1){
   const result = await searchApi.searchItem(authCtx.accessToken, text);
   if(!result.ok) console.log("error in autocomplete search item api!");
   setSuggestions(result.data.ListItems);
  }
  }
  const handleAutoCompleCustomer = async (text) => {
    if (text.length > 1) {
      const result = await searchApi.searchCustomer(authCtx.accessToken, text);
      if (!result.ok) console.log("error in autocomplete search customer api!");
      setCustSuggestions(result.data.ListItems);
    }
  };
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
    const _orderItems = [...orderItems];
    _orderItems.push({
      orderName: null,
      number: null,
      unitPrice: null,
      totalPrice: null,
    });
    setOrderItems(_orderItems);

    const _suggestionsVisible = [...suggestionsVisible];
    _suggestionsVisible.push(false);
    setSuggestionsVisible(_suggestionsVisible);

    console.log("add: "+ orderItems);
  };

  const removeFormField = () => {
    if(orderItems.length > 1){
      const _orderItems = [...orderItems];
      _orderItems.pop();
      setOrderItems(_orderItems);
      console.log("remove: " + orderItems);
    }
  }
  
 const handleCreateOrder = async () => {
  const result = await orderApi.createOrder(authCtx.accessToken, order);
  if (!result.ok) alert("خطایی در زمان ثبت سفارش پیش آمده است!");
  else alert("سفارش با موفقیت ثبت شد"); 
  console.log(result.data.Message);
}

 const handleEditOrder = async () => {
  const result = await orderApi.editOrder(authCtx.accessToken, order);
  if (!result.ok) alert("خطایی در زمان به رززرسانی سفارش پیش آمده است!");
  else alert("سفارش با موفقیت به روزرسانی شد!"); 
  console.log(result.data.Message);
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
        <Text style={styles.title}>
          {prevOrder.id ? `${prevOrder.id} سفارش` : "سفارش جدید"}
        </Text>
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

        <TouchableOpacity
          onPress={() =>
            changeModalVisibiblity(true, setCustSuggestionsVisible)
          }
          style={[styles.input, { flex: 1 }]}
        >
          <Text style={styles.inputText}>{customer || "سفارش‌دهنده"}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={custSuggestionsVisible}
        >
          <TouchableOpacity
            style={[styles.modalContainer]}
            onPress={() => setCustSuggestionsVisible(false)}
          >
            <View style={[styles.dropDown]}>
              <TextInput
                placeholder="جستجو..."
                placeholderTextColor="#24408E"
                value={customer}
                onChangeText={(text) => {
                  handleAutoCompleCustomer(text);
                  setCustomer(text);
                  setCustSuggestionsVisible(true);
                }}
                autoCapitalize="none"
                autoFocus={true}
                style={[styles.input]}
              />
              {custSuggestions.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    handleAutoCompleCustomer(item);
                    setCustomer(item);
                    console.log(order);
                    setCustSuggestionsVisible(false);
                  }}
                >
                  <Text style={styles.dropDownText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
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
          <TouchableOpacity
            onPress={() => {
              changSuggestionsVisibility(index, true);
            }}
            style={[styles.input, { flex: 1.7 }]}
          >
            <Text style={styles.inputText}>
              {orderItem.orderName || "سفارش"}
            </Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="fade"
            visible={suggestionsVisible[index]}
          >
            <TouchableOpacity
              style={[styles.modalContainer]}
              onPress={() => {
                changSuggestionsVisibility(index, false);
              }}
            >
              <View style={[styles.dropDown]}>
                <TextInput
                  placeholder="جستجو..."
                  placeholderTextColor="#24408E"
                  value={orderItem.orderName}
                  onChangeText={(text) => {
                    handleOnChangeItem(text, index);
                    //setSuggestionsVisible(true);
                  }}
                  autoCapitalize="none"
                  autoFocus={true}
                  style={[styles.input]}
                />
                {suggestions.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      handleOnChangeItem(item, index);
                      changSuggestionsVisibility(index, false);
                    }}
                  >
                    <Text style={styles.dropDownText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      ))}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {prevOrder.customer ? (
          <TouchableOpacity style={styles.button} onPress={handleEditOrder}>
            <Text style={styles.buttonText}> به روزرسانی سفارش</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleCreateOrder}>
            <Text style={styles.buttonText}>ثبت سفارش</Text>
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.addButton]}
            onPress={removeFormField}
          >
            <Image
              style={{ width: 10, height: 0.8 }}
              source={require("../../assets/icons/minuse.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addButton]} onPress={addFormField}>
            <Image
              style={{ width: 10, height: 10 }}
              source={require("../../assets/icons/plus.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
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
    marginHorizontal: 3,
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
    justifyContent:"center"
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000087",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    padding: 10,
    width: 200,
    minHeight: 100,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#24438E40",
    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
  },
  dropDownText: {
    marginVertical: 5,
    color: "#24408E",
    fontSize: 13,
    fontFamily: "IranYekanLight",
    textAlign: "center",
  },
});

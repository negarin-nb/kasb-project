import React, { useState, useEffect, useContext, useRef } from "react";
import { toEnglish } from "persian";
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
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import getHtmlTemplate from '../model/invoiceTemplate';


export default function OrderEntry({prevOrder}) {
  const authCtx = useContext(AuthContext);
  const [customer, setCustomer] = useState();
  const [entryDate, setEntryDate] = useState(prevOrder.registration_date || "تاریخ ثبت"); //modal
  const [enDateModalVisible, setEnDateModalVisible] = useState(false); //visibility

  const [deliveryDate, setDeliveryDate] = useState(prevOrder.delivery_date || "تاریخ تحویل"); //modal
  const [delDateModalVisible, setDelDateModalVisible] = useState(false); //visibility
  //const deliveryMethodList = ["پیک", "پست"];
  const [deliveryMethodList, setDeliveryMethodList] = useState(["پیک" , 'پست']); //list
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethodList[prevOrder.delivery_type] || "روش"); //modal
  const [methodModalVisible, setMethodModalVisible] = useState(false); //visibility

  const [orderStatus, setOrderStatus] = useState( prevOrder.payment_type || "نحوه پرداخت");
  const [orderStatusList, setOrderStatusList] = useState(["چک", "نقد"]);
  const [prepaid, setPrepaid] = useState();

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState([false]);
  const [custSuggestions, setCustSuggestions] = useState([]);
  const [custSuggestionsVisible, setCustSuggestionsVisible] = useState(false);
//array of order items
  const [orderItems, setOrderItems] = useState(
   [
      {
        orderName: "",
        number: "",
        unitPrice: "",
        totalPrice: "",
      },
    ]
  );
 //prepair order to create
  const finalOrderItems = [];
  orderItems.map((item) =>
    finalOrderItems.push({
      item_name: item.orderName,
      count: parseInt(item.number),
      selling_price: parseInt(item.unitPrice),
      total_price: parseInt(item.totalPrice),
    })
  );
 // console.log("finalOrderItems");
  //console.log(finalOrderItems);
  const order = {
    customer_name: customer,
    registration_date: entryDate,
    delivery_date: deliveryDate,
    delivery_type: deliveryMethodList.indexOf(deliveryMethod),
    order_items: finalOrderItems,
    payment_type: 1, //orderStatusList.indexOf(orderStatus),
    prepaid: prepaid,
  };
  //console.log("items");
  //onsole.log(order.order_items);

  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };
  const changSuggestionsVisibility = (index, bool) => {
    const _suggestionsVisible = [...suggestionsVisible];
    _suggestionsVisible[index] = bool;
   // _suggestionsVisible.map((index) => console.log(_suggestionsVisible[index]))
    //console.log(_suggestionsVisible[index-1]);
    //console.log(_suggestionsVisible[index]);
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
    _orderItems[index] = { ..._orderItems[index], number: toEnglish(text) };
    console.log("handleNumber: ");
    console.log(_orderItems);
    setOrderItems(_orderItems);
  };
  const handleUnitPrice = (text, index) => {
    const _orderItems = [...orderItems];
    _orderItems[index] = { ..._orderItems[index], unitPrice: toEnglish(text) };
    console.log("handleUnitPrice");
    console.log(_orderItems);
    setOrderItems(_orderItems);
  };
  const handleTotalPrice = (text, index) => {
    const _orderItems = [...orderItems];
    _orderItems[index] = { ..._orderItems[index], totalPrice: toEnglish(text) };
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
   // console.log("add: "+ orderItems);
  };

  const removeFormField = () => {
    if(orderItems.length > 1){
      const _orderItems = [...orderItems];
      _orderItems.pop();
      setOrderItems(_orderItems);
      //console.log("remove: " + orderItems);
    }
  }
 const handleCreateOrder = async () => {
    const result = await orderApi.createOrder(authCtx.accessToken, order);
    if (
      !result.ok &&
      result.data.Message === "Item matching query does not exist.")
      alert("آیتم مورد نظر در انبار ثبت نشده است!");
    else if (!result.ok) alert("خطایی در زمان ثبت سفارش پیش آمده است!");
    else alert("سفارش با موفقیت ثبت شد"); 
    console.log(result.data.Message);
}
 const handleEditOrder = async () => {
    const _order = { ...order, id: prevOrder.id, final_approval: prevOrder.final_approval };
    console.log('_order');
    console.log(_order);
    const result = await orderApi.editOrder(authCtx.accessToken, _order);
    if (!result.ok && result.data.Message === "the delivery_date has passed!")
      alert("تاریخ تحویل گذشته است!");
    else if (!result.ok)
      alert("خطایی در زمان به روز رسانی سفارش پیش آمده است!");
    else alert("سفارش با موفقیت به روز رسانی شد!"); 
    console.log(result.data.Message);
 }
 const handleFinalApprove = async () => {
    const _order = { ...order, id: prevOrder.id, final_approval: true };
    const result = await orderApi.editOrder(authCtx.accessToken, _order);
    if (!result.ok) alert("خطایی در زمان نهایی کردن سفارش پیش آمده است!");
    else alert("سفارش با موفقیت به نهایی شد.!"); 
    console.log(result.data.Message);
 }
  const handleProFormaInvoice = async () => {
     const html = getHtmlTemplate(prevOrder);
     const { uri } = await Print.printToFileAsync({
       html: html,
     }); 
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  }

  useEffect(() => {
    if (prevOrder.order_items) {
      const _orderItems = [];
      prevOrder.order_items.map((item) =>
        _orderItems.push({
          orderName: item.name,
          number: item.count.toString(),
          unitPrice: item.selling_price.toString(),
          totalPrice: item.total_price.toString(),
        })
      );
      setOrderItems(_orderItems);
      setCustomer(prevOrder.customer.full_name);
      setPrepaid(prevOrder.prepaid.toString());
      
      const _suggestionsVisible = [...suggestionsVisible];
      _suggestionsVisible.push(false);
      setSuggestionsVisible(_suggestionsVisible);
      
      
    }
  }, [prevOrder]);
    
  return (
    <View tyle={styles.container}>
      <View style={styles.whiteWrapper}>
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
            {prevOrder.id ? `سفارش ${prevOrder.id}` : "سفارش جدید"}
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
                        //changSuggestionsVisibility(index+1, false);
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
          <View
            style={[
              styles.input,
              {
                flexDirection: "row",
                flex: 0.7,
                justifyContent: "center",
                paddingHorizontal: 4,
              },
            ]}
          >
            <TextInput
              placeholder="............"
              placeholderTextColor="#24408E"
              value={prepaid}
              onChangeText={(text) => {
                setPrepaid(text);
              }}
              autoCapitalize="none"
              style={[styles.inputText]}
            />
            <Text style={[styles.inputText, { marginStart: 5 }]}>
              پیش‌پرداخت
            </Text>
            <TouchableOpacity>
              <Text style={[styles.inputText, { marginStart: 10 }]}>
                {orderStatusList[orderStatus] || "تسویه"}{" "}
              </Text>
            </TouchableOpacity>
          </View>

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
        </View>
      </View>

      {/* tow last buttons */}
      {prevOrder.customer ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingBottom: 10,
            paddingEnd: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.whiteButton]}
            onPress={handleFinalApprove}
          >
            <Text style={[styles.buttonText, { fontSize: 14 }]}>
              ثبت فاکتور نهایی
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.whiteButton]}>
            <Image
              style={{ width: 19, height: 19 }}
              source={require("../../assets/icons/invoiceSend.png")}
            />
            <Text
              style={[styles.buttonText, { fontSize: 14, paddingStart: 5 }]}
              onPress={handleProFormaInvoice}
            >
              ارسال پیش‌فاکتور
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  whiteWrapper: {
    flexDirection: "column",
    padding: 5,
    paddingTop: 5,
    borderWidth: 2,
    borderColor: "#24438E15",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
    marginTop: 0,
  },
  input: {
    marginTop: 8,
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginHorizontal: 2,
    height: 32,
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
    // marginTop: 2,
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
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 4,
    marginTop: 5,
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
  whiteButton: {
    marginTop: 0,
    flexDirection: "row",
    width: 120,
    justifyContent: "center",
    paddingHorizontal: 4,
    marginHorizontal: 2,
    height: 25,
    paddingVertical: 1,
    borderWidth: 2,
    borderColor: "#24438E10",
    backgroundColor: "#FFFFFFC2",
    borderRadius: 20,
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

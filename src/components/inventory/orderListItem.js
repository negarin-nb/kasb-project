
import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, screen, listTitle  } from "react-native";
import orderApi from "../../api/order";
import { AuthContext } from "../../store/auth-context";
import OrderEntry from './orderEntry';

export default function OrderListItem({item , navigation, screen, listTitle}) {

const [deliveryMethodList, setDeliveryMethodList] = useState(["پیک", "پست"]); 
const authCtx = useContext(AuthContext);

const handleMoreButton = async () => {

    console.log("press button");
    console.log(item.id);
    const result = await orderApi.getOrderDetail(authCtx.accessToken, item.id);
    if (!result.ok) alert("خطایی در زمان دریافت جزئیات سفارش رخ داده است!");
    else{
      console.log(result.data.Message); 
      const data = result.data.Item; 
      console.log(data);
      navigation.navigate(screen, data);
    } 
     
};
 return (
   <View>
     <View style={styles.container}>
       {/*Update button*/}
       <TouchableOpacity
         style={[styles.button, { flex: 0.5 }]}
         onPress={() => handleMoreButton()}
       >
         <Image
           style={{ width: 15, height: 15 }}
           source={require("../../../assets/icons/more.png")}
         />
       </TouchableOpacity>

       {/*List item*/}
       <Text style={[styles.item, { flex: 1 }]}>{deliveryMethodList[item.delivery_type]}</Text>
       <Text style={[styles.item, { flex: 1.4 }]}>{item.delivery_date}</Text>
       <Text style={[styles.item, { flex: 2, paddingEnd: 2 }]}>
         {listTitle} {item.id}
       </Text>
     </View>
   </View>
 );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderBottomColor: "#24408E",
    justifyContent: "space-between",
    // alignContent: "flex-end",
  },
  item: {
    fontFamily: "IranYekanRegular",
    fontSize: 11,
    color: "#24408E",
    marginBottom: 6,
    marginTop: 6,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  button: {
    flex: 0.7,
    justifyContent: "flex-end",
    marginBottom: 10,
    alignItems: "center",
  },
});

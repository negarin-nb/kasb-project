
import React, {useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import orderApi from "../api/order";
import { AuthContext } from "../store/auth-context";
import OrderEntry from './orderEntry';

export default function OrderListItem({item , navigation}) {

  const authCtx = useContext(AuthContext);

const handleMoreButton = async () => {

    console.log("press button");
    console.log(item.id);
    const result = await orderApi.getOrderDetail(authCtx.accessToken, item.id);
    if (!result.ok) alert("خطایی در زمان دریافت جزئیات سفارش رخ داده است!");
    else{
      const data = result.data.Item; 
      navigation.navigate("OrderDetailScreen", data);
    } 
    console.log(data);  
    console.log(result.data.Message);  
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
           source={require("../../assets/icons/more.png")}
         />
       </TouchableOpacity>

       {/*List item*/}
       <Text style={[styles.item, { flex: 1 }]}>{item.delivery_type}</Text>
       <Text style={[styles.item, { flex: 1.4 }]}>{item.delivery_date}</Text>
       <Text style={[styles.item, { flex: 2, paddingEnd: 2 }]}>
         سفارش {item.id}
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

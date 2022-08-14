import React, { useState, useContext, useEffect } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import storage from "../api/storage";
import { AuthContext } from "../store/auth-context";
import StorageListItem from "./storageListItem";

export default function StorageList() {
  
  const { width } = useWindowDimensions();
  const [itemsDetail, setItemsDetail] = useState([]);
  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  
  useEffect (()=>{fetchItemsDetail()},[]);

  const fetchItemsDetail = async () =>{
    const result = await storage.getItems(authCtx.accessToken);
    if (result.ok){
        setItemsDetail(result.data.ListItems);
        console.log(result.data.Message);
    }
  };
  const changeModalVisibiblity = (bool, setModalVisible) => {
    setModalVisible(bool);
  };

  return (
    <View style={styles.container}>
      {/* Items List */}
      <FlatList
        data={itemsDetail}
        renderItem={({ item }) => <StorageListItem item={item} />}
        style={{ width: width - 90 }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flexDirection: "column",
    alignItems: "center",
   // paddingEnd: 20,
    //paddingStart: 20,
    //marginBottom: 20,
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

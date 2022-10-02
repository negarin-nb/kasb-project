import React, { useState, useContext, useEffect } from "react";
import { View, useWindowDimensions, StyleSheet, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import storageApi from "../../api/storage";
import { AuthContext } from "../../store/auth-context";
import StorageListItem from "./storageListItem";

export default function StorageList() {
  
  const { width } = useWindowDimensions();
  const [itemsDetail, setItemsDetail] = useState([]);
 
  const authCtx = useContext(AuthContext);
  
  useEffect (()=>{fetchItemsDetail()},[]);

  const fetchItemsDetail = async () =>{
    const result = await storageApi.getItems(authCtx.accessToken);
    if (result.ok){
        setItemsDetail(result.data.ListItems);
        console.log(result.data.Message);
    }
  };

  const handleDeleteItem = async (deleteItem) => {
    console.log(deleteItem);
    setItemsDetail(itemsDetail.filter((item) => item !== deleteItem));
    const result = await storageApi.deleteItem(authCtx.accessToken, deleteItem.id);
    if (result.ok){
        console.log(result.data.Message);
        return true;
    }
  }

  return (
    <View style={styles.container}>
      {/* Items List */}
      <FlatList
        data={itemsDetail}
        renderItem={({ item }) => <StorageListItem item={item} handleDeleteItem = {handleDeleteItem} />}
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

import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,Button } from "react-native";


export default function ListItem({ item, toggleDeleteModal, toggleUpdateModal }) {
  return (
    <View>
      <View style={styles.container}>
        {/*Delete button*/}
        <TouchableOpacity style={styles.bottom} onPress={toggleDeleteModal}>
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/icons/delete.png")}
          />
        </TouchableOpacity>

        {/*Update button*/}
        <TouchableOpacity style={styles.bottom} onPress={toggleUpdateModal}>
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/icons/update.png")}
          />
        </TouchableOpacity>
        <Text style={[styles.item, { flex: 1 }]}>{item.price}</Text>
        <Text style={[styles.item, { flex: 2 }]}>{item.method}</Text>
        <Text style={[styles.item, { flex: 2 }]}>{item.date}</Text>
        <Text style={[styles.item, { flex: 2.5, paddingEnd: 5 }]}>
          {item.product} {item.id}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderBottomColor: "white",
    justifyContent: "space-between",
    alignContent: "flex-end",
  },
  item: {
    fontFamily: "YekanBakhMedium",
    color: "white",
    marginBottom: 6,
    marginTop: 6,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  bottom: {
    flex: 0.7,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

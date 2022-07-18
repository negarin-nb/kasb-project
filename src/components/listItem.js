import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,Button } from "react-native";


export default function ListItem({ item, toggleDeleteModal, toggleUpdateModal }) {
  return (
    <View>
      <View style={styles.container}>
        {/*Delete button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.5 }]}
          onPress={toggleDeleteModal}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/icons/delete.png")}
          />
        </TouchableOpacity>

        {/*Update button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.5 }]}
          onPress={toggleUpdateModal}
        >
          <Image
            style={{ width: 15, height: 15}}
            source={require("../../assets/icons/update.png")}
          />
        </TouchableOpacity>
        <Text style={[styles.item, { flex: 1 }]}>{item.price}</Text>
        <Text style={[styles.item, { flex: 1.2 }]}>{item.method}</Text>
        <Text style={[styles.item, { flex: 1.4 }]}>{item.date}</Text>
        <Text style={[styles.item, { flex: 2.7, paddingEnd: 2 }]}>
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
    fontFamily: "IranYekan",
    fontSize:12,
    color: "white",
    marginBottom: 6,
    marginTop: 6,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  button: {
    flex: 0.7,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

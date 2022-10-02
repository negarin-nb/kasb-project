import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function ListItem({
  item,
  handleDeleteModal,
  handleUpdateModal,
}) {
  return (
    <View>
      <View style={styles.container}>
        {/*Delete button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.5 }]}
          onPress={() => handleDeleteModal(item)}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../../assets/icons/delete.png")}
          />
        </TouchableOpacity>

        {/*Update button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.6 }]}
          onPress={() => handleUpdateModal(item)}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../../assets/icons/update.png")}
          />
        </TouchableOpacity>

        {/*List item*/}
        <Text style={[styles.item, { flex: 1, textAlign: "left" }]}>
          {item.price}
        </Text>
        <Text style={[styles.item, { flex: 1.2 }]}>{item.method}</Text>
        <Text style={[styles.item, { flex: 1.4 }]}>{item.date}</Text>
        <Text style={[styles.item, { flex: 2.5, paddingEnd: 2 }]}>
          {item.product} {item.id}
        </Text>

        {/*Update Modal */}
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
    fontFamily: "IranYekanRegular",
    fontSize:11,
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
  modalContainer: {
    backgroundColor: "#00000020",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    padding: 20,
    width: 300,
    height: "auto",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#24438E20",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignContent:"center",
    alignItems:'center'

  },

  text: {
    margin: 8,
    color: "#24408E",
    fontSize: 15,
    fontFamily: "YekanBakhThin",
    textAlign: "center",
  },

});

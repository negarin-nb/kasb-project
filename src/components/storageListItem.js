import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import OrderEntry from "./orderEntry";

export default function StorageListItem({ item }) {
  const handleMoreButton = () => {
    console.log("press button");
  };
  return (
    <View>
      <View style={styles.container}>
        {/*Update button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.7 }]}
          onPress={() => handleMoreButton}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/icons/more.png")}
          />
        </TouchableOpacity>

        {/*List item*/}
        <Text style={[styles.item, { flex: 1 }]}>وضعیت</Text>
        <Text style={[styles.item, { flex: 1.4 }]}>{item.expire_date}</Text>
        <Text style={[styles.item, { flex: 1.2 }]}>{item.purchase_price}</Text>
        <Text style={[styles.item, { flex: 1.4, paddingEnd: 2 }]}>
          {item.name}
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
    //alignContent: "flex-end",
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
    justifyContent: "flex-end",
    marginBottom: 7,
    alignItems: "center",
  },
});

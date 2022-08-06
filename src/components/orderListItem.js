
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function OrderListItem({
  item,
}) {
  return (
    <View>
      <View style={styles.container}>
        {/*Update button*/}
        <TouchableOpacity
          style={[styles.button, { flex: 0.6 }]}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/icons/more.png")}
          />
        </TouchableOpacity>

        {/*List item*/}
        <Text style={[styles.item, { flex: 1.2 }]}>{item.deliveryMethod}</Text>
        <Text style={[styles.item, { flex: 1.4 }]}>{item.deliveryDate}</Text>
        <Text style={[styles.item, { flex: 2.5, paddingEnd: 2 }]}>سفارش {item.id}</Text>
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
    fontSize: 11,
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
  text: {
    margin: 8,
    color: "#24408E",
    fontSize: 15,
    fontFamily: "YekanBakhThin",
    textAlign: "center",
  },
});

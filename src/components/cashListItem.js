import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CashListItem({ item }) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.item, { flex: 1 }]}>{item.price}</Text>
        <Text style={[styles.item, { flex: 2 }]}>{item.method}</Text>
        <Text style={[styles.item, { flex: 2}]}>
          {item.date}
        </Text>
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
    borderBottomColor: "",
    justifyContent: "space-between",
    alignContent: "flex-end",
   // marginBottom: 10,
  },
  item: {
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    marginBottom: 6,
    marginTop: 6,
    textAlign: "right",
    alignSelf: "flex-end",
  },
});

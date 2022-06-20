import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";

export default function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [date, setDate] = useState("");
  const [provider, setProvider] = useState("");
  const [number, setNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="بارکد"
          value={productName}
          onChangeText={(text) => setBarcode(text)}
          autoCapitalize="none"
          style={[styles.input, { width: width / 2 - 40,  marginEnd:5 }]}
        />
        <TextInput
          placeholder="نام محصول"
          value={barcode}
          onChangeText={(text) => setBarcode(text)}
          autoCapitalize="none"
          style={[styles.input, { width: width / 2 - 40 }]}
        />
      </View>
      <TextInput
          placeholder="تاریخ"
          value={date}
          onChangeText={(text) => setDate(text)}
          autoCapitalize="none"
          style={[styles.input, { width: width - 80 }]}
        />
        <TextInput
          placeholder="تأمین‌کننده"
          value={provider}
          onChangeText={(text) => setProvider(text)}
          autoCapitalize="none"
          style={[styles.input, { width: width - 80 }]}
        />
        <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="انقضا"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(text)}
          autoCapitalize="none"
          style={[styles.input, { width: width / 2 - 40,  marginEnd:5 }]}
        />
        <TextInput
          placeholder="تعداد"
          value={number}
          onChangeText={(text) => setNumber(text)}
          autoCapitalize="none"
          style={[styles.input, { width: width / 2 - 40 }]}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    paddingTop:0,
    marginTop: -10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    //width: 250,
    height: 43,
    alignItems: "center",
    textAlign: "right",
    //color: "#24438E30",
    fontSize:18,
    fontFamily: "YekanBakhThin",
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80"
  },
});

import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
export default function IncomeEntry() {
  const [incomeTitle, setIncomeTitle] = useState();
  const [entryDate, setEntryDate] = useState();
  const [incomeType, setIncomeType] = useState();
  const [incomeTag, setIncomeTag] = useState();
  const [incomeAmount, setIncomeAmount] = useState();

  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="نوع هزینه"
          placeholderTextColor="#24408E"
          value={incomeType}
          onChangeText={(text) => setIncomeType(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1 }]}
        />

        <TextInput
          placeholder="عنوان هزینه"
          placeholderTextColor="#24408E"
          value={entryDate}
          onChangeText={(text) => setEntryDate(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 3 }]}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="بازه یادآوری"
          placeholderTextColor="#24408E"
          value={incomeTag}
          onChangeText={(text) => setIncomeTag(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1 }]}
        />
        <TextInput
          placeholder="تاریخ ثبت"
          placeholderTextColor="#24408E"
          value={incomeAmount}
          onChangeText={(text) => setIncomeAmount(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1 }]}
        />
        <TextInput
          placeholder="مقدار هزینه"
          placeholderTextColor="#24408E"
          value={incomeTitle}
          onChangeText={(text) => setIncomeTitle(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 1.5 }]}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={[styles.button, {}]}>
          <Text style={styles.buttonText}>ثبت نهایی</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addButton]}>
          <Image
            style={{ width: 10, height: 10 }}
            source={require("../../assets/icons/plus.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // alignItems: "center",
    padding: 10,
    paddingTop: 5,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    margin: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 1,
    marginTop: 5,
    height: 35,
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,

    fontFamily: "YekanBakhThin",
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
  addButton: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
    alignItems: "flex-end",
  },
  button: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: 95,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "YekanBakhMedium",
    color: "#fff",
    textAlign: "center",
  },
});

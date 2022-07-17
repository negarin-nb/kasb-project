import React, { useState } from "react";
import {
  View,
  Image,
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
          placeholder="نوع"
          value={incomeType}
          onChangeText={(text) => setIncomeType(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 3 }]}
        />

        <TextInput
          placeholder=" تاریخ ثبت"
          value={entryDate}
          onChangeText={(text) => setEntryDate(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 2, }]}
        />
        <TextInput
          placeholder="عنوان درآمد"
          value={incomeTitle}
          onChangeText={(text) => setIncomeTitle(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 4,  }]}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={[styles.input, { flex: 0.5 }]}>
          <Image
            style={{ width: 16, height: 16 }}
            source={require("../../assets/icons/withdrawal.png")}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="برچسب"
          value={incomeTag}
          onChangeText={(text) => setIncomeTag(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 4}]}
        />
        <TextInput
          placeholder="مقدار درآمد"
          value={incomeAmount}
          onChangeText={(text) => setIncomeAmount(text)}
          autoCapitalize="none"
          style={[styles.input, { flex: 8 }]}
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
    marginHorizontal:1,
    marginTop: 5,
    //width: 250,
    height: 35,
    alignItems: "center",
    textAlign: "right",
    //color: "#24438E30",
    fontSize: 16,
    fontFamily: "YekanBakhThin",
    borderWidth: 2,
    borderColor: "#24438E30",
    backgroundColor: "#FFFFFF80",
    borderRadius: 20,
  },
});

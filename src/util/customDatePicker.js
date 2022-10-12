import React, { useState } from 'react';
import {useWindowDimensions,StyleSheet,TouchableOpacity, Text, View} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

export default function CustomDatePicker({
  setDate,
  changeModalVisibiblity,
  setDateModalVisible,
}) {
  const {width } = useWindowDimensions();
  const onSelectedChange = (date) => {
    setDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { width: width - 40 }]}>
        <DatePicker
          style={[styles.datePicker, { width: width - 40 }]}
          isGregorian={false}
          options={{
            defaultFont: "IranYekanRegular",
            headerFont: "YekanBakhBold",
            textFontSize: 11,
            backgroundColor: "#FFFFFF00",
            textHeaderColor: "#24408E",
            textDefaultColor: "#24408E",
            selectedTextColor: "#fff",
            mainColor: "#24408E",
            textSecondaryColor: "#24408E",
            borderColor: "#63D98A",
          }}
          selected={getFormatedDate(new Date(), "jYYYY/jMM/jDD")}
          mode="calendar"
          onSelectedChange={onSelectedChange}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeModalVisibiblity(false, setDateModalVisible)}
        >
          <Text style={styles.buttonText}>ثبت</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000087",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderColor: "#63D98A",
    justifyContent: "center",
    alignItems: "center",
    padding:20,

    borderWidth: 2,
    borderColor: "#24438E40",
    borderRadius: 40,
  },
  
  button: {
    marginHorizontal: 4,
   // marginVertical: 10,
    paddingVertical: 4,
    paddingHorizontal: 30,
    backgroundColor: "#63D98A",
    borderRadius: 20,
    color: "#fff",
    width: "auto",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "YekanBakhMedium",
    color: "#24408E",
    textAlign: "center",
  },
});

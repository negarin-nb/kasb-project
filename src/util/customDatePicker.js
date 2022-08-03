import React, { useState } from 'react';
import {useWindowDimensions,StyleSheet,TouchableOpacity} from "react-native";
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
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeModalVisibiblity(false, setDateModalVisible)}
    >
      <DatePicker
        style={[styles.datePicker,{ width: width - 40 }]}
        isGregorian={false}
        options={{
          defaultFont: "IranYekanRegular",
          headerFont: "YekanBakhBold",
          textFontSize: 12,
          backgroundColor: "#FFFFFF",
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
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000087",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: "#24438E40",
    borderRadius: 40,
  },
});

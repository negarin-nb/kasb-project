import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "jalali-moment";

const weeks = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const weekDays = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
    

export default function MonthCalendar({ textColor, onDayPress }) {
  let date = moment().locale("fa");
  const [value, setValue] = useState(date);
  let dayCounter = 0;

  const startDate = moment(value).startOf("month");
  const endDate = moment(value).endOf("month");
  const numDays = endDate.diff(startDate, "days") + 1;

  const prefixDays = moment(startDate).locale("fa").jDay();
  const suffixDays = 6 - moment(endDate).locale("fa").jDay();

  const prevMonth = () => setValue(moment(value).subtract(1, "months"));
  const nextMonth = () => setValue(moment(value).add(1, "months"));
  const prevYear = () => setValue(moment(value).subtract(1, "year"));
  const nextYear = () => setValue(moment(value).add(1, "year"));
  const resetDate = () => setValue(date);

  const rowLength = (prefixDays + suffixDays + numDays) / 7 - 2;

  const onDayCalanderPress = (index, value) => { 
    console.log(index);
    console.log(value);
  }

  //const onDayPress = () => {};

  /* console.log("value");
    console.log(value);
    
    console.log("startDate");
    console.log(startDate);
    
    console.log("endDate");
    console.log(endDate);
    
    console.log("numDays");
    console.log(numDays);
    
    console.log("prefixDays");
    console.log(prefixDays);
    
    console.log("suffixDays");
    console.log(suffixDays);
    
    console.log("prevMonth");
    console.log(prevMonth);
    
    console.log("nextMonth");
    console.log(nextMonth);

    console.log("prevYear");
    console.log(prevYear);

    console.log("nextYear");
    console.log(nextYear); */

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row-reverse" }}>
        <TouchableOpacity style={styles.cell} onPress={prevYear}>
          <Text style={styles.cellText}>{">>"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={prevMonth}>
          <Text style={styles.cellText}>{">"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.date]} onPress={resetDate}>
          <Text style={[styles.cellText]}>{value.format("MMMM YYYY")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={nextMonth}>
          <Text style={styles.cellText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={nextYear}>
          <Text style={styles.cellText}>{"<<"}</Text>
        </TouchableOpacity>
      </View>
      {/* day names */}
      <View
        style={{
          flexDirection: "row-reverse",
          borderColor: "#63D98A",
          borderTopWidth: 1,
        }}
      >
        {weeks.map((week) => (
          <TouchableOpacity
            style={[styles.day, { color: "#63D98A" }]}
            onPress={nextYear}
            key={week}
          >
            <Text style={styles.cellText}>{week}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: "row-reverse" }}>
        {Array.from({ length: prefixDays }).map((_, index) => (
          <Text style={styles.day} key={index} />
        ))}

        {Array.from({ length: 7 - prefixDays }).map((_, index) => {
          const date = index + 1;
          dayCounter = date;
          const isCurrentDate =
            dayCounter === parseInt(moment(value).format("D")) &&
            moment(value).jMonth() === moment().jMonth() &&
            moment(value).jYear() === moment().jYear();
          return (
            <TouchableOpacity
              style={isCurrentDate ? styles.currentDay : styles.day}
              key={index}
              onPress={() => {
                
                onDayPress(date, value, weekDays[index]);}}
            >
              <Text style={styles.dayText}>{date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {Array.from({ length: rowLength }).map((_, index) => {
        return (
          <View style={{ flexDirection: "row-reverse" }} key={index}>
            {Array.from({ length: 7 }).map((_, index) => {
              const date = dayCounter + 1;
              dayCounter = date;
              const isCurrentDate =
                dayCounter === parseInt(moment(value).format("D")) &&
                moment(value).jMonth() === moment().jMonth() &&
                moment(value).jYear() === moment().jYear();
              return (
                <TouchableOpacity
                  style={isCurrentDate ? styles.currentDay : styles.day}
                  key={index}
                  onPress={() => onDayPress(date, value, weekDays[index])}
                >
                  <Text style={styles.dayText}>{date}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}

      <View style={{ flexDirection: "row-reverse" }}>
        {Array.from({ length: 7 - suffixDays }).map((_, index) => {
          const date = dayCounter + 1;
          dayCounter = date;
          const isCurrentDate =
            dayCounter === parseInt(moment(value).format("D")) &&
            moment(value).jMonth() === moment().jMonth() &&
            moment(value).jYear() === moment().jYear();
          return (
            <TouchableOpacity
              style={isCurrentDate ? styles.currentDay : styles.day}
              key={index}
              onPress={() => onDayPress(date, value, weekDays[index])}
            >
              <Text style={styles.dayText}>{date}</Text>
            </TouchableOpacity>
          );
        })}

        {Array.from({ length: suffixDays }).map((_, index) => (
          <Text style={styles.day} key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cellText: {
    fontFamily: "IranYekanRegular",
    fontSize: 14,
    color: "#fff",
  },
  date: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#63D98A",
    borderRadius: 10,
    padding: 0,
    marginVertical: 10,
  },
  day: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "center",
  },
  currentDay: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: "#63D98A51",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    marginHorizontal:5,
    paddingVertical: 7,
    marginVertical:4,
    borderWidth:1,
    borderColor: "#63D98A",
  },
  dayText: {
    fontFamily: "IranYekanRegular",
    fontSize: 13,
    color: "#fff",
  },
});
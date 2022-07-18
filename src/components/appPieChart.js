import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { processFontFamily } from "expo-font";


export default function AppPieChart() {

  const { width } = useWindowDimensions();
  const fontColor = "#fff";
  const fontSize=16;
  const fontFamily = processFontFamily("YekanBakhMedium");

  const data = [
    {
      name: " خرده",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: fontColor,
      legendFontSize: fontSize,
      legendFontFamily: fontFamily,
    },
    {
      name: " عمده",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#fff",
      legendFontSize: 16,
      legendFontFamily: processFontFamily("YekanBakhMedium"),
    },
    {
      name: " آنلاین",
      population: 527612,
      color: "red",
      legendFontColor: "#fff",
      legendFontSize: 16,
      legendFontFamily: processFontFamily("YekanBakhMedium"),
    },
    {
      name: " همکار",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#fff",
      legendFontSize: 16,
      legendFontFamily: processFontFamily("YekanBakhMedium"),
    },
    {
      name: " بازارچه",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#fff",
      legendFontSize: 16,
      legendFontFamily: processFontFamily("YekanBakhMedium"),
    },
  ];  
  return (
    <PieChart
      style={{ marginTop: -20 }}
      data={data}
      width={width - 60}
      height={220}
      chartConfig={{
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(99, 217, 138, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(36, 65, 142, ${opacity})`,

        propsForVerticalLabels: {
          fontFamily: processFontFamily("YekanBakhMedium"),
          fontSize: 14,
        },
        propsForLabels: {
          fontFamily: processFontFamily("YekanBakhBold"),
          fontSize: 14,
        },
        propsForBackgroundLines: {},
      }}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={20}
      absolute
    />
  );
}

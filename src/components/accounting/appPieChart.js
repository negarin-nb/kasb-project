import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { processFontFamily } from "expo-font";
import arabicPersianReshaper from "arabic-persian-reshaper";
import accountingApi from "../../api/accounting";
import { AuthContext } from "../../store/auth-context";


export default function AppPieChart({type}) {

  const { width } = useWindowDimensions();
  const authCtx = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  const fontColor = "#fff";
  const fontSize = 12;
  const fontFamily = processFontFamily("IranYekanRegular");
  const colors = [
    "rgba(131, 167, 234, 1)",
    "rgba(131, 200, 234, 1)",
    "#fff",
    "blue",
    "rgb(0, 0, 255)"
  ];

  useEffect(() => {
    if(type === "cost") fetchCostsReport();
    else if(type === "income") fetchIncomesReport();
  }, []);

  const fetchCostsReport = async () => {
    const result = await accountingApi.getCostsReport(authCtx.accessToken);
    if (!result.ok) alert("خطایی در بازیابی گزارش‌ هزینه‌ها پیش آمده!");
    else setReports(result.data.ListItems);
    console.log(result.data.Message);
  };

  const fetchIncomesReport = async () => {
    const result = await accountingApi.getIncomesReport(authCtx.accessToken);
    if (!result.ok) alert("خطایی در بازیابی گزارش‌ درامدها پیش آمده!");
    else setReports(result.data.ListItems);
    console.log(result.data.Message);
  };

  const data = reports.map((item, index) => ({
    name: arabicPersianReshaper.PersianShaper.convertArabic("تومان  : " +item.category_name),
    population: item.category_amount,
    color: colors[index],
    legendFontColor: fontColor,
    legendFontSize: fontSize,
    legendFontFamily: fontFamily,
  }));

  return (
    <PieChart
      style={{ marginTop: -20 }}
      data={data}
      width={width - 60}
      height={250}
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

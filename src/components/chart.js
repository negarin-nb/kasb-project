import React, {useState} from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { processFontFamily } from "expo-font";
import ToolTip from "./toolTip";
import arabicPersianReshaper from "arabic-persian-reshaper";
export default function Chart({ tooltipPos, setTooltipPos }) {
  const [monthlyIncome, setMonthlyIncome] = useState([25000, 30000, 16000, 10000, 32000, 10000])
  const { width } = useWindowDimensions();
  const handelOnDataPointClick = (data) => {
    let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;
    isSamePoint
      ? setTooltipPos((previousState) => {
          return {
            ...previousState,
            value: data.value,
            visible: !previousState.visible,
          };
        })
      : setTooltipPos({
          x: data.x,
          value: data.value,
          y: data.y,
          visible: true,
        });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>گزارش وضعیت</Text>
      <LineChart
        data={{
          labels: [
            arabicPersianReshaper.PersianShaper.convertArabic("ﺷﻬﺮﯾﻮر"),
            arabicPersianReshaper.PersianShaper.convertArabic("مرداد"),
            arabicPersianReshaper.PersianShaper.convertArabic("تیر"),
            arabicPersianReshaper.PersianShaper.convertArabic("خرداد"),
            arabicPersianReshaper.PersianShaper.convertArabic("اردیبهشت"),
            arabicPersianReshaper.PersianShaper.convertArabic("فروردین"),
          ],
          datasets: [
            {
              data: monthlyIncome,
            },
          ],
        }}
        width={width - 50} // from react-native
        height={172}
        //yAxisLabel="تومان "
        //yAxisSuffix=" تومان "
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: "#E2F0ED",
          backgroundGradientTo: "#E2F0ED",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(99, 217, 138, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(36, 65, 142, ${opacity})`,
          style: {},
          propsForDots: {
            r: "3",
            strokeWidth: "6",
            stroke: "#24408E",
          },
          propsForVerticalLabels: {
            fontFamily: processFontFamily("YekanBakhMedium"),
            fontSize: 14,
          },
          propsForHorizontalLabels: {
            fontFamily: processFontFamily("IranYekanRegular"),
            fontSize: 12,
          },
          propsForBackgroundLines: {},
        }}
        yLabelsOffset={22}
        fromZero
        withDots
        bezier
        decorator={() => <ToolTip tooltipPos={tooltipPos} />}
        onDataPointClick={handelOnDataPointClick}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2F0ED",
    borderRadius: 15,
    marginTop: 10,
    paddingStart: 10,
    paddingTop: 20,
    paddingBottom: 15,
  },

  buttonText: {
    fontFamily: "YekanBakhMedium",
    textAlign: "right",
    fontSize: 20,
    marginEnd: 5,
    color: "#24438E",
    paddingEnd: 20,
    marginBottom: -10,
    zIndex: 2,
  },
});

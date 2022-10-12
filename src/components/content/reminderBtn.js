import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function ReminderBtn({ iconSource, title }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.Btn, { width: width - 40 }]}>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: 8, marginBottom: 8 }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{flex: 1, width: 24, height: 24, marginStart: 20 }}
            source={iconSource}
          />
        </View>
        <Text style={styles.BtnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Btn: {
    borderRadius: 20,
    height: 43,
    paddingEnd: 20,
    marginBottom: 10,
    backgroundColor: "#24438E",
  },
  BtnTitle: {
    fontFamily: "IranYekanRegular",
    textAlign: "right",
    color: "#fff",
    fontSize: 16,
  },
});

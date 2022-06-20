import React from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet,useWindowDimensions, } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function TopBar({iconSourc, title}) {
    const { width } = useWindowDimensions();
  return (
    <LinearGradient
          colors={["#63D98A", "#24438E"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.TopBar, { width: width - 40 }]}
        >
          <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 24, height: 24, marginStart: 20, marginTop: 2 }}
                source={iconSourc}
              />
            </View>
            <Text style={styles.TopBarTitle}>{title}</Text>
          </TouchableOpacity>
        </LinearGradient>
  );
}
const styles = StyleSheet.create({
    TopBar: {
    borderRadius: 20,
    height: 43,
    paddingEnd: 20,
    marginTop: 10,
  },
  TopBarTitle: {
    fontFamily: "YekanBakhMedium",
    textAlign: "right",
    color: "#fff",
    fontSize: 18,
  },
});


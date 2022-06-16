import React from "react";
import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Dimensions,
} from "react-native";

export default function Paginator({ data, scrollX, currentIndex }) {
  const { width } = useWindowDimensions();
  
  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        //const inputeRange = [(i - 1) * width, i * width, (i + 1) * width];
        //const opacity = scrollX.interpolate({
        // inputeRange,
        //outputRange: [0.3, 1, 0.3],
        //  extrapolate: "clamp"
        //});
        const opacity = currentIndex === i ? 1 : 0.3;
        return (
          <Animated.View
            style={[styles.dot, { width: 6, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 6,
    borderRadius: 5,
    backgroundColor: "#a4a6a8",
    marginTop:40,
    marginHorizontal: 8,
  },
});

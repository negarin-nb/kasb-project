import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  LayoutAnimation,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({children, title, expanded}) {
  const [isExpand, setIsExpand] = useState(expanded);
  const { width } = useWindowDimensions();

  const handleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpand(!isExpand);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#63D98A", "#24438E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { width: width - 40 }]}
      >
        <TouchableOpacity
          style={{
            height: "auto",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
          onPress={expanded ? null : handleExpand}
        >
          <View style={{ paddingTop: 10, flex: 1 }}>
            <Image
              style={{ width: 12, height: 8 }}
              source={
                isExpand
                  ? require("../../assets/icons/chevrontop.png")
                  : require("../../assets/icons/chevronbottom.png")
              }
            />
          </View>

          <View>
            <Text style={styles.cardTitle}>{title}</Text>
          </View>
        </TouchableOpacity>
        <View>{isExpand ? children() : null}</View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 10,
    borderRadius: 20,
  },
  cardTitle: {
    color: "#fff",
    textAlign: "right",
    fontSize: 18,
    fontFamily: "YekanBakhBold",
    //paddingEnd: 10,
  },
});

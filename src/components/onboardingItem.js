import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";


export default function OnboardingItem({ item }) {

  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={{ flex:1, borderRadius:20 }}>
        <Image
          source={item.image}
          style={[styles.image, { width, height: "auto" }]}
        />
      </View>
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  image: {
    flex: 1,
    marginBottom: 10,
   // borderRadius: 20,
    overflow: "hidden",
    borderBottomLeftRadius:40,
  },
  title: {
    fontSize: 38,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    color: "#AEAEB2",
    fontFamily: "YekanBakhMedium",
  },
  description: {
    fontSize: 18,
    paddingHorizontal: 64,
    textAlign: "center",
    color: "#AEAEB2",
    fontFamily: "YekanBakhMedium",
  },
});

import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function BannerImage({ uri, height = 150, label }) {
  return (
    <ImageBackground
      source={{ uri }}
      style={[styles.container, { height }]}
      imageStyle={{ borderRadius: 10 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, justifyContent: "flex-end", padding: 10 },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  text: { color: COLORS.surface, fontWeight: "bold", fontSize: 16 },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function QuoteCard({ quote, author }) {
  return (
    <View style={styles.card}>
      <Text style={styles.quote}>"{quote}"</Text>
      <Text style={styles.author}>- {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.text,
    marginBottom: 10,
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "right",
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function StatCard({
  icon,
  label,
  value,
  color = COLORS.primary,
}) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={24} color={color} />
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    elevation: 2, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  info: { marginLeft: 10 },
  label: { fontSize: 12, color: COLORS.textLight },
  value: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
});

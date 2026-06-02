import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function MateriaCard({ materia, onPress, onToggleFav }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{materia.nome}</Text>
        <Pressable onPress={onToggleFav}>
          <Ionicons
            name={materia.favorita ? "star" : "star-outline"}
            size={24}
            color={COLORS.warning}
          />
        </Pressable>
      </View>
      <View style={styles.progressContainer}>
        <View
          style={[styles.progressBar, { width: `${materia.progresso}%` }]}
        />
      </View>
      <Text style={styles.progressText}>{materia.progresso}% concluído</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  progressContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: COLORS.primary },
  progressText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
    textAlign: "right",
  },
});

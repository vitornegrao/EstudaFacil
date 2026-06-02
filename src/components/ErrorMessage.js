import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function ErrorMessage({
  message = "Ocorreu um erro inesperado.",
  onRetry,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.error,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: "bold",
  },
});

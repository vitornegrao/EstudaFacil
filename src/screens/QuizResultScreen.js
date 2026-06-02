import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../constants/colors";

export default function QuizResultScreen({ route, navigation }) {
  const { score, total } = route.params;
  const percentage = Math.round((score / total) * 100);

  let feedbackMessage = "Continue praticando!";
  if (percentage >= 80) feedbackMessage = "Excelente resultado! 🏆";
  else if (percentage >= 50) feedbackMessage = "Mandou bem! 👍";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fim de Jogo!</Text>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreText}>
          {score} / {total}
        </Text>
        <Text style={styles.percentageText}>{percentage}% de acerto</Text>
      </View>
      <Text style={styles.feedbackText}>{feedbackMessage}</Text>

      <Pressable
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("QuizSetup")}
      >
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </Pressable>

      <Pressable
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate("Início")}
      >
        <Text style={[styles.buttonText, { color: COLORS.primary }]}>
          Voltar ao Início
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: COLORS.surface,
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    width: "100%",
  },
  scoreText: { fontSize: 48, fontWeight: "bold", color: COLORS.primary },
  percentageText: { fontSize: 18, color: COLORS.textLight, marginTop: 10 },
  feedbackText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: COLORS.surface, fontSize: 16, fontWeight: "bold" },
});

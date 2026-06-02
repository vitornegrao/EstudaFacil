import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function QuizOption({
  option,
  letter,
  correct,
  selectedAnswer,
  onSelect,
}) {
  const isSelected = selectedAnswer === option;
  const showFeedback = selectedAnswer !== null; // Se já respondeu, mostra feedback

  let bgColor = COLORS.surface;
  let borderColor = COLORS.border;

  if (showFeedback) {
    if (correct) {
      bgColor = COLORS.success;
      borderColor = COLORS.success;
    } else if (isSelected) {
      bgColor = COLORS.error;
      borderColor = COLORS.error;
    }
  } else if (isSelected) {
    borderColor = COLORS.primary;
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor: bgColor, borderColor }]}
      onPress={() => !showFeedback && onSelect(option)}
    >
      <Text
        style={[
          styles.text,
          showFeedback && (correct || isSelected) && { color: COLORS.surface },
        ]}
      >
        {letter}) {option}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
  },
  text: { fontSize: 16, color: COLORS.text },
});

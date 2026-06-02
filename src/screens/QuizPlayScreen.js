import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { fetchQuizQuestions } from "../services/api";
import QuizOption from "../components/QuizOption";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { COLORS } from "../constants/colors";

// Utilitário simples para limpar entidades HTML retornadas pela API OpenTDB
const decodeHTML = (str) => {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};

export default function QuizPlayScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuizQuestions(categoryId, 5);
      // Mistura as respostas (correta + incorretas) para cada questão
      const formattedQuestions = data.map((q) => {
        const options = [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5,
        );
        return { ...q, options };
      });
      setQuestions(formattedQuestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleSelect = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      navigation.navigate("QuizResult", { score, total: questions.length });
    }
  };

  if (loading) return <LoadingSpinner message="Montando o seu quiz..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadQuestions} />;
  if (questions.length === 0)
    return (
      <ErrorMessage
        message="Nenhuma questão encontrada."
        onRetry={loadQuestions}
      />
    );

  const currentQ = questions[currentIndex];
  const letras = ["A", "B", "C", "D"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          Questão {currentIndex + 1} de {questions.length}
        </Text>
        <Text style={styles.scoreText}>Pontos: {score}</Text>
      </View>

      <Text style={styles.questionText}>{decodeHTML(currentQ.question)}</Text>

      {currentQ.options.map((opt, index) => (
        <QuizOption
          key={index}
          option={decodeHTML(opt)}
          letter={letras[index]}
          correct={opt === currentQ.correct_answer}
          selectedAnswer={selectedAnswer ? decodeHTML(selectedAnswer) : null}
          onSelect={() => handleSelect(opt)}
        />
      ))}

      {selectedAnswer && (
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex < questions.length - 1
              ? "Próxima Pergunta"
              : "Ver Resultado"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressText: { fontSize: 16, fontWeight: "bold", color: COLORS.textLight },
  scoreText: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  nextButtonText: { color: COLORS.surface, fontSize: 16, fontWeight: "bold" },
});

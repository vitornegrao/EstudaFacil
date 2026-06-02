import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

const CATEGORIAS = [
  { id: 17, nome: "Ciências da Natureza", icone: "🔬" },
  { id: 22, nome: "Geografia", icone: "🌍" },
  { id: 23, nome: "História", icone: "📜" },
  { id: 19, nome: "Matemática", icone: "📐" },
];

export default function QuizSetupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma disciplina</Text>
      <Text style={styles.subtitle}>
        Teste seus conhecimentos com 5 perguntas rápidas.
      </Text>

      <FlatList
        data={CATEGORIAS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("QuizPlay", { categoryId: item.id })
            }
          >
            <Text style={styles.icon}>{item.icone}</Text>
            <Text style={styles.cardText}>{item.nome}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  icon: { fontSize: 30, marginRight: 15 },
  cardText: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
});

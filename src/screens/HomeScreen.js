import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
  Text,
} from "react-native";
import { fetchQuote } from "../services/api";
import QuoteCard from "../components/QuoteCard";
import BannerImage from "../components/BannerImage";
import StatCard from "../components/StatCard";
import { COLORS } from "../constants/colors";

export default function HomeScreen() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [refreshing, setRefreshing] = useState(false);

  // Implementação robusta com fallback em caso de falha na API
  const loadQuote = async () => {
    try {
      const data = await fetchQuote();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      setQuote({
        content:
          "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
        author: "Nelson Mandela",
      });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadQuote();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BannerImage
        uri="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
        label="Bem-vindo de volta!"
      />
      <QuoteCard quote={quote.content} author={quote.author} />

      <Text style={styles.sectionTitle}>Seu Progresso</Text>
      <View style={styles.statsContainer}>
        <StatCard
          icon="flame"
          label="Sequência"
          value="3 Dias"
          color={COLORS.warning}
        />
        <StatCard
          icon="game-controller"
          label="Quizzes"
          value="12"
          color={COLORS.secondary}
        />
        <StatCard
          icon="book"
          label="Matérias"
          value="4"
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 15 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 15,
    marginBottom: 5,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  Switch,
} from "react-native";
import MateriaCard from "../components/MateriaCard";
import { COLORS } from "../constants/colors";

export default function MateriasScreen() {
  // Simulando dados que futuramente podem vir de um banco local (ex: AsyncStorage/SQLite)
  const [materias, setMaterias] = useState([
    {
      id: "1",
      nome: "Matemática",
      progresso: 45,
      favorita: true,
      anotacao: "Revisar geometria plana para o ENEM.",
    },
    {
      id: "2",
      nome: "Português",
      progresso: 60,
      favorita: false,
      anotacao: "",
    },
    {
      id: "3",
      nome: "História",
      progresso: 80,
      favorita: true,
      anotacao: "Ler sobre a Era Vargas no final de semana.",
    },
    {
      id: "4",
      nome: "Física",
      progresso: 20,
      favorita: false,
      anotacao: "Decorar fórmulas de cinemática.",
    },
  ]);

  const [filterFav, setFilterFav] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [notaText, setNotaText] = useState("");

  const toggleFav = (id) => {
    setMaterias(
      materias.map((m) => (m.id === id ? { ...m, favorita: !m.favorita } : m)),
    );
  };

  const openModal = (materia) => {
    setSelectedMateria(materia);
    setNotaText(materia.anotacao);
  };

  const saveAnotacao = () => {
    setMaterias(
      materias.map((m) =>
        m.id === selectedMateria.id ? { ...m, anotacao: notaText } : m,
      ),
    );
    setSelectedMateria(null);
  };

  const displayedMaterias = filterFav
    ? materias.filter((m) => m.favorita)
    : materias;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Mostrar apenas favoritas</Text>
        <Switch
          value={filterFav}
          onValueChange={setFilterFav}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
        />
      </View>

      <FlatList
        data={displayedMaterias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MateriaCard
            materia={item}
            onPress={() => openModal(item)}
            onToggleFav={() => toggleFav(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={!!selectedMateria}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Anotações de {selectedMateria?.nome}
            </Text>

            <TextInput
              style={styles.input}
              multiline
              numberOfLines={6}
              value={notaText}
              onChangeText={setNotaText}
              placeholder="Escreva suas anotações aqui..."
              textAlignVertical="top"
            />

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.button, styles.cancelBtn]}
                onPress={() => setSelectedMateria(null)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={saveAnotacao}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  filterText: { fontSize: 16, color: COLORS.text, fontWeight: "500" },
  list: { padding: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 120,
    marginBottom: 20,
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelBtn: { backgroundColor: COLORS.textLight },
  buttonText: { color: COLORS.surface, fontWeight: "bold" },
});

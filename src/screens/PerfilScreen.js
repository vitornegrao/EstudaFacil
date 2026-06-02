import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/colors";

export default function PerfilScreen() {
  const [nome, setNome] = useState("Ana Estudante");
  const [turma, setTurma] = useState("2º Ano");
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  // Gera o avatar dinamicamente sempre que o nome for alterado
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=4CAF50&color=fff&size=150`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{nome}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Turma</Text>
        <TextInput style={styles.input} value={turma} onChangeText={setTurma} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        <View style={styles.row}>
          <Text style={styles.rowText}>Notificações Diárias</Text>
          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Modo Escuro</Text>
          <Switch
            value={modoEscuro}
            onValueChange={setModoEscuro}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
          />
        </View>
      </View>

      <Pressable
        style={styles.saveButton}
        onPress={() => alert("Dados salvos localmente!")}
      >
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", color: COLORS.text },
  section: { padding: 20, backgroundColor: COLORS.surface, marginTop: 10 },
  label: { fontSize: 14, color: COLORS.textLight, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rowText: { fontSize: 16, color: COLORS.text },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: "center",
  },
  saveButtonText: { color: COLORS.surface, fontSize: 16, fontWeight: "bold" },
});

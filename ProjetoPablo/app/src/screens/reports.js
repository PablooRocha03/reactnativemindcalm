import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { api } from "../utils/api";

const Reports = ({ navigation }) => {
  const [reports, setReports] = useState();

  useEffect(() => {
    api
      .get("/registros")
      .then((response) => response.data)
      .then((data) => setReports(data))
      .catch((error) =>
        console.error(`$Houve um erro ao chamar relatorios: ${error}`),
      );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercício de meditação</Text>
      <View style={styles.content}>
        <FlatList
          data={reports}
          renderItem={({ item }) => (
            <View style={styles.reportsContainer}>
              <Text style={styles.p}>{`Emoção: ${item.titulo}`}</Text>
              <Text style={styles.description}>Decrição</Text>
              <Text style={styles.pp}>{item.descricao}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#4a90e2",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    color: "#fff",
    marginBottom: 15,
  },
  content: {
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "90%",
    borderRadius: 15,
    padding: 20,
    rowGap: 20,
  },
  reportsContainer: {
    rowGap: 8,
    backgroundColor: "#6797f1",
    padding: 16,
    borderRadius: 8,
  },
  p: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "medium",
  },
  pp: {
    fontSize: 16,
    color: "#222",
    backgroundColor: "#d1e1ff",
    padding: 8,
    borderRadius: 4,
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 8,
  },
});

export default Reports;

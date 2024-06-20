import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import meditations from "../data/meditations";

const Meditation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercício de meditação</Text>
      <View style={styles.content}>
        <FlatList
          data={meditations}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.p}>{item.title}</Text>
              <Text style={styles.pp}>{item.content}</Text>
              <View style={styles.webview}>
                <WebView
                  javaScriptEnabled={true}
                  source={{ uri: item.videoUrl }}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
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
  itemContainer: {
    marginBottom: 30,
    rowGap: 15,
  },
  p: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#555",
  },
  pp: {
    fontSize: 16,
    color: "#555",
  },
  webview: {
    width: "100%",
    minHeight: 180,
  },
});

export default Meditation;

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import emotions from "../data/emotions";
import { FlatList } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [selectedEmotionId, setSelectedEmotionId] = useState();

  function handleSelectEmotion(pressedEmotionId) {
    const emotionId =
      selectedEmotionId === pressedEmotionId ? null : pressedEmotionId;

    setSelectedEmotionId(emotionId);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MindCalm</Text>
      <View style={styles.content}>
        <View>
          <Text style={styles.p}>Olá, como você está hoje?</Text>

          <FlatList
            contentContainerStyle={styles.emotions}
            data={emotions}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectEmotion(item.id)}>
                <View>
                  <Image
                    source={item.image}
                    style={{ height: 50, width: 50 }}
                  />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          {selectedEmotionId != null && (
            <Text style={styles.pp}>
              {emotions[selectedEmotionId - 1]?.content}
            </Text>
          )}
        </View>

        <View style={styles.fetures}>
          <View style={styles.featureLine}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Diario")}
              style={styles.featureButton}
            >
              <Image
                source={require("../assets/features/diario.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text>Diario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Respire")}
              style={styles.featureButton}
            >
              <Image
                source={require("../assets/features/respiracao.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text>Respire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Meditação")}
              style={styles.featureButton}
            >
              <Image
                source={require("../assets/features/meditacao.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text>Meditação</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureLine}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Relaxe")}
              style={styles.featureButton}
            >
              <Image
                source={require("../assets/features/automassagem.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text>Relaxe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Relatórios")}
              style={styles.featureButton}
            >
              <Image
                source={require("../assets/features/relatorios.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text>Relatórios</Text>
            </TouchableOpacity>
            <TouchableOpacity   onPress={() => navigation.navigate("Profissionais")} style={styles.featureButton}>
              <Image
                source={require("../assets/features/profissionais.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text>Profissionais</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 50,
    height: "90%",
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  p: {
    fontSize: 18,
    textAlign: "center",
  },
  pp: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 30,
  },
  emotions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  fetures: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    rowGap: 25,
    paddingTop: 50,
    borderTopColor: "#dddddd",
  },
  featureLine: {
    flexDirection: "row",
  },
  featureButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});

export default Home;

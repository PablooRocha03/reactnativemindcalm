import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import massages from "../data/massages";

const Relax = ({ navigation }) => {
  const getImageSource = (imageName) => {
    return { uri: `../assets/relax/${imageName}` };
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Automassagem</Text>
      <View style={styles.content}>
        <FlatList
          data={massages}
          renderItem={({ item }) => (
            <View style={styles.massageContainer}>
              <Text style={styles.p}>{item.type}</Text>
              <FlatList
                data={item.steps}
                renderItem={({ item }) => (
                  <View style={styles.stepContainer}>
                    <Text style={styles.pp}>{item.step}</Text>
                    {item.image && (
                      <Image source={item.image} style={styles.image} />
                    )}
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyExtractor={(item, index) => index.toString()}
              />
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
  massageContainer: {
    marginVertical: 20,
  },
  p: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#555",
    marginBottom: 20,
  },
  stepContainer: {
    marginBottom: 10,
  },
  pp: {
    fontSize: 16,
    color: "#555",
  },
  step: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#cccccc99",
    marginVertical: 8,
  },
});

export default Relax;

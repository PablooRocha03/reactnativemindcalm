import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Dropdown from "../components/Dropdown";

import * as Location from "expo-location";
import { api } from "../utils/api";
import emotions from "../data/emotions";

const Daily = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const options = emotions.map((item) => item.name);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acesar localização negada");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  function handleSelect(option) {
    setSelectedOption(option);
  }

  async function handleSubmit() {
    const payload = {
      titulo: selectedOption,
      descricao: message,
      local: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };
    console.log(payload);
    await api.post("/registros", payload);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Diário de Emoções</Text>
      <View style={styles.content}>
        <Text style={styles.p}>Registre sua emoção</Text>
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          onSelect={handleSelect}
        />
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Escreva sua mensagem"
          placeholderTextColor="#919191"
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
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
    alignContent: "center",
    backgroundColor: "#fff",
    height: "90%",
    borderRadius: 15,
    padding: 20,
    rowGap: 15,
  },
  p: {
    fontSize: 20,
    marginBottom: 35,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    minHeight: 200,
    textAlignVertical: "top",
  },
  submitButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 4,
    backgroundColor: "#6797f1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Daily;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option) => {
    onSelect(option);
    setModalVisible(false);
  };

  // Função para calcular a altura máxima do modal com base no número de itens
  const calculateModalHeight = () => {
    const numItems = options.length;
    const itemHeight = 55;
    const maxHeight = 300;

    let modalHeight = numItems * itemHeight;
    if (modalHeight > maxHeight) {
      modalHeight = maxHeight;
    }

    return modalHeight;
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedOption ? (
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {selectedOption}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: "#919191",
            }}
          >
            Selecione uma opção
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View
            style={[styles.modalContainer, { height: calculateModalHeight() }]}
          >
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleOptionSelect(item)}
                >
                  <Text style={{ fontSize: 16 }}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.optionsList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 1,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 150,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    minWidth: 250,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  optionsList: {
    flexGrow: 1,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});

export default Dropdown;

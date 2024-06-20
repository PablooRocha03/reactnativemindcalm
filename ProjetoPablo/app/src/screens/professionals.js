import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const professionals = require('../data/professionals.json');

const Professionals = ({ navigation }) => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização negada');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert('Erro ao obter localização', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profissionais próximos</Text>
      <View style={styles.content}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          onRegionChangeComplete={setRegion}
        >
          {region && (
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Você está aqui"
            />
          )}
          {professionals.map((professional, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: professional.latitude,
                longitude: professional.longitude,
              }}
              title={professional.nome}
              description={`${professional.especialidade}\n${professional.endereco}`}
            />
          ))}
        </MapView>
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
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  map: {
    flex: 1,
    borderRadius: 15,
  },
});

export default Professionals;

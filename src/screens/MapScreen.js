import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../styles/MapScreen.style'; 

const MapScreen = () => {
  const initialRegion = {
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const sampleMarkers = [
    {
      id: 1,
      title: 'Lixo Hospitalar',
      description: 'Ponto de coleta de lixo hospitalar',
      coordinate: {
        latitude: -23.5505,
        longitude: -46.6333,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pontos de Coleta</Text>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {sampleMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;


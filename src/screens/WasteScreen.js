import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from '../../styles/WasteScreen.style';
import logo from '../../img/logo.png';

const mockData = [
  {
    nome: "Ecoponto Teste 1",
    endereco: "Rua Teste 123",
    distrito: "Distrito Teste",
    telefone: "1234-5678",
  },
  {
    nome: "Ecoponto Teste 2",
    endereco: "Av. Teste 456",
    distrito: "Distrito Teste",
    telefone: "8765-4321",
  },
];

export default function WasteScreen() {
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWasteData();
  }, []);

  const fetchWasteData = async () => {
    try {
      const response = await fetch('http://dados.prefeitura.sp.gov.br/api/3/action/datastore_search?resource_id=4e67b5cd-61d3-4ee1-89b1-d17f0549d3b0&limit=100');
      const data = await response.json();
      console.log('API Response:', data);

      const ecopontoData = data.result.records.map(record => ({
        nome: record.NOME,
        endereco: record.ENDERECO,
        distrito: record.DISTRITO,
        telefone: record.TELEFONE,
      }));

      setWasteData([...ecopontoData, ...mockData]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWasteData(mockData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {logo && <Image source={logo} style={styles.logo} />}
        <Text style={styles.title}>Ecopontos - São Paulo</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#ffc93c" />
        ) : (
          <FlatList
            data={wasteData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.fieldLabel}>Nome: <Text style={styles.cityText}>{item.nome}</Text></Text>
                <Text style={styles.fieldLabel}>Endereço: <Text style={styles.cityText}>{item.endereco}</Text></Text>
                <Text style={styles.fieldLabel}>Distrito: <Text style={styles.cityText}>{item.distrito}</Text></Text>
                <Text style={styles.fieldLabel}>Telefone: <Text style={styles.cityText}>{item.telefone}</Text></Text>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
}


















import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/ReportScreen.style'; 
import logo from '../../img/logo.png'; 

const ReportScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [species, setSpecies] = useState('');
  const [number, setNumber] = useState('');
  const [behavior, setBehavior] = useState('');
  const [photo, setPhoto] = useState(null);
  const [reportToAuthorities, setReportToAuthorities] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);

      let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      if (reverseGeocode.length > 0) {
        setCity(reverseGeocode[0].city);
        setDistrict(reverseGeocode[0].district);
      }

      let { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        setErrorMsg('Permissão para acessar a câmera foi negada.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSubmit = () => {
    if (!location || !photo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const reportData = {
      location,
      city,
      district,
      species,
      number,
      behavior,
      photo,
    };

    if (reportToAuthorities) {
      fetch('https://api.authorities.example/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })
      .then(response => response.json())
      .then(data => {
        alert('Relatório enviado para as autoridades.');
      })
      .catch(error => {
        console.error('Erro ao enviar relatório:', error);
        alert('Erro ao enviar relatório.');
      });
    } else {
      console.log('Relatório para o mapa:', reportData);
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#111111' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 64, android: 84 })}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {logo && <Image source={logo} style={styles.logo} />}
          <Text style={styles.title}>Descarte Incorreto</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Localização*</Text>
            <TextInput
              style={styles.input}
              placeholder="Localização"
              placeholderTextColor="#ccc"
              value={location}
              onChangeText={setLocation}
              editable={false}
            />
            {city ? <Text style={styles.cityText}>Cidade: {city}</Text> : null}
            {district ? <Text style={styles.cityText}>Bairro: {district}</Text> : null}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Tipo de Lixo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seletivo, orgânico, hospitalar etc"
              placeholderTextColor="#ccc"
              value={species}
              onChangeText={setSpecies}
            />
          </View>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={styles.photoButtonText}>Tirar Foto*</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.photo} />}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Reportar para as Autoridades</Text>
            <Switch
              value={reportToAuthorities}
              onValueChange={setReportToAuthorities}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReportScreen;







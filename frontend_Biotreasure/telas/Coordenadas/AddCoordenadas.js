import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { adicionarCoordenadas, lerAnimais } from '../../utils/servidor_real'; // Ajuste o caminho
import { Picker } from '@react-native-picker/picker'; 

const AddCoordenada = ({ navigation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [animalId, setAnimalId] = useState(null);
  const [animais, setAnimais] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Voltar"
          color="#000"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchAnimais = async () => {
      const listaAnimais = await lerAnimais();
      setAnimais(listaAnimais);
    };

    fetchAnimais();
  }, []);

  const handleAddCoordenada = async () => {
    if (!latitude || !longitude || !animalId) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    const coordenada = { latitude, longitude, animal_id: animalId };
    try {
      const added = await adicionarCoordenadas(coordenada);
      if (added) {
        Alert.alert('Sucesso', 'Coordenada adicionada com sucesso!');
        navigation.navigate('ListCoordenadas'); 
      } else {
        Alert.alert('Erro', 'Falha ao adicionar a coordenada.');
      }
    } catch (error) {
      console.error('Erro ao adicionar coordenada:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar a coordenada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Latitude:</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
      />
      <Text style={styles.label}>Longitude:</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
      />
      <Text style={styles.label}>Animal:</Text>
      <Picker
        selectedValue={animalId}
        onValueChange={(itemValue) => setAnimalId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um animal" value={null} />
        {animais.map((animal) => (
          <Picker.Item key={animal.id} label={animal.nome} value={animal.id} />
        ))}
      </Picker>
      <Button title="Adicionar" onPress={handleAddCoordenada} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: { height: 50, marginBottom: 16 },
});

export default AddCoordenada;

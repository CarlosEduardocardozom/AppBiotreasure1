import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { adicionarCoordenadas } from '../../utils/servidor_real'; // Importe a função correta

const AddCoordenadas = ({ navigation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [animalId, setAnimalId] = useState('');

  const handleSubmit = async () => {
    const coordenada = { latitude: parseFloat(latitude), longitude: parseFloat(longitude), animal_id: animalId };
    
    const success = await adicionarCoordenadas(coordenada);
    if (success) {
      Alert.alert('Coordenadas adicionadas com sucesso!');
      navigation.goBack(); // Volta para a tela anterior
    } else {
      Alert.alert('Erro ao adicionar coordenadas. Tente novamente.');
    }
  };

  return (
    <View>
      <Text>Add Coordenadas</Text>
      <TextInput
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Animal ID"
        value={animalId}
        onChangeText={setAnimalId}
      />
      <Button title="Adicionar Coordenadas" onPress={handleSubmit} />
    </View>
  );
};

export default AddCoordenadas;

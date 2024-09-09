import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { editarCoordenadas } from '../../utils/servidor_real'; // Importe a função correta

const EditCoordenadas = ({ route, navigation }) => {
  const { coordenada } = route.params;
  const [latitude, setLatitude] = useState(coordenada.latitude.toString());
  const [longitude, setLongitude] = useState(coordenada.longitude.toString());

  const handleSubmit = async () => {
    const updatedCoordenada = { id: coordenada.id, latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    
    const success = await editarCoordenadas(updatedCoordenada);
    if (success) {
      Alert.alert('Coordenadas atualizadas com sucesso!');
      navigation.goBack(); // Volta para a tela anterior
    } else {
      Alert.alert('Erro ao atualizar coordenadas. Tente novamente.');
    }
  };

  return (
    <View>
      <Text>Edit Coordenadas</Text>
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
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default EditCoordenadas;

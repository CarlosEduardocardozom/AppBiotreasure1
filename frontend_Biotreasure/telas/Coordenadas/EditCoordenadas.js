import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { editarCoordenadas, lerAnimais } from '../../utils/servidor_real'; 
import { Picker } from '@react-native-picker/picker'; 

const EditCoordenada = ({ route, navigation }) => {
  const { coordenadaId } = route.params;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [animalId, setAnimalId] = useState(null);
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    const fetchCoordenada = async () => {
      // Suponha que temos um método para obter uma coordenada específica
      const coordenada = await lerCoordenadas(coordenadaId);
      setLatitude(coordenada.latitude);
      setLongitude(coordenada.longitude);
      setAnimalId(coordenada.animal_id);
    };

    const fetchAnimais = async () => {
      const listaAnimais = await lerAnimais();
      setAnimais(listaAnimais);
    };

    fetchCoordenada();
    fetchAnimais();
  }, [coordenadaId]);

  const handleEditCoordenada = async () => {
    if (!latitude || !longitude || !animalId) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    const coordenada = { id: coordenadaId, latitude, longitude, animal_id: animalId };
    try {
      const edited = await editarCoordenadas(coordenada);
      if (edited) {
        Alert.alert('Sucesso', 'Coordenada editada com sucesso!');
        navigation.navigate('ListCoordenadas');
      } else {
        Alert.alert('Erro', 'Falha ao editar a coordenada.');
      }
    } catch (error) {
      console.error('Erro ao editar coordenada:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao editar a coordenada.');
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
        value={animalId}
        onValueChange={(itemValue) => setAnimalId(itemValue)}
        style={styles.picker}
      >
        {animais.map((animal) => (
          <Picker.Item key={animal.id} label={animal.nome} value={animal.id} />
        ))}
      </Picker>
      <Button title="Salvar" onPress={handleEditCoordenada} />
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

export default EditCoordenada;

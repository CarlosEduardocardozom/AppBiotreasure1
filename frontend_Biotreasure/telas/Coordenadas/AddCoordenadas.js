import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { adicionarCoordenadas, lerAnimais } from '../../utils/servidor_real'; // Ajuste o caminho e adicione a função para buscar os animais
import { Picker } from "@react-native-picker/picker";

const AddCoordenadas = ({ navigation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [animais, setAnimais] = useState([]); // Estado para armazenar os animais

  // Define o botão de navegação no canto superior esquerdo
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()} // Volta para a tela anterior
          title="Voltar"
          color="#000"
        />
      ),
    });
  }, [navigation]);

  // Carrega os animais para o Picker ao montar o componente
  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const data = await lerAnimais();
        console.log('Animais obtidos:', data); // Adicione este log para verificar os dados
        setAnimais(data); // Armazena os animais obtidos no estado
      } catch (error) {
        console.error('Erro ao buscar animais:', error); // Adicione este log para verificar erros
      }
    };
    
    fetchAnimais();
  }, []);

  const handleSubmit = async () => {
    if (!latitude || !longitude || !animalId) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    const coordenada = { 
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      animal_id: animalId 
    };

    try {
      const success = await adicionarCoordenadas(coordenada);
      if (success) {
        Alert.alert('Coordenadas adicionadas com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      } else {
        Alert.alert('Erro ao adicionar coordenadas. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro ao adicionar coordenadas. Tente novamente.');
      console.error('Erro ao adicionar coordenadas:', error); // Adicione este log para verificar erros
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
      <Picker
          selectedValue={animalId}
          onValueChange={(value) => setAnimalId(value)}
          style={styles.item}
      >
        <Picker.Item label="Selecione um animal" value="" />
        {animais.map((animal) => (
            <Picker.Item key={animal.id} label={animal.nome} value={animal.id} />
        ))}
      </Picker>
      <Button title="Adicionar Coordenadas" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    width: 300,
  },
});

export default AddCoordenadas;

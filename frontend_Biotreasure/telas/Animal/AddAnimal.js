import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { adicionarAnimal } from '../../utils/servidor_real'; // Ajuste o caminho
import { Picker } from "@react-native-picker/picker";
const AddAnimal = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cientifico, setCientifico] = useState('');
  const [coordenadas, setCoordenadas] = useState('');

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

  const handleAddAnimal = async () => {
    const animal = { nome, cientifico, coordenadas };
    const added = await adicionarAnimal(animal);
    if (added) {
      Alert.alert('Sucesso', 'Animal adicionado com sucesso!');
      navigation.navigate('ListAnimal');
    } else {
      Alert.alert('Erro', 'Falha ao adicionar o animal.');
    }
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text>Nome Científico:</Text>
      <TextInput value={cientifico} onChangeText={setCientifico} />
      <Text>Coordenadas:</Text>
      <TextInput value={coordenadas} onChangeText={setCoordenadas} />
      <Button title="Adicionar" onPress={handleAddAnimal} />
    </View>
  );
};

export default AddAnimal;
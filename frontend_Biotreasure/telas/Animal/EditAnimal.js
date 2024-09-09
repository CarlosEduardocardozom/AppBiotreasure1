import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { editarAnimal } from '../../utils/servidor_real'; // Ajuste o caminho

const EditAnimal = ({ route, navigation }) => {
  const { animal } = route.params;
  const [nome, setNome] = useState(animal.nome);
  const [cientifico, setCientifico] = useState(animal.cientifico);
  const [coordenadas, setCoordenadas] = useState(animal.coordenadas);

  const handleEditAnimal = async () => {
    const updatedAnimal = { ...animal, nome, cientifico, coordenadas };
    const edited = await editarAnimal(updatedAnimal);
    if (edited) {
      Alert.alert('Sucesso', 'Animal editado com sucesso!');
      navigation.navigate('ListAnimal');
    } else {
      Alert.alert('Erro', 'Falha ao editar o animal.');
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
      <Button title="Salvar" onPress={handleEditAnimal} />
    </View>
  );
};

export default EditAnimal;

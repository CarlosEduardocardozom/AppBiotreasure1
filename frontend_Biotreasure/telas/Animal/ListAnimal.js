import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { lerAnimais, removerAnimal } from '../../utils/servidor_real'; // Ajuste o caminho para onde você armazenou suas funções

const ListAnimal = ({ navigation }) => {
  const [animais, setAnimais] = useState([]);

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

  useEffect(() => {
    const fetchAnimais = async () => {
      const data = await lerAnimais();
      setAnimais(data);
    };

    fetchAnimais();
  }, []);

  const handleRemoveAnimal = async (animal) => {
    const removed = await removerAnimal(animal);
    if (removed) {
      setAnimais(animais.filter(item => item.id !== animal.id));
      Alert.alert('Sucesso', 'Animal removido com sucesso!');
    } else {
      Alert.alert('Erro', 'Falha ao remover o animal.');
    }
  };

  return (
    <View>
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('EditAnimal', { animal: item })} />
            <Button title="Remover" onPress={() => handleRemoveAnimal(item)} />
          </View>
        )}
      />
      <Button title="Adicionar Animal" onPress={() => navigation.navigate('AddAnimal')} />
    </View>
  );
};

export default ListAnimal;
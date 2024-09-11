import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
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
      setAnimais(animais.filter(a => a.id !== animal.id));
      Alert.alert('Sucesso', 'Animal removido com sucesso!');
    } else {
      Alert.alert('Erro', 'Falha ao remover o animal.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={animais}
        keyExtractor={(animal) => animal.id.toString()}
        renderItem={({ item: animal }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{animal.nome}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditAnimal', { animal })}
              />
              <Button
                title="Remover"
                onPress={() => handleRemoveAnimal(animal)}
                color="red"
              />
            </View>
          </View>
        )}
      />
      <Button title="Adicionar Animal" onPress={() => navigation.navigate('AddAnimal')} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListAnimal;

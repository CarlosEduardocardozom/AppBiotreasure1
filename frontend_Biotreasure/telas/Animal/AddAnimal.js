import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { adicionarAnimal } from '../../utils/servidor_real'; 
// Ajuste o caminho

const AddAnimal = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cientifico, setCientifico] = useState('');

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
    // Validação dos campos
    if (!nome || !cientifico) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    const animal = { nome, cientifico };
    try {
      const added = await adicionarAnimal(animal);
      if (added) {
        Alert.alert('Sucesso', 'Animal adicionado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Principal') } // Navega para a página principal após o alerta
        ]);
      } else {
        Alert.alert('Erro', 'Falha ao adicionar o animal.');
      }
    } catch (error) {
      console.error('Erro ao adicionar animal:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o animal.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>Nome Científico:</Text>
      <TextInput
        style={styles.input}
        value={cientifico}
        onChangeText={setCientifico}
      />
      <Button title="Adicionar" onPress={handleAddAnimal} color="green"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddAnimal;

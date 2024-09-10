import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { editarAnimal } from '../../utils/servidor_real'; // Ajuste o caminho

const EditAnimal = ({ route, navigation }) => {
  const { animal } = route.params;
  const [nome, setNome] = useState(animal.nome);
  const [cientifico, setCientifico] = useState(animal.cientifico);

  // Adiciona um botão "Voltar" no canto superior esquerdo
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()} // Navega de volta para a tela anterior
          title="Voltar"
          color="#000"
        />
      ),
    });
  }, [navigation]);

  const handleEditAnimal = async () => {
    // Validação dos campos
    if (!nome || !cientifico) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const updatedAnimal = { ...animal, nome, cientifico };
    try {
      const edited = await editarAnimal(updatedAnimal);
      if (edited) {
        alert('Sucesso', 'Animal editado com sucesso!');
        navigate('ListAnimal');
      } else {
        alert('Erro', 'Falha ao editar o animal.');
      }
    } catch (error) {
      console.error('Erro ao editar animal:', error);
      alert('Erro', 'Ocorreu um erro ao editar o animal.');
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
      <Button title="Salvar" onPress={handleEditAnimal} />
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

export default EditAnimal;

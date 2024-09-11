import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { lerCoordenadas, removerCoordenadas } from '../../utils/servidor_real'; // Ajuste o caminho para as funções do servidor

const ListCoordenadas = ({ navigation }) => {
  const [coordenadas, setCoordenadas] = useState([]);

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
    const fetchCoordenadas = async () => {
      const data = await lerCoordenadas();
      setCoordenadas(data);
    };

    fetchCoordenadas();
  }, []);

  // Função para remover uma coordenada
  const handleRemoveCoordenada = async (coordenada) => {
    const removed = await removerCoordenadas(coordenada);
    if (removed) {
      setCoordenadas(coordenadas.filter(c => c.id !== coordenada.id)); // Remove da lista localmente
      Alert.alert('Sucesso', 'Coordenada removida com sucesso!');
    } else {
      Alert.alert('Erro', 'Falha ao remover a coordenada.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coordenadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Latitude: {item.latitude}</Text>
            <Text style={styles.itemText}>Longitude: {item.longitude}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditCoordenadas', { coordenadaId: item.id })} // Passa o ID para edição
              />
              <Button
                title="Remover"
                onPress={() => handleRemoveCoordenada(item)} // Função de remoção
                color="red"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhuma coordenada encontrada.</Text>}
      />
      <Button
        title="Adicionar Coordenada"
        onPress={() => navigation.navigate('AddCoordenadas')} // Navega para a tela de adicionar coordenada
      />
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

export default ListCoordenadas;

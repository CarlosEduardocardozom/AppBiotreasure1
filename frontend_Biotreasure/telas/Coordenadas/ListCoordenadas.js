import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { lerCoordenadas } from '../../utils/servidor_real'; // Certifique-se de ter a função para ler coordenadas

const ListCoordenadas = ({ navigation }) => {
  const [coordenadas, setCoordenadas] = useState([]);

  const fetchCoordenadas = async () => {
    const data = await lerCoordenadas();
    setCoordenadas(data || []);
  };

  useEffect(() => {
    fetchCoordenadas();
  }, []);

  const handleEdit = (coordenada) => {
    navigation.navigate('EditCoordenadas', { coordenada });
  };

  return (
    <View>
      <Text>Lista de Coordenadas</Text>
      <FlatList
        data={coordenadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>
            <Button title="Editar" onPress={() => handleEdit(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default ListCoordenadas;

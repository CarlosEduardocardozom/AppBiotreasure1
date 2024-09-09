import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native'
import { DataTable, FAB, Appbar } from 'react-native-paper'
import { useState, useEffect } from 'react'

import servidor from '../utils/servidor_real'

export default function Principal({ navigation }) {
  const [animais, setAnimais] = useState([])

  function verDetalhes(animal) {
    navigation.navigate('Detalhes', animal)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let animais = await servidor.lerAnimais()

      if (animais) {
        setAnimais(animais)
      } else {
        console.log(erro)
        alert("Erro ao tentar ler os animais")
      }
    });

    return unsubscribe;
  }, [navigation])

  return (
    <>
      <Appbar>
        <Appbar.Content title="Lista de registros dos animais" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nome do Animal</DataTable.Title>
            <DataTable.Title>Nome Cientifico</DataTable.Title>
            <DataTable.Title numeric>Latitude</DataTable.Title>
            <DataTable.Title numeric>Longitude</DataTable.Title>
          </DataTable.Header>

          {animais.map((animal) => (
            <DataTable.Row
              key={animal.id}
              onPress={() => verDetalhes(animal)}
            >
              <DataTable.Cell>{animal.nome}</DataTable.Cell>
              <DataTable.Cell>{animal.cientifico}</DataTable.Cell>
              <DataTable.Cell numeric>{animal.latitude}</DataTable.Cell>
              <DataTable.Cell numeric>{animal.longitude}</DataTable.Cell>
            </DataTable.Row>
          ))}

        </DataTable>

        <StatusBar mode="auto" />

      </SafeAreaView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Adicionar')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'green'
  }
});
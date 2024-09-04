import { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

import servidor from '../utils/servidor'

export default function Adicionar({ navigation }) {
  const [nome, setNome] = useState('')
  const [cientifico, setCientifico] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  async function adicionarAnimal() {
    let resp = await servidor.adicionarAnimal({
      nome: nome,
      cientifico: cientifico,
      latitude: latitude,
      longitude:longitude
    })
    if(resp) {
      alert("Animal adicionado com sucesso")
      setNome("")
      setCientifico("")
      setLatitude("")
      setLongitude("")
    } else {
      alert("Erro ao tentar adicionar o animal")
    }
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Adicionar um Animal" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.item}
          label="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.item}
          label="Nome Cientifico"
          value={cientifico}
          onChangeText={setCientifico}
        />

        <TextInput
          style={styles.item}
          label="Latitude"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.item}
          label="Longitude"
          value={longitude}
          onChangeText={setLongitude}
        />

        <Button
          mode="contained"
          style={styles.botao}
          icon="plus"
          onPress={adicionarAnimal}>Adicionar animal
        </Button>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20
  },
  item: {
    marginBottom: 5
  },
  botao: {
    marginTop: 20
  }
})
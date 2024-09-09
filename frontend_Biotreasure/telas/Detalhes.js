import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'

import servidor from '../utils/servidor_real'

export default function Adicionar({ route, navigation }) {
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [cientifico, setCientifico] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  async function removerAnimal() {
    let resp = await servidor.removerAnimal({
      id: id,
      nome: nome,
      cientifico: cientifico,
      latitude:latitude,
      longitude:longitude
    })
    
    if(resp) {
      alert("Animal removido")
      navigation.navigate("Principal")
    } else {
      alert("Erro ao remover Animal")
    }
  }

  async function editarAnimal() {
    let resp = await servidor.editarAnimal({
      id: id,
      nome: nome,
      cientifico: cientifico,
      latitude:latitude,
      longitude:longitude
    })
    
    if(resp){
      alert("Animal editado")
      navigation.navigate("Principal")
    } else {
      alert("Erro ao editar o Animal")
    }
  }

  // configura os valores a partir dos que foram passados na navegação
  useEffect(() => {
    const animal = route.params
    if (animal) {
      setId(animal.id)
      setNome(animal.nome)
      setCientifico(animal.cientifico)
      setLatitude(animal.latitude)
      setLongitude(animal.longitude)
    }
  }, [route.params])

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Detalhes" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.item}
          label="ID"
          value={id}
          readOnly={true}
          onChangeText={setId}
        />

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


        <View style={styles.barraBotao}>
          <Button
            mode="contained"
            style={styles.botao}
            icon="delete"
            onPress={removerAnimal}>Remover
          </Button>

          <Button
            mode="contained"
            style={styles.botao}
            icon="file-edit"
            onPress={editarAnimal}>Editar
          </Button>
        </View>

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
    margin: 5,
    marginTop: 20,
    flexGrow: 1
  },
  barraBotao: {
    width: '100%',
    flexDirection: 'row'
  }
})
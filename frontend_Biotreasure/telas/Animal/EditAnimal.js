import { editarAnimal } from '../../utils/servidor_real'; // Ajuste o caminho

const EditAnimal = ({ route, navigation }) => {
  const { animal } = route.params;
  const [nome, setNome] = useState(animal.nome);
  const [cientifico, setCientifico] = useState(animal.cientifico);
  const [coordenadas, setCoordenadas] = useState(animal.coordenadas);

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
// Principal.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Principal({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biotreasure</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Listar Animais"
          onPress={() => navigation.navigate('ListAnimal')}
          color="green"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Listar Coordenadas"
          onPress={() => navigation.navigate('ListCoordenadas')}
          color="green"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green'
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200
  }
});

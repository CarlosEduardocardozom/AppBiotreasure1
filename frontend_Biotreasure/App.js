import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider, DefaultTheme } from 'react-native-paper'

import Principal from './telas/Principal'

import AddAnimal from './telas/Animal/AddAnimal'
import ListAnimal from './telas/Animal/ListAnimal'
import EditAnimal from './telas/Animal/EditAnimal'

import AddCoordenadas from './telas/Coordenadas/AddCoordenadas'
import ListCoordenadas from './telas/Coordenadas/ListCoordenadas'
import EditCoordenadas from './telas/Coordenadas/EditCoordenadas'

const Stack = createStackNavigator()

const tema = {
  ...DefaultTheme,
  roundness:6,
  colors: {
    ...DefaultTheme.colors,
    primary:'green',
    accent:'#9400D3'
  }
}

export default function App() {
  return (
    <Provider theme={tema}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Principal" component={Principal} />
          <Stack.Screen name="AddAnimal" component={AddAnimal} />
          <Stack.Screen name="ListAnimal" component={ListAnimal} />
          <Stack.Screen name="EditAnimal" component={EditAnimal} />
          <Stack.Screen name="AddCoordenadas" component={AddCoordenadas} />
          <Stack.Screen name="ListCoordenadas" component={ListCoordenadas} />
          <Stack.Screen name="EditCoordenadas" component={EditCoordenadas} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
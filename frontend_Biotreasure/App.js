import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider, DefaultTheme } from 'react-native-paper'


import Principal from './telas/Principal'
import Adicionar from './telas/Adicionar'
import Detalhes from './telas/Detalhes'

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
          <Stack.Screen name="Adicionar" component={Adicionar} />
          <Stack.Screen name="Detalhes" component={Detalhes} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
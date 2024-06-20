import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import toolBarStyle from "./src/navigation/toolBarStyle";
import Home from "./src/screens/home";
import Breathing from "./src/screens/breathing";
import Daily from "./src/screens/daily";
import Meditation from "./src/screens/meditation";
import Relax from "./src/screens/relax";
import Reports from "./src/screens/reports";
import Professionals from "./src/screens/professionals";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  /*Contéudo das telas*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="inicio" screenOptions={toolBarStyle}>
        <Stack.Screen name="Início" component={Home}></Stack.Screen>
        <Stack.Screen name="Respire" component={Breathing}></Stack.Screen>
        <Stack.Screen name="Diario" component={Daily}></Stack.Screen>
        <Stack.Screen name="Meditação" component={Meditation}></Stack.Screen>
        <Stack.Screen name="Relaxe" component={Relax}></Stack.Screen>
        <Stack.Screen name="Relatórios" component={Reports}></Stack.Screen>
        <Stack.Screen name="Profissionais" component={Professionals}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

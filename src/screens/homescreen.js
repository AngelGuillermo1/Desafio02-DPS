import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormularioEgreso from "./FormularioEgreso";
import FormularioIngreso from "./FormularioIngreso";
import Resultados from "./Resultados";
import Inicio from "./Inicio";

// Crea el stack para las pantallas de formularios
const FormStack = createStackNavigator();

function FormStackScreen() {
    return (
      <FormStack.Navigator>
        <FormStack.Screen name="Inicio" component={Inicio} />
        <FormStack.Screen name="FormularioIngreso" component={FormularioIngreso} />
        <FormStack.Screen name="FormularioEgreso" component={FormularioEgreso} />
        <FormStack.Screen name="Resultados" component={Resultados} />
      </FormStack.Navigator>
    );
}

// Define el componente para la pantalla de Prestaciones
const PrestacionesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Prestaciones (aún por crear)</Text>
    </View>
  );
};

// Crea el tab navigator
const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Formularios" 
          component={FormStackScreen} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2875/2875409.png' }} 
                style={{ width: size, height: size, tintColor: color }} 
              />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={[styles.tabLabel, { color }]}>Formularios</Text>
            ),
          }} 
        />
        <Tab.Screen 
          name="Prestaciones" 
          component={PrestacionesScreen} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={{ uri: 'https://cdn-icons-png.freepik.com/512/157/157977.png' }} 
                style={{ width: size, height: size, tintColor: color }} 
              />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={[styles.tabLabel, { color }]}>Prestaciones</Text>
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  tabLabel: {
    fontSize: 16, // Ajusta el tamaño de la fuente aquí
    fontWeight: 'bold', // Opcional: puedes usar 'normal' para un peso de fuente más ligero
  },
});

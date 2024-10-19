import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormularioEgreso from "./FormularioEgreso";
import FormularioIngreso from "./FormularioIngreso";
import Resultados from "./Resultados";
import Prestaciones from "./Prestaciones";
import FormularioRegistro from "./FormularioRegistro";
import Inicio from "./Inicio";

const FormStack = createStackNavigator();

function FormStackScreen() {
    return (
      <FormStack.Navigator>
        <FormStack.Screen name="Inicio" component={Inicio} />
        <FormStack.Screen name="FormularioIngreso" component={FormularioIngreso} />
        <FormStack.Screen name="FormularioEgreso" component={FormularioEgreso} />
        <FormStack.Screen name="Prestaciones" component={Prestaciones} />
        <FormStack.Screen name="FormularioRegistro" component={FormularioRegistro} />
      </FormStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function Home() {
  const [isResultadosEnabled, setResultadosEnabled] = useState(false);

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
        {isResultadosEnabled && (
          <Tab.Screen 
            name="Resultados" 
            component={Resultados} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Image 
                  source={{ uri: 'https://cdn-icons-png.freepik.com/512/157/157977.png' }} 
                  style={{ width: size, height: size, tintColor: color }} 
                />
              ),
              tabBarLabel: ({ color }) => (
                <Text style={[styles.tabLabel, { color }]}>Resultados</Text>
              ),
            }} 
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

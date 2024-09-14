import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormularioEgreso from "./FormularioEgreso";
import FormularioIngreso from "./FormularioIngreso";
import Resultados from "./Resultados";
import Prestaciones from "./Prestaciones"
import Inicio from "./Inicio";

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

const PrestacionesScreen = () => {
  return (
    <FormStack.Navigator>
      <FormStack.Screen name="Prestaciones" component={Prestaciones}/>
    </FormStack.Navigator>
  );
};

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
          name="Ofertas" 
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
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

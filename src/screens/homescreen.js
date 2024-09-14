import React from "react";
<<<<<<< Updated upstream
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./SplashScreen";
=======
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
>>>>>>> Stashed changes
import FormularioEgreso from "./FormularioEgreso";
import FormularioIngreso from "./FormularioIngreso";
import Resultados from "./Resultados";
import Inicio from "./Inicio";

// Crea el stack para las pantallas de formularios
const FormStack = createStackNavigator();

<<<<<<< Updated upstream
const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../img/portada.jpg')} 
                style={styles.coverImage}
                resizeMode="cover"
            />
            <Text style={styles.title}>Bienvenidos a la aplicación de Cálculos de Montos</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('FormularioIngreso')}
            >
                <Text style={styles.buttonText}>Ir al formulario de ingreso</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                {/* SplashScreen */}
                <Stack.Screen 
                    name="Splash" 
                    component={SplashScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen name="FormularioEgreso" component={FormularioEgreso} />
                <Stack.Screen name="FormularioIngreso" component={FormularioIngreso} />
            </Stack.Navigator>
        </NavigationContainer>
=======
function FormStackScreen() {
    return (
      <FormStack.Navigator>
        <FormStack.Screen name="Inicio" component={Inicio} />
        <FormStack.Screen name="FormularioIngreso" component={FormularioIngreso} />
        <FormStack.Screen name="FormularioEgreso" component={FormularioEgreso} />
        <FormStack.Screen name="Resultados" component={Resultados} />
      </FormStack.Navigator>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cyan', 
        padding: 20,
    },
    coverImage: {
        width: '100%', 
        height: 200, 
        marginBottom: 20, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%', 
        alignItems: 'center',
    },
    buttonText: {
        color: '#000', 
        fontSize: 18,
        fontWeight: 'bold',
    },
=======
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
>>>>>>> Stashed changes
});

import React from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./SplashScreen";
import FormularioEgreso from "./FormularioEgreso";
import FormularioIngreso from "./FormularioIngreso";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../img/portada.jpg')} 
                style={styles.coverImage}
                resizeMode="cover"
            />
            <Text style={styles.title}>Bienvenidos a la aplicación de cálculos de montos</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff', 
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
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%', 
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', 
        fontSize: 18,
        fontWeight: 'bold',
    },
});

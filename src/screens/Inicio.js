import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Inicio = ({ navigation }) => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Inicio;

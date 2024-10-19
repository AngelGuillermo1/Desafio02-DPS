import React from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';

const FormularioRegistro = ({ route }) => {
    const { producto } = route.params;

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://192.168.1.12:3000/productos', {
                detalle: values.carnet, // Cambia según tu estructura
                nombre_completo: `${values.nombres} ${values.apellidos}`,
                foto_carnet: values.FotoPerfil, // Asegúrate de que esto sea un base64 o URL
                foto_selfie: values.FotoPerfil, // Usa otra foto si es necesario
                direccion: values.Direccion,
                telefono: values.Telefono,
                
            });
            Alert.alert('Éxito', 'Producto registrado correctamente');
            console.log(response.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo registrar el producto');
            console.error(error);
        }
    };

    return (
        <Formik
            initialValues={{ nombres: '', apellidos: '', carnet: '', FotoPerfil: '', Direccion: '', Telefono: '' }}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleSubmit, values }) => (
                <FlatList
                    data={producto}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => (
                        <View style={styles.container}>
                            <Text style={styles.title}>Formulario de Egresos</Text>
                            <TextInput placeholder="Nombres" onChangeText={handleChange('nombres')} value={values.nombres} style={styles.input} />
                            <TextInput placeholder="Apellidos" onChangeText={handleChange('apellidos')} value={values.apellidos} style={styles.input} />
                            <TextInput placeholder="Carnet" onChangeText={handleChange('carnet')} value={values.carnet} style={styles.input} />
                            <TextInput placeholder="FotoPerfil (base64 o URL)" onChangeText={handleChange('FotoPerfil')} value={values.FotoPerfil} style={styles.input} />
                            <TextInput placeholder="Dirección" onChangeText={handleChange('Direccion')} value={values.Direccion} style={styles.input} />
                            <TextInput placeholder="Teléfono" onChangeText={handleChange('Telefono')} value={values.Telefono} style={styles.input} />
                            <Button title="Registrar Producto" onPress={handleSubmit} />
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>Productos recientemente ofertados: - {item}</Text>
                    )}
                />
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    listItem: {
        padding: 10,
        fontSize: 18,
    },
});

export default FormularioRegistro;

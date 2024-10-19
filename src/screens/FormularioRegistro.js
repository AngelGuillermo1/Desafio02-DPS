import React from 'react';
import { View, TextInput, StyleSheet, Text, FlatList } from 'react-native';
import { Formik } from 'formik';

const FormularioRegistro = ({ route }) => {
    const { producto } = route.params;

    return (
        <Formik
            initialValues={{ nombres: '', apellidos: '', carnet: '', FotoPerfil: '', Direccion: '', Telefono: ''}}
        >
            {({ handleChange, values }) => (
                <FlatList
                    data={producto}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => (
                        <View style={styles.container}>
                            <Text style={styles.title}>Formulario de Egresos</Text>
                            <TextInput placeholder="nombres" onChangeText={handleChange('nombres')} value={values.nombres} style={styles.input} />
                            <TextInput placeholder="apellidos" onChangeText={handleChange('apellidos')} value={values.apellidos} style={styles.input}/>
                            <TextInput placeholder="carnet" onChangeText={handleChange('carnet')} value={values.carnet} style={styles.input}/>
                            <TextInput placeholder="FotoPerfil" onChangeText={handleChange('FotoPerfil')} value={values.FotoPerfil} style={styles.input}/>
                            <TextInput placeholder="Direccion" onChangeText={handleChange('Direccion')} value={values.Direccion} style={styles.input}/>
                            <TextInput placeholder="Telefono" onChangeText={handleChange('Telefono')} value={values.Telefono} style={styles.input}/>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>Productos recientemente ofertados: -{item}</Text>
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

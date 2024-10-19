import React from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import CapturePhotos from './CapturePhotos'; // Asegúrate de importar el componente

const FormularioRegistro = ({ route }) => {
  const { producto } = route.params;

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://192.168.1.12:3000/productos', {
        detalle: values.carnet,
        nombre_completo: `${values.nombres} ${values.apellidos}`,
        foto_carnet: values.foto_carnet, // Aquí se usa la foto en base64
        foto_selfie: values.foto_selfie, // Aquí se usa la selfie en base64
        direccion: values.Direccion,
        telefono: values.Telefono,
      });
      Alert.alert('Éxito', 'Producto registrado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el producto');
    }
  };

  return (
    <Formik
      initialValues={{ nombres: '', apellidos: '', carnet: '', foto_carnet: '', foto_selfie: '', Direccion: '', Telefono: '' }}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, setFieldValue, values }) => (
        <FlatList
          data={producto}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <View style={styles.container}>
              <Text style={styles.title}>Formulario de Egresos</Text>
              <TextInput placeholder="Nombres" onChangeText={handleChange('nombres')} value={values.nombres} style={styles.input} />
              <TextInput placeholder="Apellidos" onChangeText={handleChange('apellidos')} value={values.apellidos} style={styles.input} />
              <TextInput placeholder="Dirección" onChangeText={handleChange('Direccion')} value={values.Direccion} style={styles.input} />
              <TextInput placeholder="Teléfono" onChangeText={handleChange('Telefono')} value={values.Telefono} style={styles.input} />

              {/* Componente de captura de fotos */}
              <CapturePhotos setFieldValue={setFieldValue} />

              <Button title="Registrar Producto" onPress={handleSubmit} />
            </View>
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
});

export default FormularioRegistro;

import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  hipoteca: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
  Canasta: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
  Prestamos: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
  Transporte: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
  Servicios: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
  Seguro: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
  Varios: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Solo se permiten números")
    .default('0'),
}).test(
  'at-least-one-required',
  'Al menos uno de los campos debe estar lleno',
  values => values.hipoteca.trim() !== '' || 
            values.Canasta.trim() !== '' || 
            values.Prestamos.trim() !== '' || 
            values.Transporte.trim() !== '' || 
            values.Servicios.trim() !== '' || 
            values.Seguro.trim() !== '' || 
            values.Varios.trim() !== ''
);

const FormularioEgreso = () => {
  const handleSubmit = (values, { resetForm }) => {
    Alert.alert('Formulario Enviado');
    resetForm(); // Vaciar los campos después de enviar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Egresos</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          hipoteca: '',
          Canasta: '',
          Prestamos: '',
          Transporte: '',
          Servicios: '',
          Seguro: '',
          Varios: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <>
            <Text style={styles.texto}>• Alquiler/Hipoteca</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('hipoteca')}
              keyboardType="numeric"
              onBlur={handleBlur('hipoteca')}
              value={values.hipoteca}
              placeholder="Digite el monto de la hipoteca"
            />
            {touched.hipoteca && errors.hipoteca && (
              <Text style={styles.errorText}>{errors.hipoteca}</Text>
            )}

            <Text style={styles.texto}>• Canasta Básica</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Canasta')}
              keyboardType="numeric"
              onBlur={handleBlur('Canasta')}
              value={values.Canasta}
              placeholder="Cuanto gasta en víveres"
            />
            {touched.Canasta && errors.Canasta && (
              <Text style={styles.errorText}>{errors.Canasta}</Text>
            )}

            <Text style={styles.texto}>• Prestamos</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Prestamos')}
              keyboardType="numeric"
              onBlur={handleBlur('Prestamos')}
              value={values.Prestamos}
              placeholder="Monto en prestamos"
            />
            {touched.Prestamos && errors.Prestamos && (
              <Text style={styles.errorText}>{errors.Prestamos}</Text>
            )}

            <Text style={styles.texto}>• Transporte</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Transporte')}
              keyboardType="numeric"
              onBlur={handleBlur('Transporte')}
              value={values.Transporte}
              placeholder="Costo del transporte"
            />
            {touched.Transporte && errors.Transporte && (
              <Text style={styles.errorText}>{errors.Transporte}</Text>
            )}

            <Text style={styles.texto}>• Servicios</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Servicios')}
              keyboardType="numeric"
              onBlur={handleBlur('Servicios')}
              value={values.Servicios}
              placeholder="Cuanto gasta en servicios"
            />
            {touched.Servicios && errors.Servicios && (
              <Text style={styles.errorText}>{errors.Servicios}</Text>
            )}

            <Text style={styles.texto}>• Seguro</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Seguro')}
              keyboardType="numeric"
              onBlur={handleBlur('Seguro')}
              value={values.Seguro}
              placeholder="El costo de los seguros"
            />
            {touched.Seguro && errors.Seguro && (
              <Text style={styles.errorText}>{errors.Seguro}</Text>
            )}

            <Text style={styles.texto}>• Gastos varios</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Varios')}
              keyboardType="numeric"
              onBlur={handleBlur('Varios')}
              value={values.Varios}
              placeholder="Establecer si tiene gastos varios"
            />
            {touched.Varios && errors.Varios && (
              <Text style={styles.errorText}>{errors.Varios}</Text>
            )}

            <Button
              title="Enviar"
              onPress={handleSubmit}
              disabled={
                !(
                  values.hipoteca.trim() !== '' || 
                  values.Canasta.trim() !== '' || 
                  values.Prestamos.trim() !== '' || 
                  values.Transporte.trim() !== '' || 
                  values.Servicios.trim() !== '' || 
                  values.Seguro.trim() !== '' || 
                  values.Varios.trim() !== ''
                )
              }
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    borderColor:'cyan'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,    
    fontWeight: 'bold', 
    marginBottom: 24,  
    textAlign: 'center' 
  }
});

export default FormularioEgreso;
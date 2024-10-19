import React from "react";
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validación de formulario
const validationSchema = Yup.object().shape({
  hipoteca: Yup.number().default(0),
  canasta: Yup.number().default(0),
  prestamos: Yup.number().default(0),
  transporte: Yup.number().default(0),
  servicios: Yup.number().default(0),
  seguro: Yup.number().default(0),
  varios: Yup.number().default(0),
}).test(
  'at-least-one-required',
  'Al menos uno de los campos debe estar lleno',
  values => Object.values(values).some(val => val !== 0)
);

const FormularioEgreso = ({ navigation, route, setResultadosEnabled }) => {
  const { ingresos } = route.params;

  const handleSubmit = (values) => {
    const totalEgresos = Object.values(values).reduce((sum, curr) => sum + Number(curr || 0), 0);
    setResultadosEnabled(true); // Habilitar la pestaña "Resultados"
    navigation.navigate('Resultados', { ingresos, egresos: Object.entries(values).map(([tipo, monto]) => ({ tipo, monto: Number(monto) })) });
    navigation.navigate('Prestaciones', { ingresos, egresos: Object.entries(values).map(([tipo, monto]) => ({ tipo, monto: Number(monto) })) });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Egresos</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ hipoteca: '', canasta: '', prestamos: '', transporte: '', servicios: '', seguro: '', varios: '' }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <TextInput placeholder="Hipoteca" onChangeText={handleChange('hipoteca')} value={values.hipoteca} style={styles.input} keyboardType="numeric" />
              <TextInput placeholder="Canasta" onChangeText={handleChange('canasta')} value={values.canasta} style={styles.input} keyboardType="numeric" />
              <TextInput placeholder="Prestamos" onChangeText={handleChange('prestamos')} value={values.prestamos} style={styles.input} keyboardType="numeric" />
              <TextInput placeholder="Transporte" onChangeText={handleChange('transporte')} value={values.transporte} style={styles.input} keyboardType="numeric" />
              <TextInput placeholder="Servicios" onChangeText={handleChange('servicios')} value={values.servicios} style={styles.input} keyboardType="numeric" />
              <TextInput placeholder="Seguro" onChangeText={handleChange('seguro')} value={values.seguro} style={styles.input} keyboardType="numeric" />
              <TextInput placeholder="Varios" onChangeText={handleChange('varios')} value={values.varios} style={styles.input} keyboardType="numeric" />
              <Button title="Enviar" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default FormularioEgreso;
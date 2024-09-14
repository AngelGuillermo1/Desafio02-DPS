import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const tiposDeIngreso = [
  { label: 'Salario', value: 'Salario' },
  { label: 'Negocio Propio', value: 'Negocio Propio' },
  { label: 'Pensiones', value: 'Pensiones' },
  { label: 'Remesas', value: 'Remesas' },
  { label: 'Ingresos Varios', value: 'Ingresos Varios' },
];

const validationSchema = Yup.object().shape({
  tipoIngreso: Yup.array().min(1, 'Debes seleccionar al menos un tipo de ingreso'),
  montos: Yup.object().shape(
    tiposDeIngreso.reduce((schema, tipo) => {
      schema[tipo.value] = Yup.number().default(0)
        .nullable()
        .typeError(`El monto de ${tipo.label} debe ser un número`)
        .test(
          'is-required',
          `El monto de ${tipo.label} es requerido`,
          function (value) {
            const { tipoIngreso } = this.parent;
            return tipoIngreso && tipoIngreso.includes(tipo.value) ? value !== null && value !== '' : true;
          }
        )
        .test(
          'is-positive',
          'El monto debe ser mayor o igual a 0',
          value => (value !== undefined ? value >= 0 : true) // Acepta mayores o iguales a cero
        );
      return schema;
    }, {})
  ),
});

const FormularioIngreso = ({ navigation }) => {
  const handleSubmit = (values) => {
    const sumIngresos = Object.values(values.montos).reduce((sum, curr) => sum + Number(curr || 0), 0);
    if (sumIngresos > 0) { // Solo permite avanzar si hay al menos un monto
      navigation.navigate('FormularioEgreso', { ingresos: { lista: tiposDeIngreso.map(tipo => ({ tipo: tipo.label, monto: values.montos[tipo.value] || 0 })), total: sumIngresos } });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Ingresos</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ tipoIngreso: [], montos: tiposDeIngreso.reduce((acc, tipo) => ({ ...acc, [tipo.value]: '' }), {}) }} // Inicializa montos
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => {
          const isNextButtonDisabled = values.tipoIngreso.length === 0; // Deshabilitar si no hay ingresos seleccionados

          return (
            <>
              {tiposDeIngreso.map((tipo, index) => (
                <View key={index} style={styles.switchContainer}>
                  <Switch
                    value={values.tipoIngreso.includes(tipo.value)}
                    onValueChange={(newValue) => {
                      if (newValue) {
                        setFieldValue('tipoIngreso', [...values.tipoIngreso, tipo.value]);
                      } else {
                        setFieldValue(
                          'tipoIngreso',
                          values.tipoIngreso.filter(item => item !== tipo.value)
                        );
                        setFieldValue(`montos.${tipo.value}`, '');
                      }
                    }}
                  />
                  <Text>{tipo.label}</Text>
                  {values.tipoIngreso.includes(tipo.value) && (
                    <>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => {
                          const value = text.replace(/[^0-9.]/g, ''); 
                          setFieldValue(`montos.${tipo.value}`, value);
                        }}
                        keyboardType="numeric"
                        placeholder={`Monto de ${tipo.label}`}
                        value={values.montos[tipo.value] || ''}
                      />
                      {/* Mostrar el mensaje de error si existe y el campo ha sido tocado */}
                      {errors.montos && errors.montos[tipo.value] && touched.montos && touched.montos[tipo.value] && (
                        <Text style={styles.error}>{errors.montos[tipo.value]}</Text>
                      )}
                    </>
                  )}
                </View>
              ))}
              <Button title="Siguiente" onPress={handleSubmit} disabled={isNextButtonDisabled} />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#cyan',
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
    marginLeft: 8,
    width: '50%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormularioIngreso;
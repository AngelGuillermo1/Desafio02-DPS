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
      schema[tipo.value] = Yup.number()
        .nullable()
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
          'El monto debe ser mayor que 0',
          value => (value ? value > 0 : true)
        );
      return schema;
    }, {})
  ),
});

const FormularioIngreso = ({ navigation }) => {
  const handleSubmit = (values) => {
    const sumIngresos = Object.values(values.montos).reduce((sum, curr) => sum + Number(curr || 0), 0);
    navigation.navigate('FormularioEgreso', { ingresos: { lista: tiposDeIngreso.map(tipo => ({ tipo: tipo.label, monto: values.montos[tipo.value] || 0 })), total: sumIngresos } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Ingresos</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ tipoIngreso: [], montos: {} }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
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
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange(`montos.${tipo.value}`)}
                    keyboardType="numeric"
                    placeholder={`Monto de ${tipo.label}`}
                    value={values.montos[tipo.value]}
                  />
                )}
              </View>
            ))}
            <Button title="Siguiente" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
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
    marginLeft: 8,
    width: '50%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default FormularioIngreso;

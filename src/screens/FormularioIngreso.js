import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Switch, Modal } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    console.log('Valores al enviar:', values);
    setFormValues(values);
    setModalVisible(true);
    resetForm();
    navigation.navigate('FormularioEgreso');
  };

  const isSubmitDisabled = (values) => {
    if (!Array.isArray(values.tipoIngreso) || values.tipoIngreso.length === 0) return true;

    for (let tipo of values.tipoIngreso) {
      if (!values.montos[tipo] || values.montos[tipo] <= 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Ingresos</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ tipoIngreso: [], montos: {} }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values, setFieldValue }) => (
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
                <Text style={styles.label}>{tipo.label}</Text>
                {values.tipoIngreso.includes(tipo.value) && (
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange(`montos.${tipo.value}`)}
                    keyboardType="numeric"
                    onBlur={handleBlur(`montos.${tipo.value}`)}
                    value={values.montos[tipo.value] ? values.montos[tipo.value].toString() : ''}
                    placeholder={`Monto de ${tipo.label}`}
                  />
                )}
                {touched.montos?.[tipo.value] && errors.montos?.[tipo.value] && (
                  <Text style={styles.errorText}>{errors.montos[tipo.value]}</Text>
                )}
              </View>
            ))}

            <Button
              title="Siguiente"
              onPress={handleSubmit}
              disabled={isSubmitDisabled(values)}
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
    padding: 16,
    backgroundColor: '#fff',
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
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 8,
    width: '50%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default FormularioIngreso;

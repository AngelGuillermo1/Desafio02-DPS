import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Switch, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  hipoteca: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
  canasta: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
  prestamos: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
  transporte: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
  servicios: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
  seguro: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
  varios: Yup.number()
    .typeError('Solo se permiten números')
    .default(0),
}).test(
  'at-least-one-required',
  'Al menos uno de los campos debe estar lleno',
  values => Object.values(values).some(val => val !== 0)
);

const FormularioEgreso = () => {
  const [showHipoteca, setShowHipoteca] = useState(false);
  const [showCanasta, setShowCanasta] = useState(false);
  const [showPrestamos, setShowPrestamos] = useState(false);
  const [showTransporte, setShowTransporte] = useState(false);
  const [showServicios, setShowServicios] = useState(false);
  const [showSeguro, setShowSeguro] = useState(false);
  const [showVarios, setShowVarios] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    const sanitizedValues = {
      hipoteca: values.hipoteca || 0,
      canasta: values.canasta || 0,
      prestamos: values.prestamos || 0,
      transporte: values.transporte || 0,
      servicios: values.servicios || 0,
      seguro: values.seguro || 0,
      varios: values.varios || 0,
    };

    console.log('Valores tomados del formulario de egreso:', sanitizedValues);
    Alert.alert('Formulario Enviado');
    resetForm();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>Formulario de Egresos</Text>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          hipoteca: '',
          canasta: '',
          prestamos: '',
          transporte: '',
          servicios: '',
          seguro: '',
          varios: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowHipoteca}
                value={showHipoteca}
              />
              <Text style={styles.texto}>Alquiler/Hipoteca</Text>
            </View>
            {showHipoteca && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('hipoteca')}
                  keyboardType="numeric"
                  onBlur={handleBlur('hipoteca')}
                  value={values.hipoteca}
                  placeholder="Monto de Hipoteca"
                />
                {touched.hipoteca && errors.hipoteca && (
                  <Text style={styles.errorText}>{errors.hipoteca}</Text>
                )}
              </>
            )}
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowCanasta}
                value={showCanasta}
              />
              <Text style={styles.texto}>Canasta Básica</Text>
            </View>
            {showCanasta && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('canasta')}
                  keyboardType="numeric"
                  onBlur={handleBlur('canasta')}
                  value={values.canasta}
                  placeholder="Monto de Canasta Basica"
                />
                {touched.canasta && errors.canasta && (
                  <Text style={styles.errorText}>{errors.canasta}</Text>
                )}
              </>
            )}
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowPrestamos}
                value={showPrestamos}
              />
              <Text style={styles.texto}>Prestamos</Text>
            </View>
            {showPrestamos && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('prestamos')}
                  keyboardType="numeric"
                  onBlur={handleBlur('prestamos')}
                  value={values.prestamos}
                  placeholder="Monto de Prestamos"
                />
                {touched.prestamos && errors.prestamos && (
                  <Text style={styles.errorText}>{errors.prestamos}</Text>
                )}
              </>
            )}
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowTransporte}
                value={showTransporte}
              />
              <Text style={styles.texto}>Transporte</Text>
            </View>
            {showTransporte && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('transporte')}
                  keyboardType="numeric"
                  onBlur={handleBlur('transporte')}
                  value={values.transporte}
                  placeholder="Monto de Transporte"
                />
                {touched.transporte && errors.transporte && (
                  <Text style={styles.errorText}>{errors.transporte}</Text>
                )}
              </>
            )}
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowServicios}
                value={showServicios}
              />
              <Text style={styles.texto}>Servicios Públicos</Text>
            </View>
            {showServicios && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('servicios')}
                  keyboardType="numeric"
                  onBlur={handleBlur('servicios')}
                  value={values.servicios}
                  placeholder="Monto de Servicios Publicos"
                />
                {touched.servicios && errors.servicios && (
                  <Text style={styles.errorText}>{errors.servicios}</Text>
                )}
              </>
            )}
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowSeguro}
                value={showSeguro}
              />
              <Text style={styles.texto}>Salud y Seguro</Text>
            </View>
            {showSeguro && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('seguro')}
                  keyboardType="numeric"
                  onBlur={handleBlur('seguro')}
                  value={values.seguro}
                  placeholder="Monto de Seguros"
                />
                {touched.seguro && errors.seguro && (
                  <Text style={styles.errorText}>{errors.seguro}</Text>
                )}
              </>
            )}
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={setShowVarios}
                value={showVarios}
              />
              <Text style={styles.texto}>Egresos Varios</Text>
            </View>
            {showVarios && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('varios')}
                  keyboardType="numeric"
                  onBlur={handleBlur('varios')}
                  value={values.varios}
                  placeholder="Monto de Egresos Varios"
                />
                {touched.varios && errors.varios && (
                  <Text style={styles.errorText}>{errors.varios}</Text>
                )}
              </>
            )}

            <Button
              title="Enviar"
              onPress={handleSubmit}
              disabled={!Object.values(values).some(val => val.trim() !== '')}
            />
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
    justifyContent: 'center',
    padding: 16,
    borderColor: 'cyan',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default FormularioEgreso;
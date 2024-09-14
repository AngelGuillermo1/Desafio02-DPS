
import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

const FormularioEgreso = ({ navigation, route }) => {
  const { ingresos } = route.params;

  const handleSubmit = (values) => {
    const totalEgresos = Object.values(values).reduce((sum, curr) => sum + Number(curr || 0), 0);
    navigation.navigate('Resultados', { ingresos, egresos: Object.entries(values).map(([tipo, monto]) => ({ tipo, monto: Number(monto) })) });
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

<<<<<<< Updated upstream
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
=======
              <Button title="Enviar" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </View>
>>>>>>> Stashed changes
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

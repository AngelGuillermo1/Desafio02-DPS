import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

const Prestaciones = ({ navigation, route }) => {
  const { ingresos = { lista: [], total: 0 }, egresos = [] } = route.params || { ingresos: { total: 0 }, egresos: [] };
  const totalEgresos = Array.isArray(egresos) ? egresos.reduce((acc, curr) => acc + (curr.monto || 0), 0) : 0;
  const TotalIngreso = ingresos.total;
  const TotalEgreso = totalEgresos;
  const disponibilidad = (TotalIngreso - TotalEgreso) / TotalIngreso * 100;
  
  const [oferta, setOferta] = useState('');
  const [producto, setProducto] = useState([]);
  const [registro, setRegistro] = useState('');
  const [buttonRegistro, setButtonRegistro] = useState(false);

  const handleSubmit = () => {
    navigation.navigate('FormularioRegistro', {producto});
  };

  useEffect(() => {
    console.log('Ingresos recibidos:', ingresos);
    console.log('Egresos recibidos:', egresos);
    resultadoOfertas();
  }, [TotalIngreso, TotalEgreso, disponibilidad]);

  const resultadoOfertas = () => {
    if (TotalEgreso > TotalIngreso) {
      setOferta('Lo sentimos, usted posee deudas en proceso, le recomendamos saldarlas para ofertarle nuestros productos.');
      setProducto(['Asesor Financiero']);
    } else if (TotalIngreso <= 360) {
      setOferta('Debido al ingreso total que posee, se le califica con una calificación de riesgo alta. Puede apelar a las siguientes opciones:');
      setProducto(['Apertura de cuenta']);
    } else if (TotalIngreso > 360 && TotalIngreso <= 700) {
      if (disponibilidad < 40) {
        setOferta('Calificación de riesgo alta. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta']);
      } else {
        setOferta('Calificación de riesgo suficiente. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Crédito personal hasta $2,000.00']);
      }
    } else if (TotalIngreso > 700 && TotalIngreso <= 1200) {
      if (disponibilidad < 20) {
        setOferta('Calificación de riesgo alta. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta']);
      } else if (disponibilidad >= 20 && disponibilidad < 40) {
        setOferta('Calificación de riesgo suficiente. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Crédito personal hasta $8,000.00']);
      } else {
        setOferta('Calificación de riesgo buena. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $8,000.00']);
      }
    } else if (TotalIngreso > 1200 && TotalIngreso < 3000) {
      if (disponibilidad < 20) {
        setOferta('Calificación de riesgo suficiente. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Crédito personal hasta $2,000.00']);
      } else if (disponibilidad >= 20 && disponibilidad < 40) {
        setOferta('Calificación de riesgo buena. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $25,000.00']);
      } else {
        setOferta('Calificación de riesgo muy buena. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Platinum', 'Crédito personal hasta $25,000.00']);
      }
    } else if (TotalIngreso > 3000) {
      if (disponibilidad < 20) {
        setOferta('Calificación de riesgo buena. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $8,000.00']);
      } else if (disponibilidad >= 20 && disponibilidad < 30) {
        setOferta('Calificación de riesgo muy buena. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $8,000.00']);
      } else {
        setOferta('Calificación de riesgo excelente. Las opciones disponibles son:');
        setProducto(['Apertura de cuenta', 'Tarjeta de Crédito Platinum', 'Tarjeta de crédito Black', 'Crédito personal hasta $50,000.00']);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prestaciones</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Total Ingresos: <Text style={styles.infoValue1}>{TotalIngreso}</Text></Text>
        <Text style={styles.infoText}>Total Egresos: <Text style={styles.infoValue2}>{totalEgresos}</Text></Text>
        <Text style={styles.infoText}>{oferta}</Text>
      </View>
      <Text style={styles.subtitle}>Productos Ofrecidos:</Text>
      <FlatList
        data={producto}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.productItem}>- {item}</Text>}
      />
      <Text style={styles.subtitle}>{registro}</Text>
      <Button title="Registrarse" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
  },
  infoValue1: {
    fontWeight: 'bold',
    color: 'green',
  },
  infoValue2: {
    fontWeight: 'bold',
    color: 'red',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  productItem: {
    fontSize: 16,
    color: '#555555',
  },
});
export default Prestaciones;

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const Resultados = ({ route }) => {
  const { ingresos = { lista: [], total: 0 }, egresos = [] } = route.params;

  // Asegúrate de que egresos es un arreglo antes de usar reduce
  const totalEgresos = Array.isArray(egresos) ? egresos.reduce((acc, curr) => acc + (curr.monto || 0), 0) : 0;
  const ingresosLibres = ingresos.total - totalEgresos;
  const porcentajeLibre = ingresos.total ? ((ingresosLibres / ingresos.total) * 100).toFixed(2) : '0.00';
  const porcentajeOcupado = (100 - parseFloat(porcentajeLibre)).toFixed(2);
  const disponible = ingresos.total - totalEgresos;

  const data = [
    { value: totalEgresos, color: 'red', text: 'Egresos' },
    { value: ingresosLibres, color: 'green', text: 'Ingresos Libres' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Ingresos Totales</Text>
        {ingresos.lista.length > 0 ? (
          ingresos.lista.map((ingreso, index) => (
            <Text key={index} style={styles.item}>
              ${ingreso.monto} - {ingreso.tipo}
            </Text>
          ))
        ) : (
          <Text>No se han registrado ingresos.</Text>
        )}

        <Text style={styles.sectionTitle}>Egresos Totales</Text>
        {egresos.length > 0 ? (
          egresos.map((egreso, index) => (
            <Text key={index} style={styles.item}>
              ${egreso.monto} - {egreso.tipo}
            </Text>
          ))
        ) : (
          <Text>No se han registrado egresos.</Text>
        )}

        <Text style={styles.resultTitle}>Resultado</Text>
        <Text style={styles.total}>Total Ingresos: ${ingresos.total}</Text>
        <Text style={styles.total}>Total Egresos: ${totalEgresos}</Text>
        <Text style={styles.resultTitle}>Disponible</Text>
        <Text style={styles.total}>${disponible}</Text>
        <View style={styles.totalContainer}>
          <View style={styles.redSquare} />
          <Text style={styles.total}>Porcentaje de Ingresos Ocupados: {porcentajeOcupado}%</Text>
        </View>
        <View style={styles.totalContainer}>
          <View style={styles.greenSquare} />
          <Text style={styles.total}>Porcentaje de Ingresos Libres: {porcentajeLibre}%</Text>
        </View>
      </ScrollView>
      
      <PieChart data={data} style={styles.chart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  },
  total: {
    fontSize: 18,
    marginVertical: 5,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  greenSquare: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    marginRight: 10,
  },
  redSquare: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    marginRight: 10,
  },
  chart: {
    marginTop: 20,
    height: 200,
    width: '100%',
  },
});

export default Resultados;



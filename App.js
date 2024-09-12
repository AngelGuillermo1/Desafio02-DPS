import React from "react";
import HomeScreen from './src/screens/homescreen'
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Formulario from "./src/screens/FormularioEgreso";

export default function App(){
  return(
    <SafeAreaView style={styles.container}>
        <Formulario/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor:'#c9f4eb'
    },
  });
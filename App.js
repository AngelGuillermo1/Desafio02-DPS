import React from "react";
import Home from './src/screens/homescreen'
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function App(){
  return(
    <SafeAreaView style={styles.container}>
      <Home/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor:'#ffffff'
    },
  });
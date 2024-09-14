import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Home from './src/screens/homescreen';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Cambia el estado después de que el SplashScreen se haya mostrado
  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SplashScreen navigation={{ replace: handleSplashFinish }} />
      ) : (
        <Home />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor:'#ffffff'
    },
  });
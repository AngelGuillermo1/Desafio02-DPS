import React, { useEffect } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 5000);

    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../img/icon.jpg')} 
        style={[styles.image, { opacity: opacityValue }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default SplashScreen;
import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CapturePhotos = ({ setFieldValue }) => {
  const [photoCarnetBase64, setPhotoCarnetBase64] = useState(null);
  const [photoSelfieBase64, setPhotoSelfieBase64] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se necesitan permisos para acceder a la cámara');
      }
    })();
  }, []);

  const capturePhotoCarnet = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        base64: true, // Habilitar la opción base64
      });

      if (!result.cancelled) {
        const base64Image = result.base64;
        setPhotoCarnetBase64(base64Image);
        setFieldValue('foto_carnet', base64Image); 
        Alert.alert('Foto de carnet guardada');
      } else {
        Alert.alert('No se tomó ninguna foto.');
      }
    } catch (error) {
      Alert.alert('Error al abrir la cámara', error.message);
    }
  };

  const capturePhotoSelfie = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        cameraType: 'front',
        base64: true, // Habilitar la opción base64
      });

      if (!result.cancelled) {
        const base64Image = result.base64;
        setPhotoSelfieBase64(base64Image); 
        setFieldValue('foto_selfie', base64Image); 
        Alert.alert('Selfie guardada');
      } else {
        Alert.alert('No se tomó ninguna selfie.');
      }
    } catch (error) {
      Alert.alert('Error al abrir la cámara', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Tomar Foto de Carnet" onPress={capturePhotoCarnet} />
      </View>
      {photoCarnetBase64 && (
        <Image 
          source={{ uri: `data:image/jpeg;base64,${photoCarnetBase64}` }} 
          style={styles.photo} 
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Tomar Selfie" onPress={capturePhotoSelfie} />
      </View>
      {photoSelfieBase64 && (
        <Image 
          source={{ uri: `data:image/jpeg;base64,${photoSelfieBase64}` }} 
          style={styles.photo} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'flex-start', 
  },
  buttonContainer: {
    width: '100%', 
    marginBottom: 10, 
  },
  photo: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default CapturePhotos;

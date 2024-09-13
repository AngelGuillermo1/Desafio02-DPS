import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormularioEgreso from "./FormularioEgreso";
import FormularioIngreso from "./FormularioIngreso";

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a la aplicacion de calculo de montos</Text>
            <Button
            title="Ir al formulario de Ingreso"
            onPress={() => navigation.navigate('FormularioIngreso')}
            />
        </View>
        
    );
};

export default function Home(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="FormularioEgreso" component={FormularioEgreso}/>
                <Stack.Screen name="FormularioIngreso" component={FormularioIngreso}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      marginBottom: 20,
    },
  });
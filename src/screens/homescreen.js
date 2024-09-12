import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormularioEgreso from "./FormularioEgreso";

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a la aplicacion de calculo de montos</Text>
            <Button
            title="Ir al formulario de egreso"
            onPress={() => navigation.navigate('FormularioEgreso')}
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
// screens/SplashScreen.js
// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { getPin } from '../utils/pinStorage';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    async function init() {
      // Exibe splash por 1.5s
      const storedPin = await getPin();
      setTimeout(() => {
        if (storedPin) {
          // Se já tem PIN, vai para autenticação biométrica
          navigation.replace('Biometria');
        } else {
          // Senão, pede para criar PIN
          navigation.replace('SetPin');
        }
      }, 1500);
    }
    init();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#11111A" barStyle="light-content" />
      <Image
        source={require('../assets/ASARES_1.png')} // coloque seu logo aqui
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11111A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

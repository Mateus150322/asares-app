import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function BiometricAuthScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      const supported = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (supported && enrolled) {
        // Tenta biometria e, se falhar, apresenta fallback para senha/PIN do dispositivo
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Autentique-se para continuar",
          fallbackLabel: "Use a senha do dispositivo",
          disableDeviceFallback: false,
        });
      }
      // Após tentativa de autenticação, segue para Login
      navigation.replace("Login");
    })();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação Biométrica</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18 }
});

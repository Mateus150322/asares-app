// screens/BiometricAuthScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuthStore } from "../store/useAuthStore";

export default function BiometricAuthScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    checkBiometry();
  }, []);

  const checkBiometry = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !enrolled || supportedTypes.length === 0) {
      Alert.alert("Erro", "Biometria não disponível neste dispositivo.");
      navigation.replace("Login");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentique-se para continuar",
      fallbackLabel: "Use o PIN",
    });

    if (result.success) {
      navigation.replace("Home"); // ou tela principal
    } else {
      Alert.alert(
        "Falha na autenticação",
        "Você pode tentar novamente ou usar o login tradicional."
      );
      navigation.replace("Login");
      navigation.replace("LoginPIN");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Verificando biometria...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

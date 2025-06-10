// screens/PinLoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function PinLoginScreen({ navigation }) {
  const { pin } = useAuthStore();
  const [inputPin, setInputPin] = useState("");

  const handlePinSubmit = () => {
    // Debug: mostra valores e tipos
    console.log("Stored PIN:", pin, typeof pin, "Entered PIN:", inputPin, typeof inputPin);

    // Converte ambos para string para garantir comparação correta
    if (inputPin === String(pin)) {
      navigation.replace("Login");
    } else {
      Alert.alert("PIN incorreto", "Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu PIN</Text>
      <TextInput
        style={styles.input}
        value={inputPin}
        onChangeText={setInputPin}
        keyboardType="numeric"
        secureTextEntry
        placeholder="PIN"
        maxLength={pin ? String(pin).length : 4}
      />
      <Button title="Confirmar PIN" onPress={handlePinSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
});

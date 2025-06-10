// screens/SetPinScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function SetPinScreen({ navigation }) {
  const { setPin } = useAuthStore();
  const [newPin, setNewPin] = useState("");

  const handleSetPin = async () => {
    if (!newPin) {
      Alert.alert("Erro", "Digite um PIN válido.");
      return;
    }
    try {
      await setPin(newPin);
      Alert.alert(
        "Sucesso",
        "PIN cadastrado com sucesso!",
        [{ text: "OK", onPress: () => navigation.replace("Login") }],
        { cancelable: false }
      );
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar PIN.");
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie seu PIN de Segurança</Text>
      <TextInput
        style={styles.input}
        value={newPin}
        onChangeText={setNewPin}
        keyboardType="numeric"
        secureTextEntry
        placeholder="Novo PIN"
      />
      <Button title="Salvar PIN" onPress={handleSetPin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20, borderRadius: 5 }
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getPin } from '../utils/pinStorage';

export default function PinLoginScreen({ navigation }) {
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    const storedPin = await getPin();
    if (storedPin === pin) {
      navigation.replace('Home'); // ou Biometria, se quiser em seguida
    } else {
      Alert.alert('Erro', 'PIN incorreto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Digite seu PIN</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { savePin } from '../utils/pinStorage';

export default function SetPinScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSave = async () => {
    if (pin.length !== 4 || isNaN(pin)) {
      Alert.alert('Erro', 'O PIN deve conter 4 dígitos numéricos.');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Erro', 'Os PINs não coincidem.');
      return;
    }

    await savePin(pin);
    Alert.alert('Sucesso', 'PIN salvo com segurança!');
    navigation.replace('Biometria'); // ou vá direto para Home
  };

  return (
    <View style={styles.container}>
      <Text>Crie seu PIN de 4 dígitos</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        placeholder="Digite o PIN"
        value={pin}
        onChangeText={setPin}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        placeholder="Confirme o PIN"
        value={confirmPin}
        onChangeText={setConfirmPin}
      />
      <Button title="Salvar PIN" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});

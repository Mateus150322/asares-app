import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function CadastrarContaScreen({ navigation }) {
  const [banco, setBanco] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');
  const { adicionarConta } = useAppStore();

  const handleSalvar = async () => {
    try {
      await adicionarConta({ banco, saldo_inicial: parseFloat(saldoInicial) });
      Alert.alert('Sucesso', 'Conta salva com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar conta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Banco</Text>
      <TextInput value={banco} onChangeText={setBanco} style={styles.input} />

      <Text style={styles.label}>Saldo Inicial</Text>
      <TextInput
        value={saldoInicial}
        onChangeText={setSaldoInicial}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Salvar Conta" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
});

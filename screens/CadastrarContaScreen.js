import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/useAuthStore';

export default function CadastrarContaScreen({ navigation }) {
  const [nomeBanco, setNomeBanco] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');
  const adicionarConta = useAppStore((state) => state.adicionarConta);

  const handleSalvar = () => {
    if (!nomeBanco || !saldoInicial) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novaConta = {
      id: Date.now(),
      banco: nomeBanco,
      saldo: parseFloat(saldoInicial),
    };

    adicionarConta(novaConta);
    Alert.alert('Sucesso', 'Conta adicionada com sucesso!');
    navigation.goBack(); // ou para tela de contas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Banco</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Nubank, Caixa..."
        value={nomeBanco}
        onChangeText={setNomeBanco}
      />

      <Text style={styles.label}>Saldo Inicial</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 1000.00"
        value={saldoInicial}
        onChangeText={setSaldoInicial}
      />

      <Button title="Salvar Conta" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  label: { marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

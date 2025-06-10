// screens/AdicionarBancoScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarBancoScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();

  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [numero_conta, setNumeroConta] = useState('');
  const [chave_pix, setChavePix] = useState('');
  const [saldo_inicial, setSaldoInicial] = useState('');

  const handleSave = async () => {
    if (!banco || !agencia || !numero_conta || !saldo_inicial) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    }
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('/contas', {
        banco,
        agencia,
        numero_conta,
        chave_pix,
        saldo_inicial: parseFloat(saldo_inicial),
      });
      Alert.alert('Sucesso', 'Banco cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível cadastrar o banco.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Novo Banco</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Banco"
        value={banco}
        onChangeText={setBanco}
      />
      <TextInput
        style={styles.input}
        placeholder="Agência"
        value={agencia}
        onChangeText={setAgencia}
      />
      <TextInput
        style={styles.input}
        placeholder="Número da Conta"
        value={numero_conta}
        onChangeText={setNumeroConta}
      />
      <TextInput
        style={styles.input}
        placeholder="Chave Pix (opcional)"
        value={chave_pix}
        onChangeText={setChavePix}
      />
      <TextInput
        style={styles.input}
        placeholder="Saldo Inicial"
        keyboardType="numeric"
        value={saldo_inicial}
        onChangeText={setSaldoInicial}
      />

      <Button title="Salvar Banco" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, backgroundColor:'#11111A', padding:20, justifyContent:'center' },
  title: { fontSize:22, color:'#00BFFF', marginBottom:20, textAlign:'center' },
  input: { backgroundColor:'#FFF', borderRadius:8, padding:10, marginBottom:15 },
});
// screens/AdicionarContaScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import axios from '../services/api';

export default function AdicionarContaScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();

  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [numero_conta, setNumeroConta] = useState('');
  const [chave_pix, setChavePix] = useState('');
  const [saldo_inicial, setSaldoInicial] = useState('');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const handleSalvarConta = async () => {
    if (!banco || !agencia || !numero_conta || !saldo_inicial) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    }
    try {
      await axios.post('/contas', {
        banco,
        agencia,
        numero_conta,
        chave_pix: chave_pix || null,
        saldo_inicial: parseFloat(saldo_inicial),
      });
      Alert.alert('Sucesso', 'Conta cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data || error);
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Falha ao cadastrar a conta.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Conta Bancária</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Banco"
        value={banco}
        onChangeText={setBanco}
      />
      <TextInput
        style={styles.input}
        placeholder="Agência"
        keyboardType="numeric"
        value={agencia}
        onChangeText={setAgencia}
      />
      <TextInput
        style={styles.input}
        placeholder="Número da Conta"
        keyboardType="numeric"
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
        placeholder="Saldo Inicial (R$)"
        keyboardType="numeric"
        value={saldo_inicial}
        onChangeText={setSaldoInicial}
      />
      <Button title="Salvar Conta" onPress={handleSalvarConta} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, justifyContent:'center', padding:20, backgroundColor:'#11111A' },
  title: { fontSize:22, color:'#00BFFF', marginBottom:20, textAlign:'center' },
  input: { backgroundColor:'#FFF', borderRadius:8, padding:10, marginBottom:15 },
});

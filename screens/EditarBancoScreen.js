import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export default function EditarBancoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { token } = useAuthStore();
  const { banco } = route.params;

  const [nome, setNome] = useState('');
  const [agencia, setAgencia] = useState('');
  const [numeroConta, setNumeroConta] = useState('');
  const [chavePix, setChavePix] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');

  useEffect(() => {
    if (banco) {
      setNome(banco.banco || '');
      setAgencia(banco.agencia || '');
      setNumeroConta(banco.numero_conta || banco.conta || '');
      setChavePix(banco.chave_pix || banco.chave || '');
      setSaldoInicial((banco.saldo_inicial ?? banco.saldo ?? 0).toString());
    }
  }, [banco]);

  const handleUpdate = async () => {
    if (!nome || !agencia || !numeroConta || !saldoInicial) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.put(`/contas/${banco.id}`, {
        banco: nome,
        agencia,
        numero_conta: numeroConta,
        chave_pix: chavePix,
        saldo_inicial: parseFloat(saldoInicial),
      });
      // Navega de volta para a lista de bancos imediatamente
      navigation.goBack();
      // Feedback de sucesso
      Alert.alert('Sucesso', 'Banco atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar banco:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível atualizar o banco.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Banco</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Banco"
        value={nome}
        onChangeText={setNome}
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
        value={numeroConta}
        onChangeText={setNumeroConta}
      />
      <TextInput
        style={styles.input}
        placeholder="Chave Pix (opcional)"
        value={chavePix}
        onChangeText={setChavePix}
      />
      <TextInput
        style={styles.input}
        placeholder="Saldo"
        keyboardType="numeric"
        value={saldoInicial}
        onChangeText={setSaldoInicial}
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#11111A' },
  title: { fontSize: 22, color: '#00BFFF', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#FFF', borderRadius: 8, padding: 10, marginBottom: 15 },
});

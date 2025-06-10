// screens/EditarTransacaoScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export default function EditarTransacaoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { token } = useAuthStore();
  const { transacao } = route.params;

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (transacao) {
      setDescricao(transacao.descricao || '');
      setValor(String(transacao.valor || ''));
      setData(transacao.data || '');
    }
  }, [transacao]);

  const handleSalvar = async () => {
    if (!descricao || !valor || !data) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    try {
      // Define o token de autorização
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Faz a requisição de atualização
      const response = await axios.put(`/transacoes/${transacao.id}`, {
        descricao,
        valor: parseFloat(valor),
        data,
      });

      // Em caso de sucesso, exibe mensagem e retorna
      Alert.alert(
        'Sucesso',
        'Transação atualizada com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Erro ao atualizar:', error.response?.data || error.message);

      if (error.response) {
        // Validação falhou (422)
        if (error.response.status === 422) {
          const validationErrors = error.response.data.errors || {};
          const messages = Object.values(validationErrors).flat().join('\n');
          Alert.alert('Erro de validação', messages);
        } else {
          // Outros erros do backend
          const msg = error.response.data.message || 'Erro ao atualizar a transação.';
          Alert.alert('Erro', msg);
        }
      } else {
        // Falha na conexão
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        placeholder="Valor"
      />

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
        placeholder="YYYY-MM-DD"
      />

      <Button title="Salvar Alterações" onPress={handleSalvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#11111A' },
  label: { color: '#FFF', fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useAuthStore} from '../store/useAuthStore';

export default function CadastrarTransacaoScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('saida'); // ou entrada
  const [conta_id, setContaId] = useState('');
  const { adicionarTransacao } = useAppStore();

  const handleSalvar = async () => {
    try {
      await adicionarTransacao({
        descricao,
        valor: parseFloat(valor),
        tipo,
        conta_id: parseInt(conta_id),
      });
      Alert.alert('Sucesso', 'Transação salva com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar transação');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={styles.input} />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo (entrada ou saida)</Text>
      <TextInput value={tipo} onChangeText={setTipo} style={styles.input} />

      <Text style={styles.label}>ID da Conta</Text>
      <TextInput
        value={conta_id}
        onChangeText={setContaId}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Salvar Transação" onPress={handleSalvar} />
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

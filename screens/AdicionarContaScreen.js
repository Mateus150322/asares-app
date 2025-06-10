import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import axios from '../services/api';
import { globalStyles } from '../styles/globalStyles';

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
    <ImageBackground
      source={require('../assets/images/image.png')}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Nova Conta Bancária</Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Nome do Banco"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={banco}
              onChangeText={setBanco}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Agência"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
              value={agencia}
              onChangeText={setAgencia}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Número da Conta"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
              value={numero_conta}
              onChangeText={setNumeroConta}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Chave Pix (opcional)"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={chave_pix}
              onChangeText={setChavePix}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Saldo Inicial (R$)"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
              value={saldo_inicial}
              onChangeText={setSaldoInicial}
            />

            <TouchableOpacity style={globalStyles.formButton} onPress={handleSalvarConta}>
              <Text style={globalStyles.formButtonText}>Salvar Conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(17, 17, 26, 0.66)',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});

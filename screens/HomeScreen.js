// screens/HomeScreen.js
import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import axios from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, token } = useAuthStore();
  const navigation = useNavigation();
  const [bancos, setBancos] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  const fetchBancos = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/contas');
      const contas = Array.isArray(response.data)
        ? response.data
        : response.data.contas || [];
      setBancos(contas);
      calcularSaldoTotal(contas);
    } catch (error) {
      console.error('Erro ao buscar bancos:', error.message, error.response?.data);
    }
  };

  useEffect(() => {
    if (token) fetchBancos();
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (token) fetchBancos();
    }, [token])
  );

  const calcularSaldoTotal = (lista) => {
    if (!Array.isArray(lista)) return;
    const total = lista.reduce((acc, banco) => acc + parseFloat(banco.saldo_inicial), 0);
    setSaldoTotal(total);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem vindo de volta, {user?.name} 😉</Text>

      {/* Card de Saldo */}
      <View style={styles.card}>
        <Text style={styles.title}>Seu saldo</Text>
        <Text style={styles.balance}>R$ {saldoTotal.toFixed(2)}</Text>

        {bancos.map((banco) => (
          <View key={banco.id} style={styles.bankItem}>
            <Text style={styles.bankText}>{banco.banco}</Text>
            <Text style={styles.bankText}>
              R$ {parseFloat(banco.saldo_inicial).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Card Banco (navegação) */}
      <TouchableOpacity
        style={[styles.card, styles.cardBanco]}
        onPress={() => navigation.navigate('Bancos')}
      >
        <Text style={styles.title}>Banco</Text>
      </TouchableOpacity>

      {/* Card Extrato (navegação) */}
      <TouchableOpacity style={[styles.card, styles.cardBanco]} onPress={() => navigation.navigate('Extrato')}>
        <Text style={styles.title}>Extrato</Text>
      </TouchableOpacity>

      {/* Botões + / - */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.redButton}
          onPress={() => navigation.navigate('AdicionarSaida')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate('AdicionarEntrada')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11111A',
    padding: 20,
  },
  welcome: {
    color: '#00BFFF',
    fontSize: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#2E2E3A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardBanco: {
    // opcional: ajuste de estilo específico para o card Banco
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  bankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingVertical: 8,
  },
  bankText: {
    color: '#FFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  redButton: {
    backgroundColor: '#D9534F',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#5CB85C',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
  },
});


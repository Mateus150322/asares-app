// screens/ExtratoScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export default function ExtratoScreen() {
  const { token } = useAuthStore();
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchExtrato();
  }, [token]);

  const fetchExtrato = async () => {
    try {
      const resp = await axios.get('/transacoes');
      setTransacoes(resp.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar o extrato.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item: tx }) => {
    const cor = tx.tipo === 'entrada' ? styles.entrada : styles.saida;
    return (
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{tx.descricao || '—'}</Text>
          <Text style={styles.data}>
            {new Date(tx.data).toLocaleDateString()}
          </Text>
        </View>
        <Text style={[styles.valor, cor]}>
          {Number(tx.valor).toFixed(2)}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (transacoes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Nenhuma transação cadastrada.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transacoes}
      keyExtractor={(tx) => String(tx.id)}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    backgroundColor: '#11111A',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  descricao: {
    color: '#FFF',
    fontSize: 16,
  },
  data: {
    color: '#AAA',
    fontSize: 12,
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entrada: {
    color: 'green',
  },
  saida: {
    color: 'red',
  },
  sep: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11111A',
  },
  empty: {
    color: '#FFF',
    fontSize: 16,
  },
});

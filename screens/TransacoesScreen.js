import React from 'react'; 
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useAppStore } from '../store/useAuthStore';

export default function TransacoesScreen({ navigation }) {
  const transacoes = useAppStore((state) => state.transacoes);

  return (
    <View style={styles.container}>
      <Button title="Nova Transação" onPress={() => navigation.navigate('CadastrarTransacao')} />
      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tipo}>{item.tipo.toUpperCase()}</Text>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.valor.toFixed(2)}</Text>
            <Text style={styles.data}>{new Date(item.data).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  card: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  tipo: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  data: {
    color: '#666',
    fontSize: 12,
  },
});

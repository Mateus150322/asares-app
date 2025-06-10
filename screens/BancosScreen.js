import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { globalStyles } from '../styles/globalStyles';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function BancosScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();
  const [bancos, setBancos] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const fetchBancos = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const resp = await axios.get('/contas');
      setBancos(Array.isArray(resp.data) ? resp.data : resp.data.contas || []);
    } catch (e) {
      console.error('Erro ao buscar bancos:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBancos();
    }, [token])
  );

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const deleteBanco = async (id) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.delete(`/contas/${id}`);
      setBancos((prev) => prev.filter((b) => b.id !== id));
      Alert.alert('Sucesso', 'Banco excluído com sucesso!');
    } catch (e) {
      console.error('Erro ao excluir banco:', e.response?.data || e.message);
      Alert.alert('Erro', 'Não foi possível excluir o banco.');
    }
  };

  const confirmDelete = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja excluir este banco e todas as transações associadas?')) {
        deleteBanco(id);
      }
    } else {
      Alert.alert(
        'Confirmação',
        'Deseja excluir este banco e todas as transações associadas?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => deleteBanco(id) },
        ],
        { cancelable: true }
      );
    }
  };

  const handleEdit = (banco) => {
    navigation.navigate('EditarBanco', { banco });
  };

  return (
    <ImageBackground
      source={require('../assets/images/image.png')}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          {bancos.map((banco) => (
            <View key={banco.id} style={styles.card}>
              <TouchableOpacity onPress={() => toggleExpand(banco.id)}>
                <View style={styles.headerRow}>
                  <Text style={styles.title}>{banco.banco}</Text>
                  <Text style={styles.icon}>{expandedId === banco.id ? '▴' : '▾'}</Text>
                </View>
              </TouchableOpacity>

              {expandedId === banco.id && (
                <View style={styles.details}>
                  <Text style={styles.infoText}>Agência: {banco.agencia}</Text>
                  <Text style={styles.infoText}>Conta: {banco.numero_conta}</Text>
                  <Text style={styles.infoText}>Chave Pix: {banco.chave_pix}</Text>
                  <Text style={styles.infoText}>
                    Saldo: R$ {parseFloat(banco.saldo_inicial).toFixed(2)}
                  </Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.btnEdit}
                      onPress={() => handleEdit(banco)}
                    >
                      <Text style={styles.btnText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnDelete}
                      onPress={() => confirmDelete(banco.id)}
                    >
                      <Text style={styles.btnText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={globalStyles.formButton}
            onPress={() => navigation.navigate('AdicionarBanco')}
          >
            <Text style={globalStyles.formButtonText}>+ Adicionar banco</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    color: '#FFF',
    fontSize: 16,
  },
  details: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  btnEdit: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    marginRight: 8,
  },
  btnDelete: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F44336',
    borderRadius: 6,
  },
  btnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

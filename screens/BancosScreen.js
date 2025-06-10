// screens/BancosScreen.js
import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, LayoutAnimation, Platform, UIManager
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

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
      console.error(e);
    }
  };

  useFocusEffect(useCallback(() => { fetchBancos(); }, [token]));

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {bancos.map(banco => (
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
                <Text style={styles.infoText}>Saldo: R$ {parseFloat(banco.saldo_inicial).toFixed(2)}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarBanco')}
      >
        <Text style={styles.addButtonText}>+ Adicionar banco</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    backgroundColor:'#11111A', 
    padding:20 
  },
  card: { 
    backgroundColor:'#2E2E3A', 
    borderRadius:8, 
    marginBottom:12, 
    overflow:'hidden' 
  },
  headerRow: { 
    flexDirection:'row', 
    justifyContent:'space-between', 
    padding:12 
  },
  title: { 
    color:'#fff', 
    fontSize:16 
  }, 
  icon: { 
    color:'#fff', 
    fontSize:16 
  },
  details: { 
    backgroundColor:'#1F1F28', 
    padding:12, 
    borderTopWidth:1, 
    borderTopColor:'#444' 
  },
  addButton: { 
    backgroundColor:'#5CB85C', 
    padding:15, 
    borderRadius:8, 
    alignItems:'center', 
    marginTop:10 
  },
  addButtonText: { 
    color:'#fff', 
    fontSize:16 
  },
  infoText: { 
    color:'#fff', 
    fontSize:16, 
    marginBottom:4 
  }
});
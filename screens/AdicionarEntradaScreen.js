// screens/AdicionarEntradaScreen.js
import React, { useState, useEffect } from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';  // ⬅️ picker mobile
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarEntradaScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();

  const [bancos, setBancos]     = useState([]);
  const [bancoId, setBancoId]   = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor]       = useState('');

  // estados para data
  const [data, setData]         = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchBancos();
  }, [token]);

  async function fetchBancos() {
    try {
      const resp = await axios.get('/contas');
      setBancos(resp.data);
    } catch (error) {
      console.error(error);
      isWeb
        ? window.alert('Erro: não foi possível carregar os bancos.')
        : Alert.alert('Erro', 'Não foi possível carregar os bancos.');
    }
  }

  function handleValidation() {
    if (!bancoId || !descricao || !valor) {
      const msg = 'Preencha todos os campos.';
      return isWeb
        ? window.alert(`Erro: ${msg}`)
        : Alert.alert('Erro', msg);
    }
    return null;
  }

  async function handleSave() {
    if (handleValidation()) return;

    try {
      await axios.post('/transacoes/entrada', {
        conta_id: bancoId,
        descricao,
        valor: parseFloat(valor),
        data: data.toISOString().split('T')[0], // YYYY-MM-DD
      });

      if (isWeb) {
        window.alert('Sucesso: Entrada adicionada!');
        navigation.goBack();
      } else {
        Alert.alert('Sucesso', 'Entrada adicionada!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error(error);
      const msg = 'Falha ao salvar a entrada.';
      isWeb
        ? window.alert(`Erro: ${msg}`)
        : Alert.alert('Erro', msg);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Banco</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={bancoId} onValueChange={setBancoId}>
          <Picker.Item label="Selecione um banco" value="" />
          {bancos.map(banco => (
            <Picker.Item
              key={banco.id}
              label={banco.banco}
              value={banco.id}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Data</Text>
      {isWeb ? (
        // input HTML para web — exibe calendário nativo do navegador
        <View style={{ marginBottom: 20 }}>
          <input
            type="date"
            value={data.toISOString().split('T')[0]}
            onChange={e => setData(new Date(e.target.value))}
            style={{
              backgroundColor: '#FFF',
              borderRadius: 8,
              padding: 10,
              fontSize: 16,
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: 20,
            }}
          />
        </View>
      ) : (
        // Touchable + datetimepicker para mobile
        <>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.input}
          >
            <Text>{data.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={data}
              mode="date"
              display="calendar"
              onChange={(_, selected) => {
                setShowPicker(false);
                if (selected) setData(selected);
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Button title="Salvar Entrada" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flexGrow: 1, padding: 20, backgroundColor: '#11111A' },
  label:          { color: '#FFF', marginBottom: 8, fontSize: 16 },
  input:          { backgroundColor: '#FFF', borderRadius: 8, padding: 10, marginBottom: 20 },
  pickerContainer:{ backgroundColor: '#FFF', borderRadius: 8, marginBottom: 20 }
});

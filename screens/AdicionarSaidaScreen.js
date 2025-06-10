// screens/AdicionarSaidaScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AdicionarSaidaScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();
  const [bancos, setBancos] = useState([]);
  const [bancoId, setBancoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchBancos();
  }, [token]);

  const showAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      // fallback para web
      window.alert(`${title}\n\n${message}`);
      if (buttons && buttons[0] && typeof buttons[0].onPress === 'function') {
        buttons[0].onPress();
      }
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  const fetchBancos = async () => {
    try {
      const resp = await axios.get('/contas');
      setBancos(resp.data);
    } catch (error) {
      console.error(error);
      showAlert('Erro', 'Não foi possível carregar os bancos.');
    }
  };

  const handleSave = async () => {
    if (!bancoId || !descricao || !valor) {
      return showAlert('Erro', 'Preencha todos os campos.');
    }

    try {
      await axios.post('/transacoes/saida', {
        conta_id: bancoId,
        descricao,
        valor: parseFloat(valor),
        data: data.toISOString().split('T')[0],
      });
      showAlert('Sucesso', 'Saída cadastrada!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error(error);
      showAlert('Erro', 'Falha ao salvar a saída.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Banco</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={bancoId}
          onValueChange={setBancoId}
        >
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
      <Text
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        {data.toLocaleDateString()}
      </Text>
      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(_, selected) => {
            setShowPicker(false);
            if (selected) setData(selected);
          }}
        />
      )}

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Button title="Salvar Saída" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#11111A' },
  label: { color: '#FFF', marginBottom: 8, fontSize: 16 },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#000'
  },
  pickerContainer: { backgroundColor: '#FFF', borderRadius: 8, marginBottom: 20 }
});

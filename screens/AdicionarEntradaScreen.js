import React, { useState, useEffect } from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

export default function AdicionarEntradaScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();

  const [bancos, setBancos] = useState([]);
  const [bancoId, setBancoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
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
        data: data.toISOString().split('T')[0],
      });

      if (isWeb) {
        window.alert('Sucesso: Entrada adicionada!');
        navigation.goBack();
      } else {
        Alert.alert('Sucesso', 'Entrada adicionada!', [
          { text: 'OK', onPress: () => navigation.goBack() },
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
    <ImageBackground
      source={require('../assets/images/image.png')}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.container}>
            <View style={globalStyles.pickerContainer}>
              <Picker selectedValue={bancoId} onValueChange={setBancoId}>
                <Picker.Item label="Selecione um banco" value="" />
                {bancos.map((banco) => (
                  <Picker.Item
                    key={banco.id}
                    label={banco.banco}
                    value={banco.id}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={globalStyles.input}
              value={descricao}
              onChangeText={setDescricao}
            />

            {isWeb ? (
              <View style={{ marginBottom: 20 }}>
                <input
                  type="date"
                  value={data.toISOString().split('T')[0]}
                  onChange={(e) => setData(new Date(e.target.value))}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 16,
                    width: '100%',
                    boxSizing: 'border-box',
                    marginBottom: 20,
                    color: '#FFF',
                  }}
                />
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  style={globalStyles.input}
                >
                  <Text style={{ color: '#FFF' }}>
                    {data.toISOString().split('T')[0]}
                  </Text>
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

            <TextInput
              placeholder="Valor"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={globalStyles.input}
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            <TouchableOpacity style={globalStyles.formButton} onPress={handleSave}>
              <Text style={globalStyles.formButtonText}>Salvar Entrada</Text>
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
});

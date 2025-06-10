import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { globalStyles } from '../styles/globalStyles';

export default function CadastrarTransacaoScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(''); // ou entrada
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
    <ImageBackground
      source={require('../assets/images/image.png')}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.container}>
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              style={globalStyles.input}
              placeholder="Descrição"
              placeholderTextColor="rgba(255,255,255,0.4)"
            />

            <TextInput
              value={valor}
              onChangeText={setValor}
              style={globalStyles.input}
              placeholder="Valor"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
            />

            <TextInput
              value={tipo}
              onChangeText={setTipo}
              style={globalStyles.input}
              placeholder="Tipo"
              placeholderTextColor="rgba(255,255,255,0.4)"
            />

            <TextInput
              value={conta_id}
              onChangeText={setContaId}
              style={globalStyles.input}
              placeholder="ID da Conta"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
            />

            <TouchableOpacity style={globalStyles.formButton} onPress={handleSalvar}>
              <Text style={globalStyles.formButtonText}>Salvar Transação</Text>
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

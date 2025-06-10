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

export default function CadastrarContaScreen({ navigation }) {
  const [banco, setBanco] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');
  const { adicionarConta } = useAppStore();

  const handleSalvar = async () => {
    try {
      await adicionarConta({ banco, saldo_inicial: parseFloat(saldoInicial) });
      Alert.alert('Sucesso', 'Conta salva com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar conta');
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
              value={banco}
              onChangeText={setBanco}
              style={globalStyles.input}
              placeholder="Nome do Banco"
              placeholderTextColor="rgba(255,255,255,0.4)"
            />

            <TextInput
              value={saldoInicial}
              onChangeText={setSaldoInicial}
              style={globalStyles.input}
              placeholder="Saldo Inicial (R$)"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
            />

            <TouchableOpacity style={globalStyles.formButton} onPress={handleSalvar}>
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
});

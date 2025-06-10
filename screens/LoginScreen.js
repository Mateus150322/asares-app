import axios from '../services/api';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { globalStyles } from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuthStore();

  const handleLogin = async () => {
    const success = await login({ email, password });
    if (success) {
      alert('Login realizado com sucesso!');
      navigation.navigate('Home');
    } else {
      alert('Erro ao fazer login. Verifique suas credenciais.');
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
            <Text style={styles.title}>Entrar</Text>

            {error && <Text style={styles.error}>{error}</Text>}
            {loading && <Text style={styles.loading}>Carregando...</Text>}

            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={email}
              onChangeText={setEmail}
              style={globalStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Senha"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={globalStyles.input}
            />

            <TouchableOpacity style={globalStyles.formButton} onPress={handleLogin}>
              <Text style={globalStyles.formButtonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
              Criar Conta
            </Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loading: {
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#00BFFF',
    fontSize: 16,
  },
});

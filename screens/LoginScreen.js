// screens/LoginScreen.js
import axios from '../services/api';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuthStore();

  const handleLogin = async () => {
    const success = await login({ email, password }); // <- captura o retorno aqui
    if (success) {
      alert('Login realizado com sucesso!');
      navigation.navigate('Home'); // navega se deu certo

    }else {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading && <Text>Carregando...</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Criar Conta
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 8 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  link: { marginTop: 15, textAlign: 'center', color: 'blue' },
});

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import axios from "../services/api"; // usando sua instância já configurada

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    try {
      setErrors({}); // limpa erros anteriores

      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: password,
      });

      console.log("Registrado com sucesso:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log("Erro de validação:", error.response.data.errors);
        setErrors(error.response.data.errors || {});
      } else {
        alert("Erro de conexão com o servidor.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {errors.name && <Text style={styles.error}>{errors.name[0]}</Text>}
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {errors.email && <Text style={styles.error}>{errors.email[0]}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {errors.password && <Text style={styles.error}>{errors.password[0]}</Text>}
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Registrar" onPress={handleRegister} />

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Já tem conta? Entrar
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
  error: {
    color: "red",
    marginBottom: 5,
    fontSize: 14,
    textAlign: "left",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
  },
});

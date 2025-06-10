import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import axios from "../services/api";
import { globalStyles } from "../styles/globalStyles";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    try {
      setErrors({});
      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: password,
      });

      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        alert("Erro de conexão com o servidor.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            {errors.name && <Text style={styles.error}>{errors.name[0]}</Text>}
            <TextInput
              placeholder="Nome"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={name}
              onChangeText={setName}
              style={globalStyles.input}
            />

            {errors.email && <Text style={styles.error}>{errors.email[0]}</Text>}
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={globalStyles.input}
            />

            {errors.password && <Text style={styles.error}>{errors.password[0]}</Text>}
            <TextInput
              placeholder="Senha"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={globalStyles.input}
            />

            <TouchableOpacity style={globalStyles.formButton} onPress={handleRegister}>
              <Text style={globalStyles.formButtonText}>Registrar</Text>
            </TouchableOpacity>

            <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
              Já tem conta? Entrar
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(17, 17, 26, 0.66)",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
    fontWeight: "600",
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
    color: "#00BFFF",
    fontSize: 16,
  },
});

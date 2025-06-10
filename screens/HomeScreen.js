import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";
import axios from "../services/api";
import { globalStyles } from "../styles/globalStyles";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { user, token } = useAuthStore();
  const navigation = useNavigation();
  const [bancos, setBancos] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  const fetchBancos = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/contas");
      const contas = Array.isArray(response.data)
        ? response.data
        : response.data.contas || [];
      setBancos(contas);
      calcularSaldoTotal(contas);
    } catch (error) {
      console.error(
        "Erro ao buscar bancos:",
        error.message,
        error.response?.data
      );
    }
  };

  useEffect(() => {
    if (token) fetchBancos();
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (token) fetchBancos();
    }, [token])
  );

  const calcularSaldoTotal = (lista) => {
    if (!Array.isArray(lista)) return;
    const total = lista.reduce(
      (acc, banco) => acc + parseFloat(banco.saldo_inicial),
      0
    );
    setSaldoTotal(total);
  };

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
          <Text style={styles.welcome}>Bem-vindo de volta {user?.name}😉</Text>

          <View style={globalStyles.card}>
            <Text style={styles.title}>Seu saldo</Text>
            <Text style={styles.balance}>R$ {saldoTotal.toFixed(2)}</Text>

            {bancos.map((banco) => (
              <View key={banco.id} style={styles.bankItem}>
                <Text style={styles.bankText}>{banco.banco}</Text>
                <Text style={styles.bankText}>
                  R$ {parseFloat(banco.saldo_inicial).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[globalStyles.card, styles.cardBanco]}
            onPress={() => navigation.navigate("Bancos")}
          >
            <Text style={styles.title}>Banco</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.card, styles.cardBanco]}
            onPress={() => navigation.navigate("Extrato")}
          >
            <Text style={styles.title}>Extrato</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                globalStyles.circleButton,
                globalStyles.circleButtonRemove,
              ]}
              onPress={() => navigation.navigate("AdicionarSaida")}
            >
              <Text style={globalStyles.buttonSymbol}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.circleButton, globalStyles.circleButtonAdd]}
              onPress={() => navigation.navigate("AdicionarEntrada")}
            >
              <Text style={globalStyles.buttonSymbol}>+</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  welcome: {
    color: "#FFF",
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 8,
    fontWeight: "500",
  },
  balance: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  bankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.52)",
    paddingVertical: 8,
  },
  bankText: {
    color: "#FFF",
    fontSize: 16,
  },
  cardBanco: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 30,
  },
});

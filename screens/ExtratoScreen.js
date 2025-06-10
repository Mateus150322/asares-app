import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function ExtratoScreen() {
  const { token } = useAuthStore();
  const navigation = useNavigation();

  const [transacoes, setTransacoes] = useState([]);
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bancoSelecionado, setBancoSelecionado] = useState("Todos");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // Busca contas e transações paralelamente
    Promise.all([fetchContas(), fetchExtrato()]).finally(() =>
      setLoading(false)
    );
  }, [token]);

  const fetchContas = async () => {
    try {
      const resp = await axios.get("/contas");
      setContas(resp.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar as contas.");
    }
  };

  const fetchExtrato = async () => {
    try {
      const resp = await axios.get("/transacoes");
      setTransacoes(resp.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar o extrato.");
    }
  };

  const handleDelete = (txId) => {
    Alert.alert("Confirmação", "Deseja realmente excluir esta transação?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`/transacoes/${txId}`);
            setTransacoes((old) => old.filter((tx) => tx.id !== txId));
          } catch (err) {
            console.error(err);
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  };

  const handleEdit = (tx) => {
    navigation.navigate("EditarTransacao", { transacao: tx });
  };

  // Lista de bancos para o Picker (únicos)
  const bancos = ["Todos", ...new Set(contas.map((c) => c.banco))];

  // Filtra transações de acordo com bancoSelecionado
  const filtered = transacoes.filter((tx) => {
    if (bancoSelecionado === "Todos") return true;
    // Pode vir como tx.contaId ou tx.conta_id
    const fk = tx.contaId ?? tx.conta_id;
    // Garante comparar números
    const contaIdNum = typeof fk === "string" ? Number(fk) : fk;
    const conta = contas.find((c) => c.id === contaIdNum);
    return conta?.banco === bancoSelecionado;
  });

  const renderItem = ({ item: tx }) => {
    const cor = tx.tipo === "entrada" ? styles.entrada : styles.saida;
    return (
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{tx.descricao || "—"}</Text>
          <Text style={styles.data}>
            {new Date(tx.data).toLocaleDateString()}
          </Text>
        </View>
        <Text style={[styles.valor, cor]}>
          R$ {Number(tx.valor).toFixed(2)}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => handleEdit(tx)}
            style={styles.btnEdit}
          >
            <Text style={styles.btnText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(tx.id)}
            style={styles.btnDelete}
          >
            <Text style={styles.btnText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("../assets/images/image.png")}
        style={globalStyles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={globalStyles.safeArea}>
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (transacoes.length === 0) {
    return (
      <ImageBackground
        source={require("../assets/images/image.png")}
        style={globalStyles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={globalStyles.safeArea}>
          <View style={styles.center}>
            <Text style={styles.empty}>Nenhuma transação cadastrada.</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        {/* Picker de filtro por banco */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={bancoSelecionado}
            onValueChange={setBancoSelecionado}
            mode="dropdown"
          >
            {bancos.map((b) => (
              <Picker.Item key={b} label={b} value={b} />
            ))}
          </Picker>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(tx) => String(tx.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: { flex: 1 },
  descricao: { color: "#FFF", fontSize: 16 },
  data: { color: "#AAA", fontSize: 12 },
  valor: { fontSize: 16, fontWeight: "bold" },
  entrada: { color: "rgba(0,255,0,0.4)" },
  saida: { color: "rgba(255,0,0,0.4)" },
  sep: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontFamily: "sans-serif",
    color: "#FFF",
    fontSize: 16,
  },
  pickerWrapper: {
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 20,
    borderRadius: 6,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    marginLeft: 10,
  },
  btnEdit: {
    padding: 6,
    backgroundColor: "rgba(0,0,255,0.6)",
    borderRadius: 4,
    marginRight: 6,
  },
  btnDelete: {
    padding: 6,
    backgroundColor: "rgba(255,0,0,0.6)",
    borderRadius: 4,
  },
  btnText: {
    color: "#FFF",
    fontSize: 12,
  },
});

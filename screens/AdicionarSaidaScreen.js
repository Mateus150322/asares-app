import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "../services/api";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { globalStyles } from "../styles/globalStyles";

export default function AdicionarSaidaScreen() {
  const navigation = useNavigation();
  const { token } = useAuthStore();
  const [bancos, setBancos] = useState([]);
  const [bancoId, setBancoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchBancos();
  }, [token]);

  const showAlert = (title, message, buttons) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      if (buttons && buttons[0] && typeof buttons[0].onPress === "function") {
        buttons[0].onPress();
      }
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  const fetchBancos = async () => {
    try {
      const resp = await axios.get("/contas");
      setBancos(resp.data);
    } catch (error) {
      console.error(error);
      showAlert("Erro", "Não foi possível carregar os bancos.");
    }
  };

  const handleSave = async () => {
    if (!bancoId || !descricao || !valor) {
      return showAlert("Erro", "Preencha todos os campos.");
    }

    try {
      await axios.post("/transacoes/saida", {
        conta_id: bancoId,
        descricao,
        valor: parseFloat(valor),
        data: data.toISOString().split("T")[0],
      });
      showAlert("Sucesso", "Saída cadastrada!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      showAlert("Erro", "Falha ao salvar a saída.");
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
              style={globalStyles.input}
              placeholder="Descrição"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={descricao}
              onChangeText={setDescricao}
            />

            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={globalStyles.input}
            >
              <Text style={{ color: "#FFF" }}>{data.toLocaleDateString()}</Text>
            </TouchableOpacity>
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

            <TextInput
              style={globalStyles.input}
              placeholder="Valor"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            <TouchableOpacity
              style={globalStyles.formButton}
              onPress={handleSave}
            >
              <Text style={globalStyles.formButtonText}>Salvar Saída</Text>
            </TouchableOpacity>
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
});

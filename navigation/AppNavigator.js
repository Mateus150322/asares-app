// navigation/AppNavigator.js
import React from "react";
import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import BiometricAuthScreen from "../screens/BiometricAuthScreen";
import SetPinScreen from "../screens/SetPinScreen";
import PinLoginScreen from "../screens/PinLoginScreen";
import CadastrarContaScreen from "../screens/CadastrarContaScreen";
import ContasScreen from "../screens/ContasScreen";
import TransacoesScreen from "../screens/TransacoesScreen";
import CadastrarTransacaoScreen from "../screens/CadastrarTransacaoScreen";
import HomeScreen from "../screens/HomeScreen";
import AdicionarEntradaScreen from "../screens/AdicionarEntradaScreen";
import AdicionarSaidaScreen from "../screens/AdicionarSaidaScreen";
import AdicionarContaScreen from "../screens/AdicionarContaScreen";
import BancosScreen from "../screens/BancosScreen";
import AdicionarBancoScreen from "../screens/AdicionarBancoScreen";
import ExtratoScreen from "../screens/ExtratoScreen";
// Novas telas de edição
import EditarBancoScreen from "../screens/EditarBancoScreen";
import EditarTransacaoScreen from "../screens/EditarTransacaoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        //screenOptions={{ headerShown: false }} // <<< REMOVENDO TODOS OS CABEÇALHOS
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ title: "Asares - Gestão Financeira" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Asares - Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Asares - Registrar" }}
        />
        <Stack.Screen
          name="Biometria"
          component={BiometricAuthScreen}
          options={{ title: "Asares - Biometria" }}
        />
        <Stack.Screen
          name="CriarPIN"
          component={SetPinScreen}
          options={{ title: "Asares - Criar novo PIN" }}
        />
        <Stack.Screen
          name="LoginPIN"
          component={PinLoginScreen}
          options={{ title: "Asares - Login com PIN" }}
        />
        <Stack.Screen
          name="Contas"
          component={ContasScreen}
          options={{ title: "Asares - Minhas Contas" }}
        />
        <Stack.Screen
          name="CadastrarConta"
          component={CadastrarContaScreen}
          options={{ title: "Asares - Cadastrar Conta" }}
        />
        <Stack.Screen
          name="Transacoes"
          component={TransacoesScreen}
          options={{ title: "Asares - Transações" }}
        />
        <Stack.Screen
          name="CadastrarTransacao"
          component={CadastrarTransacaoScreen}
          options={{ title: "Asares - Nova Transação" }}
        />
        <Stack.Screen
          name="EditarTransacao"
          component={EditarTransacaoScreen}
          options={{ title: "Asares - Editar Transação" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Asares - Página inicial" }}
        />
        <Stack.Screen
          name="Bancos"
          component={BancosScreen}
          options={{ title: "Asares - Meus Bancos" }}
        />
        <Stack.Screen
          name="AdicionarBanco"
          component={AdicionarBancoScreen}
          options={{ title: "Asares - Novo Banco" }}
        />
        <Stack.Screen
          name="EditarBanco"
          component={EditarBancoScreen}
          options={{ title: "Asares - Editar Banco" }}
        />
        <Stack.Screen
          name="AdicionarEntrada"
          component={AdicionarEntradaScreen}
          options={{ title: "Asares - Adicionar Entrada" }}
        />
        <Stack.Screen
          name="AdicionarSaida"
          component={AdicionarSaidaScreen}
          options={{ title: "Asares - Adicionar Saída" }}
        />
        <Stack.Screen
          name="AdicionarConta"
          component={AdicionarContaScreen}
          options={{ title: "Asares - Nova Conta" }}
        />
        <Stack.Screen
          name="Extrato"
          component={ExtratoScreen}
          options={{ title: "Asares - Extrato" }}
        />
        {/* Outras telas aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

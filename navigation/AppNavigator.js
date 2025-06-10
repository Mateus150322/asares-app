// navigation/AppNavigator.js
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import BiometricAuthScreen from '../screens/BiometricAuthScreen';
import SetPinScreen from '../screens/SetPinScreen';
import PinLoginScreen from '../screens/PinLoginScreen';
import CadastrarContaScreen from '../screens/CadastrarContaScreen';
import ContasScreen from '../screens/ContasScreen';
import TransacoesScreen from '../screens/TransacoesScreen';
import CadastrarTransacaoScreen from '../screens/CadastrarTransacaoScreen';
import HomeScreen from '../screens/HomeScreen';
import AdicionarEntradaScreen from '../screens/AdicionarEntradaScreen';
import AdicionarSaidaScreen from '../screens/AdicionarSaidaScreen';
import AdicionarContaScreen from '../screens/AdicionarContaScreen';
import BancosScreen from '../screens/BancosScreen';
import AdicionarBancoScreen from '../screens/AdicionarBancoScreen';
import ExtratoScreen from '../screens/ExtratoScreen';
import InactivityHandler from '../components/InactivityHandler';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <InactivityHandler timeout={5 * 60 * 1000}> 
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Biometria" component={BiometricAuthScreen} />
        <Stack.Screen name="SetPin" component={SetPinScreen} />
        <Stack.Screen name="LoginPIN" component={PinLoginScreen} />
        <Stack.Screen name="Contas" component={ContasScreen} />
        <Stack.Screen name="CadastrarConta" component={CadastrarContaScreen} />
        <Stack.Screen name="Transacoes" component={TransacoesScreen} />
<Stack.Screen name="CadastrarTransacao" component={CadastrarTransacaoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Bancos" component={BancosScreen} />
        <Stack.Screen name="AdicionarBanco" component={AdicionarBancoScreen} />
        <Stack.Screen name="AdicionarEntrada" component={AdicionarEntradaScreen} />
        <Stack.Screen name="AdicionarSaida" component={AdicionarSaidaScreen} />
        <Stack.Screen name="AdicionarConta" component={AdicionarContaScreen} options={{ title: 'Nova Conta' }} />
        <Stack.Screen name="Extrato" component={ExtratoScreen} options={{ title: 'Extrato' }} />
        {/* Outras telas aqui */}
      </Stack.Navigator>
      </InactivityHandler>
    </NavigationContainer>
  );
}

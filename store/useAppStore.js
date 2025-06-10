// store/useAppStore.js
import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppStore = create((set, get) => ({
  contas: [],
  transacoes: [],

  adicionarConta: async (novaConta) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/contas', novaConta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ contas: [...state.contas, response.data] }));
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao adicionar conta:', error);
      return { sucesso: false, erro: error.message };
    }
  },

  adicionarTransacao: async (novaTransacao) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/transacoes', novaTransacao, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ transacoes: [...state.transacoes, response.data] }));
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      return { sucesso: false, erro: error.message };
    }
  },

  buscarTransacoes: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/transacoes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ transacoes: response.data });
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  },
}));

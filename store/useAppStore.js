// store/useAppStore.js
import { create } from 'zustand';
import axios from 'axios';
import api from '../services/api'; // Ajuste o caminho conforme necessário
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppStore = create((set, get) => ({
  contas: [],
  transacoes: [],

  adicionarConta: async (novaConta) => {
    try {
      const { data } = await api.post('/contas', novaConta);
      set(state => ({ contas: [...state.contas, data] }));
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao adicionar conta:', error);
      return { sucesso: false, erro: error.message };
    }
  },

  adicionarTransacao: async (novaTransacao, tipo) => {
    try {
      // escolhe endpoint de entrada ou saída
      const path = tipo === 'saida' ? '/transacoes/saida' : '/transacoes/entrada';
      const { data } = await api.post(path, novaTransacao);
      set(state => ({ transacoes: [...state.transacoes, data.transacao] }));
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      return { sucesso: false, erro: error.message };
    }
  },

  buscarTransacoes: async () => {
    try {
      const { data } = await api.get('/transacoes');
      set({ transacoes: data });
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  },
}));

// components/InactivityHandler.js
import React, { useEffect, useRef } from 'react';
import { AppState, TouchableWithoutFeedback } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function InactivityHandler({ children, timeout = 5 * 60 * 1000 }) {
  // timeout em ms; aqui padrão = 5 minutos
  const { logout } = useAuthStore();
  const navigation = useNavigation();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, timeout);
  };

  useEffect(() => {
    // inicia o timer ao montar
    resetTimer();
    // pausa timer em background e reinicia ao voltar
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') resetTimer();
      else clearTimeout(timerRef.current);
    });
    return () => {
      clearTimeout(timerRef.current);
      sub.remove();
    };
  }, []);

  // captura qualquer toque na tela
  return (
    <TouchableWithoutFeedback onPress={resetTimer} onLongPress={resetTimer}>
      {children}
    </TouchableWithoutFeedback>
  );
}

// utils/pinStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_KEY = '@app_user_pin';

export async function savePin(pin) {
  try {
    await AsyncStorage.setItem(PIN_KEY, pin);
  } catch (e) {
    console.error('Erro ao salvar PIN', e);
  }
}

export async function getPin() {
  try {
    return await AsyncStorage.getItem(PIN_KEY);
  } catch (e) {
    console.error('Erro ao ler PIN', e);
    return null;
  }
}

export async function removePin() {
  try {
    await AsyncStorage.removeItem(PIN_KEY);
  } catch (e) {
    console.error('Erro ao remover PIN', e);
  }
}

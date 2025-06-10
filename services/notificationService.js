// services/notificationService.js
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default class NotificationService {
  /** 1) Inicializa o canal Android e registra o token */
  static async init() {
    // Só faz sentido em device físico, não no web
    if (!Device.isDevice) {
      console.log('Notificações só funcionam em dispositivo físico');
      return;
    }

    // Pede permissão para enviar notificações
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permissão negada', 'Não foi possível habilitar notificações.');
      return;
    }

    // Registra o token no Expo
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push token:', token);

    // Canal android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  }

  /** 2) Agenda um lembrete diário às 9h */
  static async scheduleDailySummary(hour = 9, minute = 0) {
    if (Platform.OS === 'web' || !Device.isDevice) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '👋 Resumo diário',
        body: 'Confira seu extrato e planeje o dia!',
      },
      trigger: { hour, minute, repeats: true },
    });
  }
}

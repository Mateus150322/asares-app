// screens/SplashScreen.js
// screens/SplashScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Platform,
  UIManager
} from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const timer = setTimeout(() => {
      navigation.replace("Biometria");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={globalStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={globalStyles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 10, fontSize: 16, color: "#FFF" }
});

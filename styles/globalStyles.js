import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

const { width } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(17, 17, 26, 0.66)",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: "100%",
    padding: 20,
    paddingBottom: 40,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  circleButton: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: (width * 0.18) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  circleButtonAdd: {
    backgroundColor: "rgba(0, 255, 0, 0.15)",
    borderWidth: 1,
    borderColor: "#00cc0077",
  },
  circleButtonRemove: {
    backgroundColor: "rgba(255, 0, 0, 0.15)",
    borderWidth: 1,
    borderColor: "#cc000077",
  },
  buttonSymbol: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: "#FFF",
  },

  pickerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 8,
    marginBottom: 20,
  },
  formButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,

  },
  formButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

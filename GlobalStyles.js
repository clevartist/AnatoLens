import { StyleSheet, Platform } from "react-native";

export default styles = StyleSheet.create({
  androidSafeZone: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 36 : 0,
  },
});

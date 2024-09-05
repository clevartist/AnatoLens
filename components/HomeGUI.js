import { View, StyleSheet, Pressable, Text } from "react-native";

export default function HomeGUI({ resetCamera, lookAtObject }) {
  return (
    <>
      {lookAtObject && (
        <View style={styles.guiReset}>
          <Pressable
            onPress={resetCamera}
            style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
          >
            <Text>Reset camera</Text>
          </Pressable>
        </View>
      )}

      {!lookAtObject && (
        <View style={styles.guiTitle}>
          <Text style={styles.anatolens}>AnatoLens</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  guiReset: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 80,
    zIndex: 10,
  },
  guiTitle: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  anatolens: {
    color: "#052659",
    fontSize: 18,
  },
});

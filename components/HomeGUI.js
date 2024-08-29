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
            <Text style={{ width: 90 }}>Reset camera</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.guiTitle}>
        <Text style={styles.anatolens}>AnatoLens</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  guiReset: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 70,
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
    fontSize: 30,
    width: 150,
  },
});

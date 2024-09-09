import { View, Pressable, Text, StyleSheet } from "react-native";

export default function Header({ setShowMenu, showMenu }) {
  return (
    <View style={styles.header}>
      <Pressable>
        <Text style={styles.text}>Profile</Text>
      </Pressable>
      <Pressable onPress={() => setShowMenu(!showMenu)}>
        <Text style={styles.text}>Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 2,
    borderColor: "cyan",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
});

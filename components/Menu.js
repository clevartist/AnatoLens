import {
  View,
  Pressable,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";

const { width: screenWidth } = Dimensions.get("window");

const options = [
  {
    id: 1,
    title: "Learning mode",
  },
  {
    id: 2,
    title: "Settings",
  },
];

const Option = ({ item }) => (
  <Pressable onPress={() => console.log("PRESSED ON:", item.id)}>
    <Text style={{ color: "white" }}>{item.title}</Text>
  </Pressable>
);

export default function Menu({ setShowMenu, showMenu }) {
  const menuWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(menuWidth, {
      toValue: screenWidth / 2,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [showMenu]);

  return (
    <View>
      <Animated.View style={[styles.menu, { width: menuWidth }]}>
        <View>
          <Pressable onPress={() => setShowMenu(false)}>
            <Text style={{ color: "white", fontSize: 30 }}>Menu</Text>
          </Pressable>
        </View>
        <View>
          <FlatList
            data={options}
            renderItem={({ item }) => <Option item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    alignSelf: "flex-end",
    borderWidth: 2,
    borderColor: "red",
    zIndex: 1000,
  },
});

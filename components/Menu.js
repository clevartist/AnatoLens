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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const { width: screenWidth } = Dimensions.get("window");

const Option = ({ item }) => (
  <AnimatedPressable
    onPress={() => console.log("PRESSED ON:", item.id)}
    style={{ opacity: item.opacityValue }}
  >
    <Text style={{ color: "white" }}>{item.title}</Text>
  </AnimatedPressable>
);

export default function Menu({ setShowMenu, showMenu }) {
  const menuWidth = useRef(new Animated.Value(0)).current;

  const options = [
    {
      id: 1,
      title: "Settings",
      opacityValue: new Animated.Value(0),
    },
    {
      id: 2,
      title: "Profile",
      opacityValue: new Animated.Value(0),
    },
    {
      id: 3,
      title: "Payment",
      opacityValue: new Animated.Value(0),
    },
    {
      id: 4,
      title: "Additional",
      opacityValue: new Animated.Value(0),
    },
    {
      id: 5,
      title: "Nice",
      opacityValue: new Animated.Value(0),
    },
    {
      id: 6,
      title: "Desen",
      opacityValue: new Animated.Value(0),
    },
    {
      id: 7,
      title: "Do you know",
      opacityValue: new Animated.Value(0),
    },
  ];

  useEffect(() => {
    Animated.timing(menuWidth, {
      toValue: screenWidth / 2,
      duration: 200,
      useNativeDriver: false,
    }).start();

    options.forEach((item, index) => {
      Animated.timing(item.opacityValue, {
        toValue: 1,
        delay: index * 50,
        useNativeDriver: false,
      }).start();
    });
  }, [showMenu]);

  return (
    <View>
      <Animated.View style={[styles.menu, { width: menuWidth }]}>
        <View>
          <Pressable style={{ right: 0 }}>
            <Text style={{ color: "white" }}>PROFILE</Text>
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

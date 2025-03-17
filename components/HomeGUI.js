import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import Menu from "./Menu";
import { useEffect, useRef } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function HomeGUI({ showMenu, setShowMenu }) {
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: showMenu ? 0.7 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [showMenu]);

  return (
    <>
      {showMenu && (
        <View>
          <AnimatedPressable
            style={{
              position: "absolute",
              backgroundColor: "black",
              opacity: opacityValue,
              top: 0,
              right: 0,
              width: screenWidth,
              height: screenHeight,
            }}
            onPress={() => setShowMenu(false)}
          ></AnimatedPressable>
        </View>
      )}

      <View style={{ backgroundColor: "blue", flex: 1 }}>
        {showMenu && <Menu setShowMenu={setShowMenu} showMenu={showMenu} />}

        {showMenu && (
          <View style={styles.guiTitle}>
            <Text style={styles.anatolens}>AnatoLens</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: "DESIGNER",
  },
});

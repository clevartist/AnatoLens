import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import Menu from "./Menu";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function HomeGUI({ showMenu, setShowMenu }) {
  return (
    <>
      {showMenu && (
        <View>
          <Pressable
            style={{
              position: "absolute",
              backgroundColor: "black",
              opacity: 0.7,
              top: 0,
              right: 0,
              width: screenWidth,
              height: screenHeight,
            }}
            onPress={() => setShowMenu(false)}
          ></Pressable>
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

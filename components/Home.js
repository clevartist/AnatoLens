import { View, SafeAreaView, StatusBar, Text, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Donut from "./Donut";
import HomeGUI from "./HomeGUI";
import Info from "./Info";
import bodyParts from "./InfoContent";
import GlobalStyles from "../GlobalStyles";
import Header from "./Header";

export default function Home({
  splashErr,
  цель,
  установитьЦель,
  lookAtObject,
  setLookAtObject,
  setOffsetValue,
  offsetRef,
  dedicatedID,
  setDedicatedID,
  info,
  setInfo,
  CameraZoom,
  resetCamera,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [loaded, error] = useFonts({
    DESIGNER: require("../assets/fonts/DESIGNER.otf"),
  });

  useEffect(() => {
    console.log("camera position:", offsetRef.current);
    console.log("camera target:", цель);
    console.log("lookAtObject:", lookAtObject);

    if (lookAtObject) {
      const filtered = bodyParts.find((part) => part.id === dedicatedID);
      setInfo(filtered);
    }
    if (!lookAtObject) {
      setInfo(null);
    }

    if (loaded || error) {
      splashErr();
    }
  }, [цель, lookAtObject, offsetRef, dedicatedID, loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#021024" }}>
      <StatusBar color="white" backgroundColor={"#021024"} />
      <SafeAreaView style={GlobalStyles.androidSafeZone}>
        <Header setShowMenu={setShowMenu} showMenu={showMenu} />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Canvas style={{ flex: 1, backgroundColor: "#021024" }}>
            <ambientLight />
            <pointLight color="#fff" position={[10, 10, 10]} intensity={1000} />
            <Donut
              установитьЦель={установитьЦель}
              setLookAtObject={setLookAtObject}
              lookAtObject={lookAtObject}
              setOffsetValue={setOffsetValue}
              setDedicatedID={setDedicatedID}
            />
            <CameraZoom цель={цель} />
          </Canvas>
          {!lookAtObject && (
            <View>
              <HomeGUI
                resetCamera={resetCamera}
                lookAtObject={lookAtObject}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            </View>
          )}
        </View>
        {!lookAtObject && !showMenu && (
          <View style={styles.guiTitle}>
            <Text style={styles.anatolens}>AnatoLens</Text>
          </View>
        )}
        {lookAtObject && (
          <Info
            info={info}
            lookAtObject={lookAtObject}
            resetCamera={resetCamera}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  guiTitle: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  anatolens: {
    color: "#052659",
    fontSize: 18,
    fontFamily: "DESIGNER",
  },
});

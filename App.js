import { Text, View, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Donut from "./components/Donut";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const cameraDefaultPosition = new THREE.Vector3(0, 0, 5);
  const [цель, установитьЦель] = useState(cameraDefaultPosition.clone());
  const [lookAtObject, setLookAtObject] = useState(false);
  const offsetRef = useRef(new THREE.Vector3());

  function CameraZoom({ цель }) {
    const { camera } = useThree();

    useFrame(() => {
      if (цель) {
        const offset = цель.clone().add(new THREE.Vector3(2, 2, 2));
        offsetRef.current.copy(offset);
        camera.position.lerp(offset, 0.05);
        camera.lookAt(lookAtObject ? цель : 0, 0, 0);
        camera.updateProjectionMatrix();
      }
    });

    return null;
  }

  const resetCamera = () => {
    установитьЦель(cameraDefaultPosition.clone());
    setLookAtObject(false);
  };

  useEffect(() => {
    console.log("camera position: ", offsetRef.current);
    console.log("camera target: ", цель);
    console.log("lookAtObject: ", lookAtObject);
  }, [цель, lookAtObject, offsetRef]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Canvas style={{ flex: 1, backgroundColor: "#021024" }}>
        <ambientLight />
        <pointLight color="#fff" position={[10, 10, 10]} intensity={1000} />
        <Donut
          установитьЦель={установитьЦель}
          setLookAtObject={setLookAtObject}
          lookAtObject={lookAtObject}
        />
        <CameraZoom цель={цель} />
      </Canvas>
      <View style={styles.guiReset}>
        <Pressable
          onPress={resetCamera}
          style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ width: 90 }}>Reset camera</Text>
        </Pressable>
      </View>
      <View style={styles.guiTitle}>
        <Text style={styles.anatolens}>AnatoLens</Text>
      </View>
    </SafeAreaView>
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

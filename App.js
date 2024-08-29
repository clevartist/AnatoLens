import { View, SafeAreaView, StatusBar } from "react-native";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Donut from "./components/Donut";
import { useEffect, useRef, useState } from "react";
import HomeGUI from "./components/HomeGUI";
import GlobalStyles from "./GlobalStyles";

export default function App() {
  const cameraDefaultPosition = new THREE.Vector3(0, 0, 5);
  const [цель, установитьЦель] = useState(cameraDefaultPosition.clone());
  const [lookAtObject, setLookAtObject] = useState(false);
  const [offsetValue, setOffsetValue] = useState(new THREE.Vector3());
  const offsetRef = useRef(new THREE.Vector3());

  function CameraZoom({ цель }) {
    const { camera } = useThree();

    useFrame(() => {
      if (цель) {
        offsetRef.current.copy(offsetValue);
        camera.position.lerp(lookAtObject ? offsetValue : цель, 0.05);
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
    console.log("camera position:", offsetRef.current);
    console.log("camera target:", цель);
    console.log("lookAtObject:", lookAtObject);
  }, [цель, lookAtObject, offsetRef]);

  return (
    <View style={{ flex: 1, backgroundColor: "#021024" }}>
      <StatusBar color="white" backgroundColor={"#021024"} />
      <SafeAreaView style={GlobalStyles.androidSafeZone}>
        <Canvas style={{ flex: 1, backgroundColor: "#021024" }}>
          <ambientLight />
          <pointLight color="#fff" position={[10, 10, 10]} intensity={1000} />
          <Donut
            установитьЦель={установитьЦель}
            setLookAtObject={setLookAtObject}
            lookAtObject={lookAtObject}
            setOffsetValue={setOffsetValue}
          />
          <CameraZoom цель={цель} />
        </Canvas>
        <View>
          <HomeGUI resetCamera={resetCamera} lookAtObject={lookAtObject} />
        </View>
      </SafeAreaView>
    </View>
  );
}

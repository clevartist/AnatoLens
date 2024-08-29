import { View, SafeAreaView } from "react-native";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Donut from "./components/Donut";
import { useEffect, useRef, useState } from "react";
import HomeGUI from "./components/HomeGUI";

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
      <View>
        <HomeGUI resetCamera={resetCamera} />
      </View>
    </SafeAreaView>
  );
}

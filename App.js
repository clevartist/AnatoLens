import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useRef } from "react";
import Home from "./components/Home";
import BodyPart from "./components/screens/BodyPart";
import bodyParts from "./components/InfoContent";
import * as SplashScreen from "expo-splash-screen";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const cameraDefaultPosition = new THREE.Vector3(0, 0, 5);
  const [цель, установитьЦель] = useState(cameraDefaultPosition.clone());
  const [lookAtObject, setLookAtObject] = useState(false);
  const [offsetValue, setOffsetValue] = useState(new THREE.Vector3());
  const offsetRef = useRef(new THREE.Vector3());
  const [dedicatedID, setDedicatedID] = useState(0);
  const [info, setInfo] = useState(bodyParts);

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

  function resetCamera() {
    установитьЦель(cameraDefaultPosition.clone());
    setLookAtObject(false);
  }

  function splashErr() {
    SplashScreen.hideAsync();
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {() => (
            <Home
              splashErr={splashErr}
              цель={цель}
              установитьЦель={установитьЦель}
              cameraDefaultPosition={cameraDefaultPosition}
              lookAtObject={lookAtObject}
              setLookAtObject={setLookAtObject}
              offsetValue={offsetValue}
              setOffsetValue={setOffsetValue}
              offsetRef={offsetRef}
              dedicatedID={dedicatedID}
              setDedicatedID={setDedicatedID}
              info={info}
              setInfo={setInfo}
              CameraZoom={CameraZoom}
              resetCamera={resetCamera}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="BodyPart">
          {() => (
            <BodyPart
              установитьЦель={установитьЦель}
              setLookAtObject={setLookAtObject}
              setOffsetValue={setOffsetValue}
              setDedicatedID={setDedicatedID}
              offsetValue={offsetValue}
              dedicatedID={dedicatedID}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

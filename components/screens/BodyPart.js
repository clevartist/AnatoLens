import { View, SafeAreaView } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import GlobalStyles from "../../GlobalStyles";

const geometryMenu = {
  coneGeometry: () => <coneGeometry />,
  boxGeometry: () => <boxGeometry />,
};

export default function BodyPart() {
  const route = useRoute();

  const infoGeometry = route.params?.info.geometry;

  const DecidedGeometry = useMemo(
    () => geometryMenu[infoGeometry],
    [infoGeometry]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#021024" }}>
      <SafeAreaView style={GlobalStyles.androidSafeZone}>
        <Canvas style={{ flex: 1, backgroundColor: "#021024" }}>
          <ambientLight />
          <pointLight color="#fff" position={[10, 10, 10]} intensity={1000} />
          <mesh position={[0, 0, 0]} scale={1}>
            {DecidedGeometry ? <DecidedGeometry /> : null}
            <meshStandardMaterial color={"purple"} />
          </mesh>
        </Canvas>
      </SafeAreaView>
    </View>
  );
}

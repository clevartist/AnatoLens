import { View, SafeAreaView, Pressable, Text } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalStyles from "../../GlobalStyles";

const geometryMenu = {
  coneGeometry: () => <coneGeometry />,
  boxGeometry: () => <boxGeometry />,
};

export default function BodyPart() {
  const navigation = useNavigation();
  const route = useRoute();

  const DecidedGeometry = geometryMenu[route.params.info.geometry];

  return (
    <View style={{ flex: 1, backgroundColor: "#021024" }}>
      <SafeAreaView style={GlobalStyles.androidSafeZone}>
        <View>
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              zIndex: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "white" }}>go back</Text>
          </Pressable>
        </View>
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

import { View, SafeAreaView, Pressable, Text } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalStyles from "../../GlobalStyles";
import bodyParts from "../InfoContent";

const geometryMenu = {
  coneGeometry: () => <coneGeometry />,
  boxGeometry: () => <boxGeometry />,
};

export default function BodyPart() {
  const navigation = useNavigation();
  const route = useRoute();
  let i = 0;

  const bodyPart = bodyParts.find((part) => part.id === route.params.info.id);
  const dotsArray = Array(bodyPart.dots.length);
  for (i = 0; i < bodyPart.dots.length; i++) {
    dotsArray.push(bodyPart.dots[i]);
  }

  const DecidedGeometry = geometryMenu[route.params.info.geometry];

  console.log("\n\nBODY PART:\n", bodyPart);
  console.log("dotsArray: ", dotsArray);

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

            {dotsArray.map((index) => (
              <mesh key={index.dot_id} position={index.position} scale={0.2}>
                <sphereGeometry />
              </mesh>
            ))}
          </mesh>
        </Canvas>
      </SafeAreaView>
    </View>
  );
}

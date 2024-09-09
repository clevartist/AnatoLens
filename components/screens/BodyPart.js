import { View, SafeAreaView, Pressable, Text } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalStyles from "../../GlobalStyles";
import bodyParts from "../InfoContent";
import * as THREE from "expo-three";

const geometryMenu = {
  coneGeometry: () => <coneGeometry />,
  boxGeometry: () => <boxGeometry />,
};

export default function BodyPart({
  установитьЦель,
  setLookAtObject,
  setOffsetValue,
  setDedicatedID,
}) {
  const navigation = useNavigation();
  const route = useRoute();

  const bodyPart = bodyParts.find((part) => part.id === route.params.info.id);
  const dotsArray = [...bodyPart.dots];

  const DecidedGeometry = geometryMenu[route.params.info.geometry];

  console.log("\n\nBODY PART:", bodyPart.id);
  console.log("dotsArray: ", dotsArray);

  function Dot({ index }) {
    const handleClick = (event) => {
      const currentPosition = event.object.position.clone();
      установитьЦель(currentPosition);
      setLookAtObject(true);
      setOffsetValue(new THREE.Vector3(route.params.info.offset_value));
      setDedicatedID(route.params.info.id);
    };

    return (
      <mesh position={index.position} scale={0.2} onClick={handleClick}>
        <sphereGeometry />
        <meshStandardMaterial color={"white"} />
      </mesh>
    );
  }

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
            <meshStandardMaterial color={"purple"} wireframe={true} />

            {dotsArray.map((index) => (
              <Dot key={index.dot_id} index={index} />
            ))}
          </mesh>
        </Canvas>
      </SafeAreaView>
    </View>
  );
}

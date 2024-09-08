// import { View, SafeAreaView, StatusBar, Button } from "react-native";
// import { useFrame, useThree, Canvas } from "@react-three/fiber";
// import * as THREE from "three";
// import { useEffect, useMemo } from "react";
// import { useRoute } from "@react-navigation/native";
// import GlobalStyles from "../../GlobalStyles";

// const geometryMenu = {
//   coneGeometry: () => <coneGeometry />,
//   boxGeometry: () => <boxGeometry />,
// };

// export default function BodyPart() {
//   const route = useRoute();

//   const decidedBodyPart = route.params?.info;

//   const decidingGeometry = useMemo(
//     () => geometryMenu[decidedBodyPart?.geometry],
//     [decidedBodyPart?.geometry]
//   );

//   useEffect(() => {
//     if (route.params?.info) {
//     }
//   }, [route.params?.info]);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#021024" }}>
//       <SafeAreaView style={GlobalStyles.androidSafeZone}>
//         <Canvas style={{ flex: 1, backgroundColor: "#021024" }}>
//           <ambientLight />
//           <pointLight color="#fff" position={[10, 10, 10]} intensity={1000} />
//           <mesh position={[0, 0, 0]} scale={1}>
//             {decidingGeometry ? <decidingGeometry /> : null}
//             <meshStandardMaterial color={"purple"} />
//           </mesh>
//         </Canvas>
//       </SafeAreaView>
//     </View>
//   );
// }

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

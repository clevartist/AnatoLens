// I started playing around with this donut at the beginning of this project's development
// I'll leave this old code here

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function App() {
  function Torus(props) {
    const [scaleValue, setScaleValue] = useState(false);
    const [targetScale, setTargetScale] = useState(0.7);
    const [currentScale, setCurrentScale] = useState(0.7);
    const [wire, setWire] = useState(false);

    const mesh = useRef();
    const scaleSpeed = 0.03;

    useFrame((state, delta) => {
      // Gradually adjust the scale towards the target scale
      setCurrentScale((prevScale) => {
        const newScale = prevScale + (targetScale - prevScale) * scaleSpeed;
        return newScale;
      });

      mesh.current.rotation.y += delta / 1.5; // Rotate the torus
      mesh.current.scale.set(currentScale, currentScale, currentScale); // Update the scale on x, y, z
    });

    const changeScale = () => {
      setScaleValue(!scaleValue);
      setTargetScale(scaleValue ? 0.7 : 1.4); // Toggle between 0.7 and 1 on click
      setWire(!wire);
    };

    return (
      <mesh {...props} ref={mesh} onClick={changeScale}>
        <torusGeometry />
        <meshStandardMaterial wireframe={wire} color={"#cd965f"} />
      </mesh>
    );
  }

  return (
    <Canvas style={{ backgroundColor: "black" }}>
      <ambientLight />
      <pointLight color="#fff" position={[10, 10, 10]} intensity={1000} />
      <Torus position={[0, 0, 0]} />
    </Canvas>
  );
}

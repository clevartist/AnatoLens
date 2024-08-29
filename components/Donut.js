import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Donut({
  установитьЦель,
  setLookAtObject,
  lookAtObject,
  setOffsetValue,
}) {
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

      if (!lookAtObject) {
        mesh.current.rotation.y += delta / 1.5; // Rotate the torus
      }
      mesh.current.scale.set(currentScale, currentScale, currentScale); // Update the scale on x, y, z
    });

    const changeScale = () => {
      setScaleValue(!scaleValue);
      setTargetScale(scaleValue ? 0.7 : 1.4); // Toggle between 0.7 and 1.4 on click
      setWire(!wire);
    };

    return (
      <mesh {...props} ref={mesh} onClick={changeScale}>
        <torusGeometry />
        <meshStandardMaterial wireframe={wire} color={"#cd965f"} />
        <Dot
          position={[1, 1, 1]}
          offsetValue={new THREE.Vector3(3, 3, 2)}
          scalarValue={-2}
        />
        <Dot
          position={[-1, -1, -1]}
          offsetValue={new THREE.Vector3(-1, -2, -2)}
          scalarValue={0}
        />
      </mesh>
    );
  }

  function Dot({ position, offsetValue, scalarValue }) {
    const handleClick = (event) => {
      const currentPosition = event.object.position.clone();
      setLookAtObject(true);
      установитьЦель(currentPosition.addScalar(scalarValue));
      setOffsetValue(offsetValue);
    };

    return (
      <mesh position={position} scale={0.2} onClick={handleClick}>
        <sphereGeometry />
        <meshStandardMaterial color={"white"} />
      </mesh>
    );
  }

  return (
    <>
      <Torus position={[0, 0, 0]} />
    </>
  );
}

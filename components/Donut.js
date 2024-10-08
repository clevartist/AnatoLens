import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Donut({
  установитьЦель,
  setLookAtObject,
  lookAtObject,
  setOffsetValue,
  setDedicatedID,
}) {
  function Torus(props) {
    const mesh = useRef();
    useFrame((state, delta) => {
      if (!lookAtObject) {
        mesh.current.rotation.y += delta / 1.5;
      }
    });

    return (
      <mesh {...props} ref={mesh} scale={0.7}>
        <torusGeometry />
        <meshStandardMaterial color={"#cd965f"} />
        <Dot
          position={[1, 1, 1]}
          offsetValue={new THREE.Vector3(3, 3, 2)}
          scalarValue={-2}
          dedicatedID={2}
        />
        <Dot
          position={[-1, -1, -1]}
          offsetValue={new THREE.Vector3(-1, -2, -2)}
          scalarValue={0}
          dedicatedID={1}
        />
      </mesh>
    );
  }

  function Dot({ position, offsetValue, scalarValue, dedicatedID }) {
    const handleClick = (event) => {
      const currentPosition = event.object.position.clone();
      setLookAtObject(true);
      установитьЦель(currentPosition.addScalar(scalarValue));
      setOffsetValue(offsetValue);
      setDedicatedID(dedicatedID);
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

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Donut({
  установитьЦель,
  setLookAtObject,
  lookAtObject,
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
      </mesh>
    );
  }

  function Dot(props) {
    const handleClick = (event) => {
      const currentPosition = event.object.position.clone();
      setLookAtObject(true);
      установитьЦель(currentPosition.addScalar(1));
    };

    return (
      <mesh {...props} scale={0.5} onClick={handleClick}>
        <sphereGeometry />
        <meshStandardMaterial color={"white"} />
      </mesh>
    );
  }

  return (
    <>
      <Torus position={[0, 0, 0]} />
      <Dot position={[2, 1, -2]} />
      <Dot position={[1, 3, 0]} />
    </>
  );
}

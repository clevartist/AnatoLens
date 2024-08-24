import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

export default function App() {
  
  function Torus(props) {

    const [scaleValue, setScaleValue] = useState(false);
    const [count, setCount] = useState(1);
    const [direction, setDirection] = useState(1); // 1 increments; -1 decrements
    const [elapsedTime, setElapsedTime] = useState(0);

    const mesh = useRef();
    const speed = 0.1;

    useFrame((state, delta) => {
      
      if(scaleValue) {
        setElapsedTime((prevTime) => prevTime + delta);
        if(elapsedTime >= speed) {
          setCount((prevCount) => {
            if(prevCount >= 16) {
              setDirection(-1);
              return prevCount - 1;
            } else if (prevCount <= 1) {
              setDirection(1);
              return prevCount + 1;
            }
            return prevCount + direction;
          });

          setElapsedTime(0);
        }
      }
      mesh.current.rotation.y += delta * count;
    });


    return(
      <mesh 
      {...props} 
      ref={mesh}
      scale={scaleValue ? 1 : 0.7} 
      onClick={(e) => setScaleValue(!scaleValue)}
      >
        <torusGeometry />
        <meshStandardMaterial color={"#cd965f"} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight />
      <pointLight color='#fff' position={[10,10,10]} intensity={1000} />
      <Torus position={[0,0,0]} />
      <Torus position={[-0.5,-5,-5]} />
      <Torus position={[1,2,1]} />
    </Canvas>
  );
}

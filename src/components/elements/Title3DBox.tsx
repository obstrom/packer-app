import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import styled from "styled-components";

const CanvasContainer = styled.div`
  width: 10rem;
`;

const Cube = () => {
  const cubeSides = useLoader(TextureLoader, [
    "textures/cube1.bmp",
    "textures/cube2.bmp",
    "textures/cube3.bmp",
    "textures/cube4.bmp",
    "textures/cube5.bmp",
    "textures/cube6.bmp",
  ]);

  const ref = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState(false);

  useFrame(() => {
    hover
      ? (ref.current.rotation.y += 0.02)
      : (ref.current.rotation.y += 0.005);
  });

  useEffect(() => {
    // starting rotation position
    ref.current.rotation.x = 0.4;
    ref.current.rotation.y = 3.5;
  }, []);

  return (
    <mesh
      position={[0, 0, 0]}
      ref={ref}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      {cubeSides.map((texture, id) => (
        <meshStandardMaterial
          key={texture.id}
          attach={`material-${id}`}
          map={texture}
        />
      ))}
    </mesh>
  );
};

export const Title3DBox = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.4} />
          <Cube />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

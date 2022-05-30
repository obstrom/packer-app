import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import styled from "styled-components";

const CanvasContainer = styled.div`
  width: 6.5rem;
  height: 6.5rem;
`;

const Cube = () => {
  const cubeSides = useLoader(TextureLoader, [
    "textures/logo/logo_texture_1.bmp",
    "textures/logo/logo_texture_2.bmp",
    "textures/logo/logo_texture_3.bmp",
    "textures/logo/logo_texture_4.bmp",
    "textures/logo/logo_texture_5.bmp",
    "textures/logo/logo_texture_6.bmp",
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
      position={[0, 0.33, 0]}
      ref={ref}
      scale={2.75}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {cubeSides.map((texture, id) => (
        <meshStandardMaterial
          key={texture.id}
          attach={`material-${id}`}
          map={texture}
          metalness={1}
          roughness={0.9}
        />
      ))}
    </mesh>
  );
};

export const Logo3DBox = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 7.5, 10]} intensity={1.5} />
          <Cube />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

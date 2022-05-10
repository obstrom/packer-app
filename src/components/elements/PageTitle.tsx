import React, { useRef, useState, Suspense } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// @ts-ignore
import { TextureLoader } from "three/src/loaders/TextureLoader";

type PageTitleProps = {
  text: string;
};

const Title = styled.h1`
  color: #3b3b3b;
  font-size: 4rem;
  text-shadow: 0 0.2rem 0.3rem rgb(0 0 0 / 45%);
`;

const CanvasContainer = styled.div`
  width: 10rem;
`;

const BoxDemo = (props: any) => {
  const cubeSides = useLoader(TextureLoader, [
    "textures/cube1.bmp",
    "textures/cube2.bmp",
    "textures/cube3.bmp",
    "textures/cube4.bmp",
    "textures/cube5.bmp",
    "textures/cube6.bmp",
  ]);

  const mesh = useRef();
  const [rotate, setRotate] = useState(true);

  useFrame(() => {
    // @ts-ignore
    mesh.current.rotation.x = 0.4;
    // @ts-ignore
    if (rotate) mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerOver={(event) => setRotate(false)}
      onPointerOut={(event) => setRotate(true)}
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

export const PageTitle = ({ text = "" }: PageTitleProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <CanvasContainer>
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.4} />
            <BoxDemo position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
      </CanvasContainer>
      <Title className="text-center py-4">{text}</Title>
    </div>
  );
};

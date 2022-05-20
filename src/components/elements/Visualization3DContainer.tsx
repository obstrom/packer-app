import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { BufferGeometry, Color } from "three";

type Visualization3DContainerProps = {
  xPos?: number;
  yPos?: number;
  zPos?: number;
  width?: number;
  depth?: number;
  height?: number;
  color?: Color;
  opacity?: number;
};

export const Visualization3DContainer = ({
  xPos = 0,
  yPos = 0,
  zPos = 0,
  width = 1,
  depth = 1,
  height = 1,
  color = new Color(255, 255, 255),
  opacity = 0.3,
}: Visualization3DContainerProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  // Translation to set origin to a common point for placements
  const translatedXPos = xPos + width / 2;
  const translatedYPos = yPos + depth / 2;
  const translatedZPos = zPos + height / 2;

  return (
    <mesh position={[translatedXPos, translatedZPos, translatedYPos]} ref={ref}>
      <boxGeometry args={[width + 0.001, height + 0.001, depth + 0.001]} />
      <meshStandardMaterial
        color={color}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

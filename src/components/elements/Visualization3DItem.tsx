import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Color } from "three";

type Visualization3DItemProps = {
  xPos?: number;
  yPos?: number;
  zPos?: number;
  width?: number;
  depth?: number;
  height?: number;
  color?: Color;
};

export const Visualization3DItem = ({
  xPos = 0,
  yPos = 0,
  zPos = 0,
  width = 1,
  depth = 1,
  height = 1,
  color = new Color(255, 255, 255),
}: Visualization3DItemProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  // Translation to set origin to a common point for placements
  const translatedXPos = xPos + width / 2;
  const translatedYPos = yPos + depth / 2;
  const translatedZPos = zPos + height / 2;

  return (
    <mesh position={[translatedXPos, translatedYPos, translatedZPos]} ref={ref}>
      <boxGeometry args={[width, depth, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

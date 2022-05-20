import React, { Suspense, useEffect } from "react";
import { VisContainer, VisPlacement } from "../../commons/types";
import { Canvas, useThree } from "@react-three/fiber";
import { Visualization3DContainer } from "./Visualization3DContainer";
import { OrbitControls } from "@three-ts/orbit-controls";
import { Color, Vector3 } from "three";
import { Visualization3DItem } from "./Visualization3DItem";
import { generateRandomColor } from "../../commons/packer3DVisApi";

type Results3DVisualizationProps = {
  visContainerData: VisContainer;
};

type OrbitCameraControllerProps = {
  target?: Vector3;
};

const OrbitCameraController = ({
  target = new Vector3(0, 0, 0),
}: OrbitCameraControllerProps) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 6;
    controls.target = target;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const findSceneScalingFactor = (containerDimensions: Array<number>): number => {
  const TARGET_SIZE = 2.5;
  let largestNumber = 0;
  containerDimensions.forEach((n) =>
    n > largestNumber ? (largestNumber = n) : null
  );
  return TARGET_SIZE / largestNumber;
};

export const Results3DVisualization = ({
  visContainerData,
}: Results3DVisualizationProps) => {
  const scalingFactor = findSceneScalingFactor([
    visContainerData.dx,
    visContainerData.dz,
    visContainerData.dy,
  ]);
  const width = visContainerData.dx * scalingFactor;
  const depth = visContainerData.dy * scalingFactor;
  const height = visContainerData.dz * scalingFactor;
  const items: Array<VisPlacement> = visContainerData.stack.placements;

  return (
    <Canvas>
      <OrbitCameraController
        target={new Vector3(width / 2, depth / 2, height / 2)}
      />
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <pointLight position={[width / 1.5, 3, height / 1.5]} intensity={2} />
        <Visualization3DContainer
          xPos={0}
          yPos={0}
          zPos={0}
          width={width}
          depth={depth}
          height={height}
          color={new Color("orange")}
        />
        {items.map((item, index) => {
          const itemWidth = item.stackable.dx * scalingFactor;
          const itemDepth = item.stackable.dz * scalingFactor;
          const itemHeight = item.stackable.dy * scalingFactor;
          const itemPosX = item.x * scalingFactor;
          const itemPosY = item.z * scalingFactor;
          const itemPosZ = item.y * scalingFactor;

          return (
            <Visualization3DItem
              key={index}
              xPos={itemPosX}
              yPos={itemPosY}
              zPos={itemPosZ}
              width={itemWidth}
              depth={itemDepth}
              height={itemHeight}
              color={generateRandomColor()}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
};

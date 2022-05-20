import * as THREE from "three";
import { Color, Object3D } from "three";
import * as colorConvert from "color-convert";

// Modified version of @skjolber 3d-bin-container-packing visualizer
// Source: https://github.com/skjolber/3d-bin-container-packing/tree/master/visualizer/viewer

export class Stackable {
  dx: number;
  dy: number;
  dz: number;

  name: string;
  id: string;

  step: number;

  constructor(
    name: string,
    id: string,
    step: number,
    dx: number,
    dy: number,
    dz: number
  ) {
    this.name = name;
    this.id = id;
    this.step = step;
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
  }
}

export class Box extends Stackable {
  constructor(
    name: string,
    id: string,
    step: number,
    dx: number,
    dy: number,
    dz: number
  ) {
    super(name, id, step, dx, dy, dz);
  }
}

export class Container extends Stackable {
  loadDx: number;
  loadDy: number;
  loadDz: number;

  stack: Stack;

  constructor(
    name: string,
    id: string,
    step: number,
    dx: number,
    dy: number,
    dz: number,
    loadDx: number,
    loadDy: number,
    loadDz: number
  ) {
    super(name, id, step, dx, dy, dz);

    this.loadDx = loadDx;
    this.loadDy = loadDy;
    this.loadDz = loadDz;

    this.stack = new Stack(step);
  }

  add(stackPlacement: StackPlacement) {
    this.stack.add(stackPlacement);
  }
}

export class StackPlacement {
  stackable: Stackable;
  x: number;
  y: number;
  z: number;

  step: number;

  constructor(
    stackable: Stackable,
    step: number,
    x: number,
    y: number,
    z: number
  ) {
    this.stackable = stackable;
    this.step = step;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Stack {
  placements: Array<StackPlacement>;

  step: number;

  constructor(step: number) {
    this.step = step;
    this.placements = [];
  }

  add(placement: StackPlacement) {
    this.placements.push(placement);
  }
}

export interface ColorScheme {
  getColor(stackable: Stackable): Color;
  getColorScheme(container: Container): ColorScheme;
}

export class RandomColorScheme implements ColorScheme {
  getColor(stackable: Stackable): Color {
    return new Color(255, 255, 255); // TODO - This should generate a random color, hardcoded as white
  }

  getColorScheme(container: Container): ColorScheme {
    return this;
  }
}

export class MemoryColorScheme implements ColorScheme {
  delegate: ColorScheme;
  map: Map<string, Color>;

  constructor(delegate: ColorScheme) {
    this.delegate = delegate;
    this.map = new Map();
  }

  getColor(stackable: Stackable): Color {
    if (!stackable.id) {
      // use random
      return this.delegate.getColor(stackable);
    }
    // use same as before, for the
    let color = this.map.get(stackable.id);
    if (!color) {
      color = this.delegate.getColor(stackable);
      this.map.set(stackable.id, color);
    }
    return color;
  }

  getColorScheme(container: Container): ColorScheme {
    return this;
  }
}

export class StackableRenderer {
  add(
    parent: Object3D,
    colorScheme: ColorScheme,
    stackPlacement: StackPlacement,
    x: number,
    y: number,
    z: number
  ): Object3D | undefined {
    const stackable = stackPlacement.stackable;

    if (stackable instanceof Container) {
      const containerStackable: Container = stackable;

      const color = colorScheme.getColor(containerStackable);
      const containerMaterial = new THREE.LineBasicMaterial({ color: color });
      const containerGeometry = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(
          containerStackable.dy,
          containerStackable.dz,
          containerStackable.dx
        )
      );

      const containerLoadGeometry = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(
          containerStackable.loadDy,
          containerStackable.loadDz,
          containerStackable.loadDx
        )
      );

      const container = new THREE.LineSegments(
        containerGeometry,
        containerMaterial
      );
      const containerLoad = new THREE.LineSegments(
        containerLoadGeometry,
        containerMaterial
      );

      container.position.x = stackPlacement.y + containerStackable.dy / 2 + x;
      container.position.y = stackPlacement.z + containerStackable.dz / 2 + y;
      container.position.z = stackPlacement.x + containerStackable.dx / 2 + z;

      console.log(
        "Add container " +
          containerStackable.name +
          " size " +
          containerStackable.dx +
          "x" +
          containerStackable.dy +
          "x" +
          containerStackable.dz +
          " with load " +
          containerStackable.loadDx +
          "x" +
          containerStackable.loadDy +
          "x" +
          containerStackable.loadDz +
          " at " +
          stackPlacement.x +
          "x" +
          stackPlacement.y +
          "x" +
          stackPlacement.z
      );

      container.name = containerStackable.name;
      container.userData = containerStackable;

      containerLoad.name = containerStackable.name;
      containerLoad.userData = containerStackable;

      parent.add(container);
      container.add(containerLoad);

      const offsetX = -containerStackable.dy / 2;
      const offsetY = -containerStackable.dz / 2;
      const offsetZ = -containerStackable.dx / 2;

      const nextColorScheme = colorScheme.getColorScheme(containerStackable);
      for (let s of containerStackable.stack.placements) {
        this.add(containerLoad, nextColorScheme, s, offsetX, offsetY, offsetZ);
      }

      return container;
    } else if (stackable instanceof Box) {
      const boxStackable: Box = stackable;

      console.log(
        "Add box " +
          boxStackable.name +
          " size " +
          boxStackable.dx +
          "x" +
          boxStackable.dy +
          "x" +
          boxStackable.dz +
          " at " +
          stackPlacement.x +
          "x" +
          stackPlacement.y +
          "x" +
          stackPlacement.z
      );

      const sColor = colorScheme.getColor(boxStackable);

      const material = new THREE.MeshStandardMaterial({
        color: sColor,
        opacity: 0.7,
        metalness: 0.2,
        roughness: 1,
        transparent: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const box = new THREE.Mesh(geometry, material);

      box.name = boxStackable.name;

      box.scale.x = boxStackable.dy;
      box.scale.y = boxStackable.dz;
      box.scale.z = boxStackable.dx;
      box.position.x = stackPlacement.y + boxStackable.dy / 2 + x;
      box.position.y = stackPlacement.z + boxStackable.dz / 2 + y;
      box.position.z = stackPlacement.x + boxStackable.dx / 2 + z;

      box.userData = boxStackable;

      parent.add(box);

      return box;
    }
    return undefined;
  }
}

export const generateRandomColor = (): Color => {
  const randomNumber = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
  };

  const hslColor = {
    h: Math.round(randomNumber(1, 360)),
    s: Math.round(randomNumber(61, 100)),
    l: 50,
  };

  const hexColor =
    "#" + colorConvert.hsl.hex([hslColor.h, hslColor.s, hslColor.l]);
  return new Color(hexColor);
};

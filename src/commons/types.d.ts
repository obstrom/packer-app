import { LengthUnits, WeightUnits } from "./enums";

interface PackerObject {
  uuid: string;
  description: string;
  width: number;
  depth: number;
  height: number;
  weight: number;
  lengthUnit: LengthUnits;
  weightUnit: WeightUnits;
}

interface Bin extends PackerObject {
  maxWeight: number;
}

interface Item extends PackerObject {
  quantity: number;
}

interface FormSelectOption {
  text: string;
  value: string;
}

abstract interface PackerBaseRequestObject {
  id: string;
  description: string;
  width: number;
  depth: number;
  height: number;
  weight: number;
}

interface PackerItemRequest extends PackerBaseRequestObject {
  allowRotation: boolean;
  quantity: number;
}

interface PackerContainerRequest extends PackerBaseRequestObject {
  maxLoad: number;
}

interface PackerJobRequest {
  lengthUnitType: LengthUnits;
  weightUnitType: WeightUnits;
  boxes: Array<PackerContainerRequest>;
  products: Array<PackerItemRequest>;
}

interface PackerJobResult {}

interface ResultContainer {
  id: string;
  description: string;
  totalVolume: number;
  volumeUsedPercentage: number;
  totalWeight: number;
  content: ResultContainerContent;
}

interface ResultContainerContent {
  dz: number;
  itemsPlaced: number;
  volumeLeft: number;
  weightLeftToMaxWeight: number;
}

interface VisContainer {
  step: number;
  id: string;
  name: string;
  dx: number;
  dy: number;
  dz: number;
  loadDx: number;
  loadDy: number;
  loadDz: number;
  stack: VisStack;
  type: string;
}

interface VisStack {
  step: number;
  placements: Array<VisPlacement>;
}

interface VisPlacement {
  step: number;
  x: number;
  y: number;
  z: number;
  stackable: VisPlacementStackable;
}

interface VisPlacementStackable {
  step: number;
  id: string;
  name: string;
  dx: number;
  dy: number;
  dz: number;
  type: string;
}

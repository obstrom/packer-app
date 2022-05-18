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

interface ResultsVolume {
  totalJobVolume: number;
  totalJobVolumeRemaining: number;
  totalJobVolumeUsed: number;
}

interface ResultContainer {
  id: string;
  description: string;
  totalVolume: number;
  volumeUsedPercentage: number;
  totalWeight: number;
  content: ResultContainerContent;
  dimensions: ResultObjectDimensions;
  items: Array<ResultItem>;
}

interface ResultContainerContent {
  dz: number;
  itemsPlaced: number;
  volumeLeft: number;
  weightLeftToMaxWeight: number;
}

interface ResultObjectDimensions {
  width: number;
  depth: number;
  height: number;
  // TODO - Add and handle length unit type ?
}

interface ResultItem {
  description: string;
  dimensions: ResultObjectDimensions;
  quantity: number;
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

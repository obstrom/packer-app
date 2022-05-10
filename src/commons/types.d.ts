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

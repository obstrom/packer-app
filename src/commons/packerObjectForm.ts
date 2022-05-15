// noinspection SpellCheckingInspection
import { v4 as uuidv4 } from "uuid";
import {
  LengthUnits,
  lengthUnitToString,
  stringToLengthUnit,
  stringToWeightUnit,
  WeightUnits,
  weightUnitToString,
} from "./enums";
import { Bin, Item } from "./types";

export interface PackerObjectFormData {
  uuid: string;
  description: string;
  width: string;
  depth: string;
  height: string;
  weight: string;
  maxWeight: string;
  lengthUnit: string;
  weightUnit: string;
  quantity: string;
}

export interface PackerObjectFormError {
  description: boolean;
  width: boolean;
  depth: boolean;
  height: boolean;
  weight: boolean;
  maxWeight: boolean;
  lengthUnit: boolean;
  weightUnit: boolean;
  quantity: boolean;
}

export const convertFormDataToNewBinObject = (
  data: PackerObjectFormData
): Bin => {
  return {
    uuid: uuidv4(),
    description: data.description,
    width: parseInt(data.width),
    depth: parseInt(data.depth),
    height: parseInt(data.height),
    weight: parseInt(data.weight),
    maxWeight: parseInt(data.maxWeight),
    lengthUnit: stringToLengthUnit(data.lengthUnit) as LengthUnits,
    weightUnit: stringToWeightUnit(data.weightUnit) as WeightUnits,
  };
};

export const convertFormDataToBinObject = (data: PackerObjectFormData): Bin => {
  return {
    uuid: data.uuid,
    description: data.description,
    width: parseInt(data.width),
    depth: parseInt(data.depth),
    height: parseInt(data.height),
    weight: parseInt(data.weight),
    maxWeight: parseInt(data.maxWeight),
    lengthUnit: stringToLengthUnit(data.lengthUnit) as LengthUnits,
    weightUnit: stringToWeightUnit(data.weightUnit) as WeightUnits,
  };
};

export const convertFormDataToNewItemObject = (
  data: PackerObjectFormData
): Item => {
  return {
    uuid: uuidv4(),
    description: data.description,
    width: parseInt(data.width),
    depth: parseInt(data.depth),
    height: parseInt(data.height),
    weight: parseInt(data.weight),
    quantity: parseInt(data.quantity),
    lengthUnit: stringToLengthUnit(data.lengthUnit) as LengthUnits,
    weightUnit: stringToWeightUnit(data.weightUnit) as WeightUnits,
  };
};

export const convertFormDataToItemObject = (
  data: PackerObjectFormData
): Item => {
  return {
    uuid: data.uuid,
    description: data.description,
    width: parseInt(data.width),
    depth: parseInt(data.depth),
    height: parseInt(data.height),
    weight: parseInt(data.weight),
    quantity: parseInt(data.quantity),
    lengthUnit: stringToLengthUnit(data.lengthUnit) as LengthUnits,
    weightUnit: stringToWeightUnit(data.weightUnit) as WeightUnits,
  };
};

export const convertBinObjectToFormData = (bin: Bin): PackerObjectFormData => {
  return {
    uuid: bin.uuid,
    description: bin.description,
    width: bin.width.toString(10),
    depth: bin.depth.toString(10),
    height: bin.height.toString(10),
    weight: bin.weight.toString(10),
    maxWeight: bin.maxWeight.toString(10),
    lengthUnit: lengthUnitToString(bin.lengthUnit),
    weightUnit: weightUnitToString(bin.weightUnit),
    quantity: "",
  };
};

export const convertItemObjectToFormData = (
  item: Item
): PackerObjectFormData => {
  return {
    uuid: item.uuid,
    description: item.description,
    width: item.width.toString(10),
    depth: item.depth.toString(10),
    height: item.height.toString(10),
    weight: item.weight.toString(10),
    maxWeight: "",
    lengthUnit: lengthUnitToString(item.lengthUnit),
    weightUnit: weightUnitToString(item.weightUnit),
    quantity: item.quantity.toString(10),
  };
};

export const DEFAULT_FORM_DATA: PackerObjectFormData = {
  uuid: "",
  description: "",
  width: "1",
  depth: "1",
  height: "1",
  weight: "0",
  maxWeight: "999999",
  lengthUnit: "mm",
  weightUnit: "gram",
  quantity: "1",
};

export const DEFAULT_FORM_ERROR: PackerObjectFormError = {
  description: false,
  width: false,
  depth: false,
  height: false,
  weight: false,
  maxWeight: false,
  lengthUnit: false,
  weightUnit: false,
  quantity: false,
};

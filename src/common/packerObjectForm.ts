import {v4 as uuidv4} from "uuid";
import {LengthUnits, stringToLengthUnit, stringToWeightUnit, WeightUnits} from "./enums";

export interface PackerObjectFormData {
    description: string,
    width: string,
    depth: string,
    height: string,
    weight: string,
    maxWeight: string,
    lengthUnit: string,
    weightUnit: string,
    quantity: string
}

export interface PackerObjectFormError {
    description: boolean,
    width: boolean,
    depth: boolean,
    height: boolean,
    weight: boolean,
    maxWeight: boolean,
    lengthUnit: boolean,
    weightUnit: boolean,
    quantity: boolean
}

export const convertFormDataToBinObject = (data: PackerObjectFormData) => {
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
    }
}

export const convertFormDataToItemObject = (data: PackerObjectFormData) => {
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
    }
}
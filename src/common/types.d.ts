import {LengthUnits, WeightUnits} from "./enums";

interface Bin {
    description: string,
    width: number,
    depth: number,
    height: number,
    weight: number,
    maxWeight: number,
    lengthUnit: LengthUnits,
    weightUnit: WeightUnits
}

interface Item {
    description: string,
    width: number,
    depth: number,
    height: number,
    weight: number,
    quantity: number,
    lengthUnit: LengthUnits,
    weightUnit: WeightUnits
}
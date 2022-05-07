import {LengthUnits, WeightUnits} from "./enums";

interface PackerObject {
    uuid: string,
    description: string,
    width: number,
    depth: number,
    height: number,
    weight: number,
    lengthUnit: LengthUnits,
    weightUnit: WeightUnits
}

interface Bin extends PackerObject {
    maxWeight: number
}

interface Item extends PackerObject {
    quantity: number
}

interface FormSelectOption {
    text: string
    value: string
}
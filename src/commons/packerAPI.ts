import {
  Bin,
  Item,
  PackerContainerRequest,
  PackerItemRequest,
  PackerJobRequest,
  ResultContainer,
  ResultContainerContent,
  VisContainer,
  VisStack,
} from "./types";
import {
  LengthUnits,
  stringToLengthUnit,
  stringToWeightUnit,
  WeightUnits,
} from "./enums";

export const convertItemsToPackerItemRequests = (
  items: Array<Item>
): Array<PackerItemRequest> => {
  return items.map((item) => ({
    allowRotation: true,
    id: item.uuid,
    description: item.description,
    width: item.width,
    depth: item.depth,
    height: item.height,
    weight: item.weight,
    quantity: item.quantity,
  }));
};

export const convertBinsToPackerContainerRequests = (
  bins: Array<Bin>
): Array<PackerContainerRequest> => {
  return bins.map((bin) => ({
    id: bin.uuid,
    description: bin.description,
    width: bin.width,
    depth: bin.depth,
    height: bin.height,
    weight: bin.weight,
    maxLoad: bin.maxWeight,
  }));
};

export const createPackerRequestBody = (
  items: Array<Item>,
  bins: Array<Bin>,
  lengthUnit: string,
  weightUnit: string
): PackerJobRequest => {
  return {
    lengthUnitType:
      stringToLengthUnit(lengthUnit) ?? LengthUnits.METRIC_MILLIMETER,
    weightUnitType: stringToWeightUnit(weightUnit) ?? WeightUnits.METRIC_GRAM,
    boxes: convertBinsToPackerContainerRequests(bins),
    products: convertItemsToPackerItemRequests(items),
  };
};

export const deserializePackerResponseResultsContainers = (
  input: Array<any>
): Array<ResultContainer> => {
  return input.map((o) => ({
    id: o.id,
    description: o.description,
    totalVolume: o.totalVolume,
    volumeUsedPercentage: o.volumeUsedPercentage,
    totalWeight: o.totalWeight,
    content: {
      dz: o.content.dz,
      itemsPlaced: o.content.itemsPlaced,
      volumeLeft: o.content.volumeLeft,
      weightLeftToMaxWeight: o.content.weightLeftToMaxWeight,
    },
  }));
};

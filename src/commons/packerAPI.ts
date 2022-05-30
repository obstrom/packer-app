import {Bin, Item, PackerContainerRequest, PackerItemRequest, PackerJobRequest,} from "./types";
import {LengthUnits, WeightUnits,} from "./enums";

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
    lengthUnitType: item.lengthUnit,
    weightUnitType: item.weightUnit,
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
    lengthUnitType: bin.lengthUnit,
    weightUnitType: bin.weightUnit,
  }));
};

export const createPackerRequestBody = (
  items: Array<Item>,
  bins: Array<Bin>,
  visualizer: boolean
): PackerJobRequest => {
  return {
    boxes: convertBinsToPackerContainerRequests(bins),
    products: convertItemsToPackerItemRequests(items),
    visualizer: visualizer
  };
};

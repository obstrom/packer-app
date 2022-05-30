import { PackerObject, ResultsVolume } from "./types";
import {LengthUnits, lengthUnitToString} from "./enums";

export const roundDecimalNumber = (n: number): number => {
  return Math.round((n + Number.EPSILON) * 100) / 100;
};

export const calcSpaceEfficiencyPercentageFromResultsVolume = (
  volume: ResultsVolume | undefined
): string => {
  if (!volume) return "%";
  return calcSpaceEfficiencyPercentage(
    volume.totalJobVolumeUsed,
    volume.totalJobVolume
  );
};

export const calcSpaceEfficiencyPercentage = (
  volumeUsed: number,
  totalVolume: number
): string => {
  if (!volumeUsed && !totalVolume) return "";

  const value = volumeUsed / totalVolume;
  return formatDecimalNumberToStringPercentage(value);
};

export const formatDecimalNumberToStringPercentage = (
  inputNumber: number
): string => {
  const n = inputNumber * 100;
  const rounded = Math.round(n);
  return `${rounded === 0 ? roundDecimalNumber(n) : rounded}%`;
};

export const renderDimensions = (
  width: number,
  depth: number,
  height: number,
  unit: LengthUnits
) => {
  return `${width} x ${depth} x ${height} ${lengthUnitToString(unit)}`;
};

export const renderPackerObjectDimensions = (o: PackerObject) => {
  return renderDimensions(
    o.width,
    o.depth,
    o.height,
    o.lengthUnit
  );
};

import { ResultsVolume } from "./types";

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
  return `${
    rounded === 0 ? Math.round((n + Number.EPSILON) * 100) / 100 : rounded
  }%`;
};

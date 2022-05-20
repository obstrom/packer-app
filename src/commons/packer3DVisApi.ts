import { Color } from "three";
import * as colorConvert from "color-convert";

export const generateRandomColor = (): Color => {
  const randomNumber = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
  };

  const hslColor = {
    h: Math.round(randomNumber(1, 360)),
    s: Math.round(randomNumber(61, 100)),
    l: 50,
  };

  const hexColor =
    "#" + colorConvert.hsl.hex([hslColor.h, hslColor.s, hslColor.l]);
  return new Color(hexColor);
};

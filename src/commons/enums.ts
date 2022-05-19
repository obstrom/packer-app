export const enum LengthUnits {
  METRIC_MILLIMETER = "METRIC_MILLIMETER",
  METRIC_CENTIMETER = "METRIC_CENTIMETER",
  METRIC_DECIMETER = "METRIC_DECIMETER",
  METRIC_METER = "METRIC_METER",
}

export const stringToLengthUnit = (key: string) => {
  switch (key) {
    case "mm":
      return LengthUnits.METRIC_MILLIMETER;
    case "cm":
      return LengthUnits.METRIC_CENTIMETER;
    case "dm":
      return LengthUnits.METRIC_DECIMETER;
    case "m":
      return LengthUnits.METRIC_METER;
  }
};

export const lengthUnitToString = (lengthUnit: LengthUnits) => {
  switch (lengthUnit) {
    case LengthUnits.METRIC_MILLIMETER:
      return "mm";
    case LengthUnits.METRIC_CENTIMETER:
      return "cm";
    case LengthUnits.METRIC_DECIMETER:
      return "dm";
    case LengthUnits.METRIC_METER:
      return "m";
  }
};

export const enum WeightUnits {
  METRIC_GRAM = "METRIC_GRAM",
  METRIC_KILOGRAM = "METRIC_KILOGRAM",
}

export const stringToWeightUnit = (key: string) => {
  switch (key) {
    case "gram":
      return WeightUnits.METRIC_GRAM;
    case "g":
      return WeightUnits.METRIC_GRAM;
    case "kg":
      return WeightUnits.METRIC_KILOGRAM;
  }
};

export const weightUnitToString = (weightUnit: WeightUnits) => {
  switch (weightUnit) {
    case WeightUnits.METRIC_GRAM:
      return "g";
    case WeightUnits.METRIC_KILOGRAM:
      return "kg";
  }
};

export const enum PackerObjectTypes {
  BIN = "bin",
  ITEM = "item",
  NONE = "",
}

export const stringToPackerObjectType = (key: string): PackerObjectTypes => {
  switch (key) {
    case "bin":
      return PackerObjectTypes.BIN;
    case "item":
      return PackerObjectTypes.ITEM;
    default:
      return PackerObjectTypes.NONE;
  }
};

export const packerObjectTypeToString = (type: PackerObjectTypes): string => {
  switch (type) {
    case PackerObjectTypes.BIN:
      return "bin";
    case PackerObjectTypes.ITEM:
      return "item";
    default:
      return "";
  }
};

export const enum PackerJobResponseStatus {
  SUCCESS = "success",
  FAILURE = "failure",
  ERROR = "error",
  TIMEOUT = "timeout",
  NONE = "",
}

export const stringToPackerJobResponseStatus = (
  type: PackerJobResponseStatus
) => {
  switch (type) {
    case PackerJobResponseStatus.SUCCESS:
      return "success";
    case PackerJobResponseStatus.FAILURE:
      return "failure";
    case PackerJobResponseStatus.ERROR:
      return "error";
    case PackerJobResponseStatus.TIMEOUT:
      return "timeout";
    default:
      return "";
  }
};

export const enum AppViewStatus {
  START = "start",
  SETUP = "setup",
  RESULTS = "results",
}

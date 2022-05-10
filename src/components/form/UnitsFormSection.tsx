import React, { Dispatch, SetStateAction } from "react";
import Stack from "react-bootstrap/Stack";
import { FormUnitNumberInput } from "../controls/FormUnitNumberInput";
import {
  PackerObjectFormData,
  PackerObjectFormError,
} from "../../commons/packerObjectForm";
import { PackerObjectTypes } from "../../commons/enums";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormSelect } from "../controls/FormSelect";
import { FormSelectOption } from "../../commons/types";

type UnitsFormSectionProps = {
  formData: PackerObjectFormData;
  setFormData: Dispatch<SetStateAction<PackerObjectFormData>>;
};

const lengthUnitSelectOptions: Array<FormSelectOption> = [
  { value: "mm", text: "millimeter (mm)" },
  { value: "cm", text: "centimeter (cm)" },
  { value: "m", text: "meter (m)" },
];

const weightUnitSelectOptions: Array<FormSelectOption> = [
  { value: "g", text: "gram (g)" },
  { value: "kg", text: "kilogram (kg)" },
];

export const UnitsFormSection = ({
  formData,
  setFormData,
}: UnitsFormSectionProps) => {
  return (
    <>
      <h4>Units</h4>
      <Stack direction="horizontal">
        <FormSelect
          controlId={"lengthUnitSelect"}
          options={lengthUnitSelectOptions}
          label="Length unit"
          onChange={(e) =>
            setFormData({ ...formData, lengthUnit: e.target.value })
          }
          value={formData.lengthUnit}
          className="flex-grow-1"
        />
        <FormSelect
          controlId={"weightUnitSelect"}
          options={weightUnitSelectOptions}
          label="Weight unit"
          onChange={(e) =>
            setFormData({ ...formData, weightUnit: e.target.value })
          }
          value={formData.weightUnit}
          className="flex-grow-1 ms-2"
        />
      </Stack>
    </>
  );
};
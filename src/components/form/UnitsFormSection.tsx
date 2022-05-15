import React, { Dispatch, SetStateAction } from "react";
import Stack from "react-bootstrap/Stack";
import { PackerObjectFormData } from "../../commons/packerObjectForm";
import { FormSelect } from "../controls/FormSelect";
import { FormSelectOption } from "../../commons/types";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <h4>
        <FontAwesomeIcon size="sm" icon={faRuler} className={"me-2"} />
        Units
      </h4>
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

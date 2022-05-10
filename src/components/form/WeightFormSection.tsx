import React, { Dispatch, SetStateAction } from "react";
import Stack from "react-bootstrap/Stack";
import { FormUnitNumberInput } from "../controls/FormUnitNumberInput";
import {
  PackerObjectFormData,
  PackerObjectFormError,
} from "../../commons/packerObjectForm";
import { PackerObjectTypes } from "../../commons/enums";

type WeightFormSectionProps = {
  formType: PackerObjectTypes;
  formData: PackerObjectFormData;
  formError: PackerObjectFormError;
  setFormData: Dispatch<SetStateAction<PackerObjectFormData>>;
  setFormError: Dispatch<SetStateAction<PackerObjectFormError>>;
};

export const WeightFormSection = ({
  formType,
  formData,
  formError,
  setFormData,
  setFormError,
}: WeightFormSectionProps) => {
  return (
    <>
      <h4>Weight</h4>
      <Stack direction="horizontal">
        <FormUnitNumberInput
          label="Weight"
          controlId="inputWeight"
          unitText={formData.weightUnit}
          value={formData.weight}
          setValue={(n: string) => setFormData({ ...formData, weight: n })}
          setError={(b: boolean) => setFormError({ ...formError, weight: b })}
          required={true}
          allowZero={true}
          className="flex-grow-1"
        />
        {formType === PackerObjectTypes.BIN && (
          <FormUnitNumberInput
            label="Max weight"
            controlId="inputMaxWeight"
            unitText={formData.weightUnit}
            value={formData.maxWeight}
            setValue={(n: string) => setFormData({ ...formData, maxWeight: n })}
            setError={(b: boolean) =>
              setFormError({ ...formError, maxWeight: b })
            }
            allowZero={true}
            className="flex-grow-1 ms-2"
          />
        )}
      </Stack>
    </>
  );
};

import React, { Dispatch, SetStateAction } from "react";
import Stack from "react-bootstrap/Stack";
import { FormUnitNumberInput } from "../controls/FormUnitNumberInput";
import {
  PackerObjectFormData,
  PackerObjectFormError,
} from "../../commons/packerObjectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Form from "react-bootstrap/Form";

type DimensionsFormSectionProps = {
  formData: PackerObjectFormData;
  formError: PackerObjectFormError;
  setFormData: Dispatch<SetStateAction<PackerObjectFormData>>;
  setFormError: Dispatch<SetStateAction<PackerObjectFormError>>;
};

export const DimensionsFormSection = ({
  formData,
  formError,
  setFormData,
  setFormError,
}: DimensionsFormSectionProps) => {
  return (
    <>
      <h4 className="fs-5">
        <FontAwesomeIcon
          size="sm"
          icon={faArrowsLeftRightToLine}
          className={"me-2"}
        />
        Dimensions
      </h4>
      <Stack direction="horizontal" gap={2}>
        <FormUnitNumberInput
          label="Width"
          controlId="inputWidth"
          unitText={formData.lengthUnit}
          value={formData.width}
          setValue={(n: string) => setFormData({ ...formData, width: n })}
          setError={(b: boolean) => setFormError({ ...formError, width: b })}
          required={true}
          allowZero={false}
        />
        <FormUnitNumberInput
          label="Depth"
          controlId="inputDepth"
          unitText={formData.lengthUnit}
          value={formData.depth}
          setValue={(n: string) => setFormData({ ...formData, depth: n })}
          setError={(b: boolean) => setFormError({ ...formError, depth: b })}
          required={true}
          allowZero={false}
        />
        <FormUnitNumberInput
          label="Height"
          controlId="inputHeight"
          unitText={formData.lengthUnit}
          value={formData.height}
          setValue={(n: string) => setFormData({ ...formData, height: n })}
          setError={(b: boolean) => setFormError({ ...formError, height: b })}
          required={true}
          allowZero={false}
        />
      </Stack>
    </>
  );
};

import React, { Dispatch, SetStateAction } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FormUnitNumberInput } from "../controls/FormUnitNumberInput";
import { FormTextInput } from "../controls/FormTextInput";
import {
  PackerObjectFormData,
  PackerObjectFormError,
} from "../../commons/packerObjectForm";
import { DimensionsFormSection } from "./DimensionsFormSection";
import { WeightFormSection } from "./WeightFormSection";
import { PackerObjectTypes } from "../../commons/enums";
import { UnitsFormSection } from "./UnitsFormSection";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StandardButton } from "../controls/StandardButton";

type PackerObjectFormProps = {
  formType: PackerObjectTypes;
  formData: PackerObjectFormData;
  setFormData: Dispatch<SetStateAction<PackerObjectFormData>>;
  formError: PackerObjectFormError;
  setFormError: Dispatch<SetStateAction<PackerObjectFormError>>;
  submitButtonLabel: string;
  handleOnSubmit: (e: any) => void;
  allowReset: boolean;
  handleOnReset?: () => void;
};

export const PackerObjectForm = ({
  formType,
  formData,
  setFormData,
  formError,
  setFormError,
  submitButtonLabel,
  handleOnSubmit,
  handleOnReset,
  allowReset,
}: PackerObjectFormProps) => {
  return (
    <Form onSubmit={handleOnSubmit}>
      <Col className="mb-4">
        <h4>
          <FontAwesomeIcon size="sm" icon={faCircleInfo} className={"me-2"} />
          General
        </h4>
        <FormTextInput
          label="Description"
          controlId="inputDescription"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {formType === PackerObjectTypes.ITEM && (
          <Row className="mt-2">
            <Col>
              <FormUnitNumberInput
                label="Quantity"
                controlId="inputQuantity"
                value={formData.quantity}
                setValue={(n: string) =>
                  setFormData({ ...formData, quantity: n })
                }
                setError={(b: boolean) =>
                  setFormError({ ...formError, quantity: b })
                }
                allowZero={false}
                maxValue={999}
              />
            </Col>
          </Row>
        )}
      </Col>
      <Col className="mb-4">
        <DimensionsFormSection
          formData={formData}
          formError={formError}
          setFormData={setFormData}
          setFormError={setFormError}
        />
      </Col>
      <Col className="mb-4">
        <WeightFormSection
          formType={formType}
          formData={formData}
          formError={formError}
          setFormData={setFormData}
          setFormError={setFormError}
        />
      </Col>
      <Col className="mb-4">
        <UnitsFormSection formData={formData} setFormData={setFormData} />
      </Col>
      <Col className="d-flex justify-content-end">
        {allowReset && (
          <StandardButton
            className="mx-2"
            onClick={handleOnReset}
            variant="secondary"
          >
            Reset
          </StandardButton>
        )}
        <StandardButton type="submit">{submitButtonLabel}</StandardButton>
      </Col>
    </Form>
  );
};

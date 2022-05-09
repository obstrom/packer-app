import React, { Dispatch, SetStateAction, useState } from "react";

import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Bin, FormSelectOption, Item } from "../common/types";

import { FormUnitNumberInput } from "./controls/FormUnitNumberInput";
import { FormSelect } from "./controls/FormSelect";
import { FormTextInput } from "./controls/FormTextInput";
import {
  PackerObjectFormData,
  PackerObjectFormError,
  convertFormDataToBinObject,
  convertFormDataToItemObject,
} from "../common/packerObjectForm";

type AddFormProps = {
  bins: Array<Bin>;
  setBins: Dispatch<SetStateAction<Array<Bin>>>;
  items: Array<Item>;
  setItems: Dispatch<SetStateAction<Array<Item>>>;
};

export const DEFAULT_FORM_DATA: PackerObjectFormData = {
  description: "",
  width: "1",
  depth: "1",
  height: "1",
  weight: "0",
  maxWeight: "999999",
  lengthUnit: "mm",
  weightUnit: "gram",
  quantity: "1",
};

export const DEFAULT_FORM_ERROR: PackerObjectFormError = {
  description: false,
  width: false,
  depth: false,
  height: false,
  weight: false,
  maxWeight: false,
  lengthUnit: false,
  weightUnit: false,
  quantity: false,
};

const typeSelectOptions: Array<FormSelectOption> = [
  { value: "bin", text: "Container" },
  { value: "item", text: "Item" },
];

const lengthUnitSelectOptions: Array<FormSelectOption> = [
  { value: "mm", text: "millimeter (mm)" },
  { value: "cm", text: "centimeter (cm)" },
  { value: "m", text: "meter (m)" },
];

const weightUnitSelectOptions: Array<FormSelectOption> = [
  { value: "g", text: "gram (g)" },
  { value: "kg", text: "kilogram (kg)" },
];

const submitFormAction = (
  e: any,
  formType: string,
  formData: PackerObjectFormData,
  formError: PackerObjectFormError,
  bins: Array<Bin>,
  setBins: Dispatch<SetStateAction<Array<Bin>>>,
  items: Array<Item>,
  setItems: Dispatch<SetStateAction<Array<Item>>>
) => {
  e.preventDefault();

  if (!checkNoFormErrors(formError)) return;

  if (formType === "bin") {
    const newBin: Bin = convertFormDataToBinObject(formData);
    setBins([...bins, newBin]);
  } else if (formType === "item") {
    const newItem: Item = convertFormDataToItemObject(formData);
    setItems([...items, newItem]);
  }
};

const checkNoFormErrors = (formError: PackerObjectFormError): boolean => {
  return Object.values(formError).every((v) => v === false);
};

export const AddForm = ({ bins, setBins, items, setItems }: AddFormProps) => {
  const [formType, setFormType] = useState("bin");
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formError, setFormError] = useState(DEFAULT_FORM_ERROR);

  const handleFormOnSubmit = (e: any) =>
    submitFormAction(
      e,
      formType,
      formData,
      formError,
      bins,
      setBins,
      items,
      setItems
    );
  const handleResetButton = () => setFormData(DEFAULT_FORM_DATA);

  return (
    <Form onSubmit={handleFormOnSubmit}>
      <Col className="mb-4">
        {/* TODO - Type selection should be a button group, rather then a dropdown */}
        <FormSelect
          controlId="typeSelect"
          options={typeSelectOptions}
          label="Select type"
          onChange={(e) => setFormType(e.target.value)}
          value={formType}
          className="mb-2"
        />
        <FormTextInput
          label="Description"
          controlId="inputDescription"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Col>
      <Col className="mb-4">
        <h4>Dimensions</h4>
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
      </Col>
      <Col className="mb-4">
        <h4>Weight</h4>
        <Stack direction="horizontal" gap={2}>
          <FormUnitNumberInput
            label="Weight"
            controlId="inputWeight"
            unitText={formData.weightUnit}
            value={formData.weight}
            setValue={(n: string) => setFormData({ ...formData, weight: n })}
            setError={(b: boolean) => setFormError({ ...formError, weight: b })}
            required={true}
            allowZero={true}
          />
          {formType === "bin" && (
            <FormUnitNumberInput
              label="Max weight"
              controlId="inputMaxWeight"
              unitText={formData.weightUnit}
              value={formData.maxWeight}
              setValue={(n: string) =>
                setFormData({ ...formData, maxWeight: n })
              }
              setError={(b: boolean) =>
                setFormError({ ...formError, maxWeight: b })
              }
              allowZero={true}
            />
          )}
        </Stack>
      </Col>
      <Col className="mb-4">
        <h4>Units</h4>
        <Row>
          <Col>
            <FormSelect
              controlId={"lengthUnitSelect"}
              options={lengthUnitSelectOptions}
              label="Length unit"
              onChange={(e) =>
                setFormData({ ...formData, lengthUnit: e.target.value })
              }
              value={formData.lengthUnit}
            />
          </Col>
          <Col>
            <FormSelect
              controlId={"weightUnitSelect"}
              options={weightUnitSelectOptions}
              label="Weight unit"
              onChange={(e) =>
                setFormData({ ...formData, weightUnit: e.target.value })
              }
              value={formData.weightUnit}
            />
          </Col>
        </Row>
      </Col>
      {formType === "item" && (
        <Col className="mb-4">
          <h4>Amount</h4>
          <Row>
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
              />
            </Col>
          </Row>
        </Col>
      )}
      <Col>
        <Button type="submit">Add</Button>
        <Button className="btn-secondary mx-2" onClick={handleResetButton}>
          Reset
        </Button>
      </Col>
    </Form>
  );
};

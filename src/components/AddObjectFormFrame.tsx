import React, { Dispatch, SetStateAction, useState } from "react";
import { PackerObjectForm } from "./form/PackerObjectForm";
import { Bin, FormSelectOption, Item } from "../common/types";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { FormSelect } from "./controls/FormSelect";
import {
  PackerObjectTypes,
  packerObjectTypeToString,
  stringToPackerObjectType,
} from "../common/enums";
import {
  convertFormDataToBinObject,
  convertFormDataToItemObject,
  DEFAULT_FORM_DATA,
  DEFAULT_FORM_ERROR,
  PackerObjectFormData,
  PackerObjectFormError,
} from "../common/packerObjectForm";

type AddObjectContainerProps = {
  bins: Array<Bin>;
  setBins: Dispatch<SetStateAction<Array<Bin>>>;
  items: Array<Item>;
  setItems: Dispatch<SetStateAction<Array<Item>>>;
  className?: string;
};

const Frame = styled(Container)`
  background: #e8e8e8;
`;

const typeSelectOptions: Array<FormSelectOption> = [
  { value: "bin", text: "Container" },
  { value: "item", text: "Item" },
];

const submitFormAction = (
  e: any,
  formType: PackerObjectTypes,
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

export const AddObjectContainer = ({
  bins,
  setBins,
  items,
  setItems,
  className,
}: AddObjectContainerProps) => {
  const [formType, setFormType] = useState(PackerObjectTypes.BIN);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formError, setFormError] = useState(DEFAULT_FORM_ERROR);

  return (
    <Frame className={className}>
      <h3>Add packing object</h3>
      {/* TODO - Type selection should be a button group, rather then a dropdown */}
      <FormSelect
        controlId="typeSelect"
        options={typeSelectOptions}
        label="Select type"
        onChange={(e) => setFormType(stringToPackerObjectType(e.target.value))}
        value={packerObjectTypeToString(formType)}
        className="mb-2"
      />
      <PackerObjectForm
        formType={formType}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        setFormError={setFormError}
        submitButtonLabel="Add"
        handleOnSubmit={(e: any) =>
          submitFormAction(
            e,
            formType,
            formData,
            formError,
            bins,
            setBins,
            items,
            setItems
          )
        }
        allowReset={true}
        handleOnReset={() => setFormData(DEFAULT_FORM_DATA)}
      />
    </Frame>
  );
};

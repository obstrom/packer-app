import React, { useContext, useState } from "react";
import { PackerObjectForm } from "../form/PackerObjectForm";
import { Bin, FormSelectOption, Item } from "../../commons/types";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { FormSelect } from "../controls/FormSelect";
import {
  PackerObjectTypes,
  packerObjectTypeToString,
  stringToPackerObjectType,
} from "../../commons/enums";
import {
  convertFormDataToNewBinObject,
  convertFormDataToNewItemObject,
  DEFAULT_FORM_DATA,
  DEFAULT_FORM_ERROR,
  PackerObjectFormData,
  PackerObjectFormError,
} from "../../commons/packerObjectForm";
import {
  PackerObjectContext,
  PackerObjectContextValue,
} from "../../contexts/PackerObjectContext";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faGifts } from "@fortawesome/free-solid-svg-icons";

type AddObjectContainerProps = {
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
  packerObjectContext: PackerObjectContextValue | null
) => {
  e.preventDefault();

  if (!checkNoFormErrors(formError)) return;

  if (formType === PackerObjectTypes.BIN) {
    const newBin: Bin = convertFormDataToNewBinObject(formData);
    packerObjectContext?.bin?.add(newBin);
  } else if (formType === PackerObjectTypes.ITEM) {
    const newItem: Item = convertFormDataToNewItemObject(formData);
    packerObjectContext?.item?.add(newItem);
  }
};

const checkNoFormErrors = (formError: PackerObjectFormError): boolean => {
  return Object.values(formError).every((v) => v === false);
};

const addButtonText = (type: PackerObjectTypes): string => {
  switch (type) {
    case PackerObjectTypes.BIN:
      return "Add container";
    case PackerObjectTypes.ITEM:
      return "Add item";
    case PackerObjectTypes.NONE:
      return "Add";
  }
};

export const AddObjectContainer = ({ className }: AddObjectContainerProps) => {
  const [formType, setFormType] = useState(PackerObjectTypes.BIN);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formError, setFormError] = useState(DEFAULT_FORM_ERROR);

  const packerObjectContext = useContext(PackerObjectContext);

  return (
    <Frame className={className}>
      <h3>Add packing object</h3>
      <ButtonGroup className="mt-2 mb-4">
        <Button
          type="button"
          size="lg"
          disabled={formType === PackerObjectTypes.BIN}
          onClick={() => setFormType(PackerObjectTypes.BIN)}
          variant={formType === PackerObjectTypes.BIN ? "primary" : "light"}
          className="d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faBoxOpen} />
          <span className="ms-2">Container</span>
        </Button>
        <Button
          type="button"
          size="lg"
          disabled={formType === PackerObjectTypes.ITEM}
          onClick={() => setFormType(PackerObjectTypes.ITEM)}
          variant={formType === PackerObjectTypes.ITEM ? "primary" : "light"}
        >
          <FontAwesomeIcon icon={faGifts} />
          <span className="ms-2">Item</span>
        </Button>
      </ButtonGroup>
      <PackerObjectForm
        formType={formType}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        setFormError={setFormError}
        submitButtonLabel={addButtonText(formType)}
        handleOnSubmit={(e: any) =>
          submitFormAction(
            e,
            formType,
            formData,
            formError,
            packerObjectContext
          )
        }
        allowReset={true}
        handleOnReset={() => setFormData(DEFAULT_FORM_DATA)}
      />
    </Frame>
  );
};

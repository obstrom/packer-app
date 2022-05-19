import React, { useContext, useState } from "react";
import { PackerObjectForm } from "../form/PackerObjectForm";
import { Bin, Item } from "../../commons/types";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { PackerObjectTypes } from "../../commons/enums";
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
import { themeColors } from "../../commons/colors";

type AddObjectContainerProps = {
  className?: string;
};

const Frame = styled<any>(Container)`
  background-color: ${(props) => props.themeColors.secondary};
`;

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
    <Frame className={className} themeColors={themeColors}>
      <h3>Add packing object</h3>
      <style type="text/css">
        {`
            .btn-brand {
              background-color: ${themeColors.brandDarker};
              font-weight: 500;
              color: ${themeColors.textInverted};
            }
            
            .btn-unselected {
              background-color: ${themeColors.secondaryDark};
            }
            
            .btn-unselected:hover {
              background-color: ${themeColors.secondaryDarkDesat};
            }
        `}
      </style>
      <ButtonGroup className="mt-2 mb-4">
        <Button
          type="button"
          size="lg"
          disabled={formType === PackerObjectTypes.BIN}
          onClick={() => setFormType(PackerObjectTypes.BIN)}
          variant={formType === PackerObjectTypes.BIN ? "brand" : "unselected"}
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
          variant={formType === PackerObjectTypes.ITEM ? "brand" : "unselected"}
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

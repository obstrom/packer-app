import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PackerObjectTypes } from "../../commons/enums";
import { PackerObjectForm } from "./PackerObjectForm";
import { Bin, Item } from "../../commons/types";
import {
  convertBinObjectToFormData,
  convertFormDataToBinObject,
  convertFormDataToItemObject,
  convertItemObjectToFormData,
  DEFAULT_FORM_DATA,
  DEFAULT_FORM_ERROR,
  PackerObjectFormData,
  PackerObjectFormError,
} from "../../commons/packerObjectForm";

type EditObjectFormModalProps = {
  show: boolean;
  handleClose: () => void;
  type: PackerObjectTypes;
  object: Item | Bin;
  updateObject: ((updatedItem: Item) => void) | ((updatedBin: Bin) => void);
};

const renderTypeTitle = (type: PackerObjectTypes): string => {
  return type === PackerObjectTypes.BIN ? "container" : type;
};

const submitFormAction = (
  e: any,
  formType: PackerObjectTypes,
  formData: PackerObjectFormData,
  formError: PackerObjectFormError,
  updateObject: ((updatedItem: Item) => void) | ((updatedBin: Bin) => void),
  handleClose: () => void
) => {
  e.preventDefault();

  if (!checkNoFormErrors(formError)) return;

  if (formType === PackerObjectTypes.BIN) {
    const updateBin = updateObject as (updatedBin: Bin) => void;
    const newBin: Bin = convertFormDataToBinObject(formData);
    updateBin(newBin);
  } else if (formType === PackerObjectTypes.ITEM) {
    const updateItem = updateObject as (updatedItem: Item) => void;
    const newItem: Item = convertFormDataToItemObject(formData);
    updateItem(newItem);
  }

  handleClose();
};

const checkNoFormErrors = (formError: PackerObjectFormError): boolean => {
  return Object.values(formError).every((v) => v === false);
};

const updateButtonText = (type: PackerObjectTypes): string => {
  switch (type) {
    case PackerObjectTypes.BIN:
      return "Update container";
    case PackerObjectTypes.ITEM:
      return "Update item";
    case PackerObjectTypes.NONE:
      return "Update";
  }
};

export const EditObjectFormModal = ({
  show,
  handleClose,
  type,
  object,
  updateObject,
}: EditObjectFormModalProps) => {
  const initialFormData =
    type === "bin"
      ? convertBinObjectToFormData(object as Bin)
      : type === "item"
      ? convertItemObjectToFormData(object as Item)
      : DEFAULT_FORM_DATA;

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(DEFAULT_FORM_ERROR);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${renderTypeTitle(type)}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <PackerObjectForm
          formType={type}
          formData={formData}
          setFormData={setFormData}
          formError={formError}
          setFormError={setFormError}
          submitButtonLabel={updateButtonText(type)}
          handleOnSubmit={(e) =>
            submitFormAction(
              e,
              type,
              formData,
              formError,
              updateObject,
              handleClose
            )
          }
          allowReset={false}
        />
      </Modal.Body>
    </Modal>
  );
};

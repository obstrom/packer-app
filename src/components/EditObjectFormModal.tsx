import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PackerObjectTypes } from "../common/enums";
import { PackerObjectForm } from "./form/PackerObjectForm";
import { Bin, Item } from "../common/types";
import {
  convertBinObjectToFormData,
  convertItemObjectToFormData,
  DEFAULT_FORM_DATA,
  DEFAULT_FORM_ERROR,
} from "../common/packerObjectForm";

type EditObjectFormModalProps = {
  show: boolean;
  handleClose: () => void;
  type: PackerObjectTypes;
  object: Item | Bin;
  setObject: (
    type: PackerObjectTypes,
    packerObjects: Array<Bin> | Array<Item>,
    setPackerObjects:
      | Dispatch<SetStateAction<Array<Bin>>>
      | Dispatch<SetStateAction<Array<Item>>>,
    updatedObject: Bin | Item
  ) => void;
};

const renderTypeTitle = (type: PackerObjectTypes): string => {
  return type === PackerObjectTypes.BIN ? "container" : type;
};

export const EditObjectFormModal = ({
  show,
  handleClose,
  type,
  object,
  setObject,
}: EditObjectFormModalProps) => {
  const initialFormData =
    type === "bin"
      ? convertBinObjectToFormData(object as Bin)
      : type == "item"
      ? convertItemObjectToFormData(object as Item)
      : DEFAULT_FORM_DATA;

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(DEFAULT_FORM_ERROR);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${renderTypeTitle(type)}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PackerObjectForm
          formType={type}
          formData={formData}
          setFormData={setFormData}
          formError={formError}
          setFormError={setFormError}
          submitButtonLabel="Update"
          handleOnSubmit={() => console.warn("This needs to be implemented!")}
          allowReset={false}
        />
      </Modal.Body>
    </Modal>
  );
};

import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Bin, Item, PackerObject } from "../../commons/types";
import { lengthUnitToString, PackerObjectTypes } from "../../commons/enums";
import Button from "react-bootstrap/Button";
import { QuantityBadge } from "./QuantityBadge";
import { EditObjectFormModal } from "../form/EditObjectFormModal";

type PackerObjectBadgeProps = {
  object: Bin | Item;
  type: PackerObjectTypes;
  updateObject: ((updatedBin: Bin) => void) | ((updatedItem: Item) => void);
  deleteObject: (id: string) => void;
  className?: string;
};

const BadgeContainer = styled(Stack)`
  background: ${(props) => (props.type === "bin" ? "#313131" : "#606060")};
  color: #fff;
`;

const renderDimensions = (o: PackerObject) => {
  return `${o.width} x ${o.depth} x ${o.height} ${lengthUnitToString(
    o.lengthUnit
  )}`;
};

export const PackerObjectListItem = ({
  object,
  type,
  updateObject,
  deleteObject,
  className,
}: PackerObjectBadgeProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleModalClose = () => setShowEditModal(false);
  const handleModalShow = () => setShowEditModal(true);

  return (
    <BadgeContainer
      type={type}
      direction="horizontal"
      className={`${className} p-2 my-1 rounded justify-content-between`}
    >
      <div className="d-flex">
        {type === "item" && <QuantityBadge item={object as Item} />}
        <span className="flex-grow-1 px-2 border-end">
          {renderDimensions(object)}
        </span>
        <span className="px-2 text-truncate d-inline-block">
          <em>{object.description}</em>
        </span>
      </div>
      <div>
        <Button
          size="sm"
          className="me-2"
          variant="light"
          onClick={handleModalShow}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => deleteObject(object.uuid)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
      <EditObjectFormModal
        show={showEditModal}
        handleClose={handleModalClose}
        type={type}
        object={object}
        updateObject={updateObject}
      />
    </BadgeContainer>
  );
};

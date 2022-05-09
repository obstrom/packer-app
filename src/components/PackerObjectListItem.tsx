import React from "react";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Bin, Item, PackerObject } from "../common/types";
import { lengthUnitToString, PackerObjectTypes } from "../common/enums";
import Button from "react-bootstrap/Button";
import { QuantityBadge } from "./controls/QuantityBadge";

type PackerObjectBadgeProps = {
  object: Bin | Item;
  type: PackerObjectTypes;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  className?: string;
};

const BadgeContainer = styled(Stack)`
  background: ${(props) => (props.type === "bin" ? "#313131" : "#606060")};
  color: #fff;
`;

export const PackerObjectListItem = ({
  object,
  type,
  handleEdit,
  handleDelete,
  className,
}: PackerObjectBadgeProps) => {
  const renderDimensions = (o: PackerObject) => {
    return `${o.width} x ${o.depth} x ${o.height} ${lengthUnitToString(
      o.lengthUnit
    )}`;
  };

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
          onClick={() => handleEdit("")}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDelete(object.uuid)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </BadgeContainer>
  );
};

import React, { Dispatch, SetStateAction } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Bin, Item } from "../common/types";
import styled from "styled-components";
import { PackerObjectListItem } from "./PackerObjectListItem";
import { PackerObjectTypes } from "../common/enums";

const EmptyAccordionButton = styled.div`
  &:after {
    display: none;
  }
`;

type ListPackerObjectFrameProps = {
  headerTitle: string;
  packerObjectType: PackerObjectTypes;
  packerObjects: Array<Bin> | Array<Item>;
  setPackerObjects:
    | Dispatch<SetStateAction<Array<Bin>>>
    | Dispatch<SetStateAction<Array<Item>>>;
  handlePackerObjectDelete: (id: string) => void;
  className?: string;
};

export const ListPackerObjectFrame = ({
  headerTitle,
  packerObjectType,
  packerObjects,
  setPackerObjects,
  handlePackerObjectDelete,
  className,
}: ListPackerObjectFrameProps) => {
  const headerTitleAmount = `${headerTitle} (${packerObjects.length})`;

  return (
    <>
      {packerObjects.length === 0 && (
        <div className={`accordion ${className}`}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <EmptyAccordionButton className="accordion-button collapsed">
                {headerTitleAmount}
              </EmptyAccordionButton>
            </h2>
          </div>
        </div>
      )}
      {packerObjects.length > 0 && (
        <Accordion className={className} defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{headerTitleAmount}</Accordion.Header>
            <Accordion.Body>
              {packerObjects.map((object, index) => (
                <PackerObjectListItem
                  key={index}
                  type={packerObjectType}
                  object={object}
                  handleEdit={() => null}
                  handleDelete={handlePackerObjectDelete}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};

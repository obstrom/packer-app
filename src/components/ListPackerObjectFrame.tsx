import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { PackerObjectListItem } from "./PackerObjectListItem";
import { PackerObjectTypes } from "../common/enums";
import { PackerObjectContext } from "../context/PackerObjectContext";

const EmptyAccordionButton = styled.div`
  &:after {
    display: none;
  }
`;

type ListPackerObjectFrameProps = {
  headerTitle: string;
  packerObjectType: PackerObjectTypes;
  className?: string;
};

export const ListPackerObjectFrame = ({
  headerTitle,
  packerObjectType,
  className,
}: ListPackerObjectFrameProps) => {
  const packerObjectContext = useContext(PackerObjectContext);
  const typedPackerObjectContext =
    packerObjectType === PackerObjectTypes.ITEM
      ? packerObjectContext?.item
      : packerObjectContext?.bin;

  const numberOfObjects = typedPackerObjectContext?.get.length ?? 0;

  const headerTitleAmount = `${headerTitle} (${numberOfObjects})`;

  return (
    <>
      {numberOfObjects === 0 && (
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
      {numberOfObjects > 0 && (
        <Accordion className={className} defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{headerTitleAmount}</Accordion.Header>
            <Accordion.Body>
              {typedPackerObjectContext?.get.map((object, index) => (
                <PackerObjectListItem
                  key={index}
                  type={packerObjectType}
                  object={object}
                  updateObject={typedPackerObjectContext?.update}
                  deleteObject={typedPackerObjectContext?.remove}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};

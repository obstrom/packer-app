import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { PackerObjectListItem } from "../elements/PackerObjectListItem";
import { PackerObjectTypes } from "../../commons/enums";
import { PackerObjectContext } from "../../contexts/PackerObjectContext";
import { themeColors } from "../../commons/colors";

const EmptyAccordionButton = styled.div<any>`
  background: ${(props) => props.themeColors.secondary};
  &:after {
    display: none;
  }
`;

const ScrollableAccordionBody = styled<any>(Accordion.Body)`
  background: ${(props) => props.themeColors.secondary};
  max-height: 26.1rem;
  overflow-y: auto;
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
              <EmptyAccordionButton
                className="accordion-button collapsed"
                themeColors={themeColors}
              >
                {headerTitleAmount}
              </EmptyAccordionButton>
            </h2>
          </div>
        </div>
      )}
      {numberOfObjects > 0 && (
        <Accordion className={className} defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <style type="text/css">
              {`
              .accordion-button {
                background-color: ${themeColors.secondary};
                color: ${themeColors.textMd};
                padding: 12px 16px;
                font-size: 1rem;
              }
              
              .accordion-button:hover {
                background-color: ${themeColors.secondaryDark};
                color: ${themeColors.textMd};
              }
              
              .accordion-button:not(.collapsed) {
                background-color: ${themeColors.secondaryDark};
                color: ${themeColors.textMd};
              }
              
              .accordion-button:focus {
                border: none;
                box-shadow: none;
              }
              
              .accordion-button:not(.collapsed)::after {
                background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23212529%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e")
              }
            `}
            </style>
            <Accordion.Header>{headerTitleAmount}</Accordion.Header>
            <ScrollableAccordionBody className="p-2" themeColors={themeColors}>
              {typedPackerObjectContext?.get.map((object, index) => (
                <PackerObjectListItem
                  key={index}
                  type={packerObjectType}
                  object={object}
                  updateObject={typedPackerObjectContext?.update}
                  deleteObject={typedPackerObjectContext?.remove}
                />
              ))}
            </ScrollableAccordionBody>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};

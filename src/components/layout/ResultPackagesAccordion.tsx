import React from "react";
import { ResultContainer, VisContainer } from "../../commons/types";
import { Accordion } from "react-bootstrap";
import { ResultPackageHeaderInfo } from "./ResultPackageHeaderInfo";
import { ResultPackageItem } from "../elements/ResultPackageItem";
import { themeColors } from "../../commons/colors";
import styled from "styled-components";
import { PackageResults3DView } from "./PackageResults3DView";

type ResultPackagesAccordionProps = {
  resultsContainers: Array<ResultContainer>;
  visData: Array<VisContainer>;
  className?: string;
};

const AccordionBody = styled<any>(Accordion.Body)`
  background: ${(props) => props.themeColors.secondary};
`;

const AccordionItem = styled<any>(Accordion.Item)`
  border-color: rgb(132, 50, 18);
`;

const renderHeaderTitle = (index: number, container: ResultContainer) => {
  const n = index + 1;
  const dimensions =
    container.dimensions.width +
    " x " +
    container.dimensions.depth +
    " x " +
    container.dimensions.height +
    ""; // TODO - Handle unit type
  const desc = container.description;

  return (
    <span>
      <strong>{`Package #${n}`}</strong>
      {` | `}
      <em>{!desc ? dimensions : desc}</em>
    </span>
  );
};

export const ResultPackagesAccordion = ({
  resultsContainers,
  visData,
  className,
}: ResultPackagesAccordionProps) => {
  return (
    <Accordion defaultActiveKey="0" className={className}>
      {resultsContainers.map((container, index) => (
        <AccordionItem
          key={index}
          eventKey={index.toString()}
          themeColors={themeColors}
        >
          <style type="text/css">
            {`
              .accordion-button {
                background-color: ${themeColors.secondaryDark};
                color: ${themeColors.textMd};
              }
              
              .accordion-button:hover {
                background-color: ${themeColors.secondaryDarkDesat};
                color: ${themeColors.textMd};
              }
              
              .accordion-button:not(.collapsed) {
                background-color: ${themeColors.secondaryDarkDesat};
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
          <Accordion.Header>
            {renderHeaderTitle(index, container)}
          </Accordion.Header>
          <AccordionBody themeColors={themeColors}>
            <ResultPackageHeaderInfo container={container} />
            <div className="mt-2 mb-4">
              <h5>Items overview:</h5>
              {container.items.map((item, index) => (
                <ResultPackageItem key={index} item={item} />
              ))}
            </div>
            <div>
              <h5 className="my-2">Package visualization:</h5>
              <PackageResults3DView visContainerData={visData[index]} />
            </div>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

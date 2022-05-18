import React from "react";
import { ResultContainer } from "../../commons/types";
import { Accordion } from "react-bootstrap";
import { ResultPackageHeaderInfo } from "./ResultPackageHeaderInfo";

type ResultPackagesAccordionProps = {
  resultsContainers: Array<ResultContainer>;
  className?: string;
};

const renderHeaderTitle = (index: number, container: ResultContainer) => {
  const n = index + 1;
  const dimensions =
    container.dimensions.width +
    " x " +
    container.dimensions.depth +
    " x " +
    container.dimensions.height +
    " mm"; // TODO - Handle unit type
  const desc = container.description;

  return (
    <span>
      {`#${n} | `}
      <em>{!desc ? dimensions : desc}</em>
    </span>
  );
};

export const ResultPackagesAccordion = ({
  resultsContainers,
  className,
}: ResultPackagesAccordionProps) => {
  return (
    <Accordion defaultActiveKey="0" className={className}>
      {resultsContainers.map((container, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>
            {renderHeaderTitle(index, container)}
          </Accordion.Header>
          <Accordion.Body>
            <ResultPackageHeaderInfo container={container} />
            {/*
              TODO - API expose item data and map each item
              TODO - Implement and show 3D view of package
            */}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

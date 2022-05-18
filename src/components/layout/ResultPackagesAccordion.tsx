import React from "react";
import { ResultContainer } from "../../commons/types";
import { Accordion } from "react-bootstrap";
import { ResultPackageHeaderInfo } from "./ResultPackageHeaderInfo";
import { PackerObjectListItem } from "../elements/PackerObjectListItem";
import { PackerObjectTypes } from "../../commons/enums";
import { ResultPackageItem } from "../elements/ResultPackageItem";

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
            <div className="mt-2">
              <h5>Items overview:</h5>
              {container.items.map((item, index) => (
                <ResultPackageItem key={index} item={item} />
              ))}
            </div>
            {/*
              TODO - Implement and show 3D view of package
            */}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

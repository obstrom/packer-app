import React from "react";
import { ResultContainer } from "../../commons/types";
import Stack from "react-bootstrap/Stack";
import { ResultsDataSegment } from "../elements/ResultsDataSegment";
import {
  faArrowsLeftRightToLine,
  faClipboardCheck,
  faCubes,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import {
  formatDecimalNumberToStringPercentage,
  roundDecimalNumber,
} from "../../commons/displayCalculations";

type ResultPackageHeaderInfoProps = {
  container: ResultContainer;
  className?: string;
};

const renderDimensions = (container: ResultContainer): string => {
  return (
    container.dimensions.width +
    " x " +
    container.dimensions.depth +
    " x " +
    container.dimensions.height +
    ""
  ); // TODO - Handle unit type
};

const renderWeight = (container: ResultContainer): string => {
  const weight = container.totalWeight;
  return weight > 999
    ? roundDecimalNumber(weight / 1000) + " kg"
    : weight + " g";
};

export const ResultPackageHeaderInfo = ({
  container,
  className,
}: ResultPackageHeaderInfoProps) => {
  return (
    <Stack direction="horizontal" className={className} gap={2}>
      <ResultsDataSegment
        label="Items"
        value={container.content.itemsPlaced.toString()}
        icon={faCubes}
        size="sm"
      />
      <ResultsDataSegment
        label="Dimensions"
        value={renderDimensions(container)}
        icon={faArrowsLeftRightToLine}
        size="sm"
      />
      <ResultsDataSegment
        label="Weight"
        value={renderWeight(container)}
        icon={faWeightHanging}
        size="sm"
      />
      <ResultsDataSegment
        label="Space efficiency"
        value={formatDecimalNumberToStringPercentage(
          container.volumeUsedPercentage
        )}
        icon={faClipboardCheck}
        size="sm"
      />
    </Stack>
  );
};

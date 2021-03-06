import React, {useContext} from "react";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import {ResultContainer, ResultsVolume, VisContainer,} from "../../commons/types";
import {PackerResponseContext} from "../../contexts/PackerResponseContext";
import {PackerJobResponseStatus, WeightUnits, weightUnitToString} from "../../commons/enums";
import {ResultsDataSegment} from "../elements/ResultsDataSegment";
import {faBox, faClipboardCheck, faStopwatch, faWeightHanging,} from "@fortawesome/free-solid-svg-icons";
import {ResultPackagesAccordion} from "./ResultPackagesAccordion";
import {calcSpaceEfficiencyPercentageFromResultsVolume} from "../../commons/displayCalculations";
import {themeColors} from "../../commons/colors";

type PackerResultsFrameProps = {
  className?: string;
};

const Frame = styled<any>(Stack)`
  background: ${(props) => props.themeColors.secondary};
`;

const PackagesFrame = styled<any>(Stack)`
  background: #fff;
`;

const renderWeight = (weight: number, unit: WeightUnits) => {
  if (unit === WeightUnits.METRIC_GRAM) {
    return weight > 999 ? `${weight / 1000} kg` : `${weight} g`;
  } else {
    return weight + " kg";
  }
};

export const PackerResultsFrame = ({ className }: PackerResultsFrameProps) => {
  const packerResponseContext = useContext(PackerResponseContext);

  const packerResults: Array<ResultContainer> =
    packerResponseContext?.results ?? [];
  const visData: Array<VisContainer> = packerResponseContext?.visData ?? [];
  const status: PackerJobResponseStatus =
    packerResponseContext?.status ?? PackerJobResponseStatus.NONE;
  const volume: ResultsVolume | undefined =
    packerResponseContext?.info?.resultsVolume ?? undefined;
  const totalWeight: number = packerResponseContext?.info?.totalWeight ?? 0;
  const weightUnit: WeightUnits = packerResponseContext?.info?.weightUnit ?? WeightUnits.METRIC_GRAM;
  const packingTime: number = packerResponseContext?.info?.packingTime ?? 0;

  return (
    <Frame className={className} themeColors={themeColors}>
      <h3 className="fs-4">Packing results</h3>
      {status === PackerJobResponseStatus.SUCCESS && (
        <Stack>
          <Stack direction="horizontal" gap={3} className="mt-2">
            <ResultsDataSegment
              label="Packages"
              value={packerResults.length.toString()}
              icon={faBox}
              size="lg"
            />
            <ResultsDataSegment
              label="Total weight"
              value={renderWeight(totalWeight, weightUnit)}
              icon={faWeightHanging}
              size="lg"
            />
            <ResultsDataSegment
              label="Total space efficiency"
              value={calcSpaceEfficiencyPercentageFromResultsVolume(volume)}
              icon={faClipboardCheck}
              size="lg"
            />
            <ResultsDataSegment
              label="Packing time"
              value={`${packingTime} ms`}
              icon={faStopwatch}
              size="lg"
            />
          </Stack>
          <h4 className="my-2 fs-5">Packages</h4>
          <PackagesFrame className="rounded" themeColors={themeColors}>
            <ResultPackagesAccordion
              resultsContainers={packerResults}
              visData={visData}
            />
          </PackagesFrame>
        </Stack>
      )}
    </Frame>
  );
};

import React, { useContext } from "react";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import {
  ResultContainer,
  ResultsVolume,
  VisContainer,
} from "../../commons/types";
import { PackerResponseContext } from "../../contexts/PackerResponseContext";
import { PackerJobResponseStatus } from "../../commons/enums";
import { ResultsDataSegment } from "../elements/ResultsDataSegment";
import {
  faBox,
  faClipboardCheck,
  faStopwatch,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

type PackerResultsFrameProps = {
  className?: string;
};

const Frame = styled(Stack)`
  background: #e8e8e8;
`;

const calcSpaceEfficiencyPercentage = (
  volume: ResultsVolume | undefined
): string => {
  if (!volume) return "%";
  const value = (volume.totalJobVolumeUsed / volume.totalJobVolume) * 100;
  const roundedValue = Math.round(value);
  return `${
    roundedValue === 0
      ? Math.round((value + Number.EPSILON) * 100) / 100
      : roundedValue
  }%`;
};

const renderWeight = (weight: number) => {
  return weight > 999 ? `${weight / 1000} kg` : `${weight} g`;
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
  const packingTime: number = packerResponseContext?.info?.packingTime ?? 0;

  return (
    <Frame className={className}>
      <h3>Packing results</h3>
      {status === PackerJobResponseStatus.SUCCESS && (
        <Stack>
          <Stack direction="horizontal" gap={4} className="mt-3">
            <ResultsDataSegment
              label="Packages"
              value={packerResults.length.toString()}
              icon={faBox}
            />
            <ResultsDataSegment
              label="Total weight"
              value={renderWeight(totalWeight)}
              icon={faWeightHanging}
            />
            <ResultsDataSegment
              label="Total space efficiency"
              value={calcSpaceEfficiencyPercentage(volume)}
              icon={faClipboardCheck}
            />
            <ResultsDataSegment
              label="Packing time"
              value={`${packingTime} ms`}
              icon={faStopwatch}
            />
          </Stack>
        </Stack>
      )}
    </Frame>
  );
};

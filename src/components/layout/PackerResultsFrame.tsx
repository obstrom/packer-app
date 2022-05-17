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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PackerInfoAlert } from "../elements/PackerInfoAlert";

type PackerResultsFrameProps = {
  className?: string;
};

const Frame = styled(Stack)`
  background: #e8e8e8;
`;

const calcSpaceEfficiencyPercentage = (
  volume: ResultsVolume | undefined
): string => {
  if (!volume) return "";
  return `${Math.round(
    (volume.totalJobVolumeUsed / volume.totalJobVolume) * 100
  )}%`;
};

export const PackerResultsFrame = ({ className }: PackerResultsFrameProps) => {
  const packerResponseContext = useContext(PackerResponseContext);

  const packerResults: Array<ResultContainer> =
    packerResponseContext?.results ?? [];
  const visData: Array<VisContainer> = packerResponseContext?.visData ?? [];
  const requestCounter: number = packerResponseContext?.requestCounter ?? 0;
  const status: PackerJobResponseStatus =
    packerResponseContext?.status ?? PackerJobResponseStatus.NONE;
  const volume: ResultsVolume | undefined =
    packerResponseContext?.resultsVolume ?? undefined;

  return (
    <Frame className={className}>
      <h3>Packing results</h3>
      {status === PackerJobResponseStatus.SUCCESS && (
        <>
          <Col>
            <h4>Overview:</h4>
            <Row>
              <p>{`Containers used: ${packerResults.length}`}</p>
            </Row>
          </Col>
          <Col>
            <h4>Optimization:</h4>
            <Row>
              <p>
                {`Total container space used: ${calcSpaceEfficiencyPercentage(
                  volume
                )}
            `}
              </p>
            </Row>
          </Col>
        </>
      )}
    </Frame>
  );
};

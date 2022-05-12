import React, { useContext } from "react";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import {
  ResultContainer,
  ResultsVolume,
  VisContainer,
} from "../../commons/types";
import { PackerResponseContext } from "../../contexts/PackerResponseContext";
import Badge from "react-bootstrap/Badge";
import { PackerJobResponseStatus } from "../../commons/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type PackerResultsFrameProps = {
  className?: string;
};

const Frame = styled(Stack)`
  background: #e8e8e8;
`;

const renderStatusBadge = (status: PackerJobResponseStatus) => {
  switch (status) {
    case PackerJobResponseStatus.SUCCESS:
      return (
        <Badge className="ms-2" bg="success">
          Success
        </Badge>
      );
    case PackerJobResponseStatus.FAILURE:
      return (
        <Badge className="ms-2" bg="secondary">
          Failure
        </Badge>
      );
    case PackerJobResponseStatus.TIMEOUT:
      return (
        <Badge className="ms-2" bg="danger">
          Timeout
        </Badge>
      );
    case PackerJobResponseStatus.ERROR:
      return (
        <Badge className="ms-2" bg="danger">
          Error
        </Badge>
      );
    case PackerJobResponseStatus.NONE:
      return null;
  }
};

const renderInfoAlert = (status: PackerJobResponseStatus) => {
  if (status === PackerJobResponseStatus.SUCCESS) return null;
  if (status === PackerJobResponseStatus.NONE) return null;

  let variant = "dark";
  let text = "";

  switch (status) {
    case PackerJobResponseStatus.FAILURE:
      text =
        "Could not find any packing solution for this job. Most likely the items does not fit the container(s).";
      break;
    case PackerJobResponseStatus.TIMEOUT:
      variant = "danger";
      text =
        "Packing request timed out. Try reducing the amount of containers and items.";
      break;
    case PackerJobResponseStatus.ERROR:
      variant = "danger";
      text = "Something went wrong! Please try again.";
  }

  return (
    <Alert variant={variant}>
      <Stack direction="horizontal" gap={3}>
        <FontAwesomeIcon size="2x" style={{ opacity: 0.75 }} icon={faWarning} />
        <span>{text}</span>
      </Stack>
    </Alert>
  );
};

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
      <h3>Packing results {renderStatusBadge(status)}</h3>
      {renderInfoAlert(status)}
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

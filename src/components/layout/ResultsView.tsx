import React, { Dispatch, SetStateAction } from "react";
import { PackerResultsFrame } from "./PackerResultsFrame";
import Container from "react-bootstrap/Container";
import { AppViewStatus } from "../../commons/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type ResultsViewProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
  className?: string;
};

const Frame = styled(Container)`
  max-width: 1000px;
`;

const BackButton = styled.div`
  cursor: pointer;
`;

export const ResultsView = ({ setViewStatus, className }: ResultsViewProps) => {
  return (
    <Frame fluid="sm" className="pb-4">
      <BackButton
        className="d-flex align-items-center fs-4 fw-normal p-2"
        onClick={() => setViewStatus(AppViewStatus.SETUP)}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="fs-5" />
        <span className="ms-2">Edit packing job</span>
      </BackButton>
      <PackerResultsFrame className="p-4 border rounded" />
    </Frame>
  );
};

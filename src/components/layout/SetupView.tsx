import React, {Dispatch, SetStateAction, useContext} from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { AddObjectContainer } from "./AddObjectFormFrame";
import { ListPackerObjectFrame } from "./ListPackerObjectFrame";
import { AppViewStatus, PackerObjectTypes } from "../../commons/enums";
import { PackerRequestFrame } from "./PackerRequestFrame";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Stack from "react-bootstrap/Stack";
import {PackerResponseContext} from "../../contexts/PackerResponseContext";
import {ResultContainer} from "../../commons/types";

type SetupViewProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
  className?: string;
};

const Frame = styled(Container)`
  max-width: 1000px;
`;

const ViewNavigationButton = styled.div`
  cursor: pointer;
`;

export const SetupView = ({ setViewStatus, className }: SetupViewProps) => {
  const packerResponseContext = useContext(PackerResponseContext);
  const packerResults: Array<ResultContainer> = packerResponseContext?.results ?? [];

  return (
    <Frame fluid="sm">
      <Stack direction="horizontal" className="justify-content-between">
        <ViewNavigationButton
          className="d-flex align-items-center fs-4 fw-normal p-1"
          onClick={() => setViewStatus(AppViewStatus.START)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="fs-5" />
          <span className="ms-2">Intro</span>
        </ViewNavigationButton>
        {packerResults.length > 0 && <ViewNavigationButton
            className="d-flex align-items-center fs-4 fw-normal p-1 me-2"
            onClick={() => setViewStatus(AppViewStatus.RESULTS)}
        >
          <span>Results</span>
          <FontAwesomeIcon icon={faChevronRight} className="fs-5 ms-2" />
        </ViewNavigationButton>}
      </Stack>
      <Row>
        <Col className="mb-4">
          <Row>
            <AddObjectContainer className="mb-2 p-4 border rounded" />
          </Row>
          <Row>
            <PackerRequestFrame setViewStatus={setViewStatus} />
          </Row>
        </Col>
        <Col>
          <ListPackerObjectFrame
            className="mb-2"
            headerTitle="Containers"
            packerObjectType={PackerObjectTypes.BIN}
          />
          <ListPackerObjectFrame
            headerTitle="Items"
            packerObjectType={PackerObjectTypes.ITEM}
          />
        </Col>
      </Row>
    </Frame>
  );
};

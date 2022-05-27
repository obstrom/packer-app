import React, { Dispatch, SetStateAction } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { AddObjectContainer } from "./AddObjectFormFrame";
import { ListPackerObjectFrame } from "./ListPackerObjectFrame";
import { AppViewStatus, PackerObjectTypes } from "../../commons/enums";
import { PackerRequestFrame } from "./PackerRequestFrame";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type SetupViewProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
  className?: string;
};

const BackButton = styled.div`
  cursor: pointer;
`;

export const SetupView = ({ setViewStatus, className }: SetupViewProps) => {
  return (
    <>
      <Container fluid="sm">
        <BackButton
          className="d-flex align-items-center fs-2 fw-normal p-2"
          onClick={() => setViewStatus(AppViewStatus.START)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="fs-3" />
          <span className="ms-2">Intro</span>
        </BackButton>
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
      </Container>
    </>
  );
};

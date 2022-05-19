import React, { Dispatch, SetStateAction } from "react";
import { AppLogo } from "../elements/AppLogo";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { AddObjectContainer } from "./AddObjectFormFrame";
import { ListPackerObjectFrame } from "./ListPackerObjectFrame";
import { AppViewStatus, PackerObjectTypes } from "../../commons/enums";
import { PackerRequestFrame } from "./PackerRequestFrame";

type SetupViewProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
  className?: string;
};

export const SetupView = ({ setViewStatus, className }: SetupViewProps) => {
  return (
    <>
      <Container fluid="sm">
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

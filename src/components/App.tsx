import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

import { PageTitle } from "./elements/PageTitle";
import { Col, Row } from "react-bootstrap";
import { AddObjectContainer } from "./layout/AddObjectFormFrame";
import { ListPackerObjectFrame } from "./layout/ListPackerObjectFrame";
import { PackerObjectTypes } from "../commons/enums";
import { PackerObjectProvider } from "../contexts/PackerObjectContext";
import { RequestPackFrame } from "./layout/RequestPackFrame";
import { PackerResponseProvider } from "../contexts/PackerResponseContext";
import { PackerResultsFrame } from "./layout/PackerResultsFrame";

// TODO - https://github.com/pmndrs/react-three-fiber

const AppContainer = styled.div`
  background-color: #fff;
  min-width: 100vw;
  min-height: 100vh;
`;

function App() {
  return (
    <PackerObjectProvider>
      <PackerResponseProvider>
        <AppContainer>
          <PageTitle text={"PackMe"} />
          <Container fluid="sm">
            <Row className="mb-4">
              <Col>
                <AddObjectContainer className="p-4 border rounded" />
              </Col>
              <Col>
                <ListPackerObjectFrame
                  className="mb-2"
                  headerTitle="Containers"
                  packerObjectType={PackerObjectTypes.BIN}
                />
                <ListPackerObjectFrame
                  className="mb-2"
                  headerTitle="Items"
                  packerObjectType={PackerObjectTypes.ITEM}
                />
                <RequestPackFrame />
              </Col>
            </Row>
            <Row>
              <Col>
                <PackerResultsFrame />
              </Col>
            </Row>
          </Container>
        </AppContainer>
      </PackerResponseProvider>
    </PackerObjectProvider>
  );
}

export default App;

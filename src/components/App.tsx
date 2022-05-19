import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

import { PageTitle } from "./elements/PageTitle";
import { Col, Row } from "react-bootstrap";
import { AddObjectContainer } from "./layout/AddObjectFormFrame";
import { ListPackerObjectFrame } from "./layout/ListPackerObjectFrame";
import { PackerObjectTypes } from "../commons/enums";
import { PackerObjectProvider } from "../contexts/PackerObjectContext";
import { PackerRequestFrame } from "./layout/PackerRequestFrame";
import { PackerResponseProvider } from "../contexts/PackerResponseContext";
import { PackerResultsFrame } from "./layout/PackerResultsFrame";
import { Footer } from "./layout/Footer";

const AppContainer = styled.div`
  font-family: "Inter", sans-serif;
  background-color: #fff;
  min-width: 100vw;
  min-height: 100vh;
`;

function App() {
  return (
    <PackerObjectProvider>
      <PackerResponseProvider>
        <AppContainer className="pb-5">
          <PageTitle text={"PackMe"} />
          <Container fluid="sm">
            <Row className="mb-4">
              <Col className="mb-4">
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
                <PackerRequestFrame />
              </Col>
            </Row>
            <Row>
              <Col>
                <PackerResultsFrame className="p-4 border rounded" />
              </Col>
            </Row>
          </Container>
          <Footer className="mt-4" />
        </AppContainer>
      </PackerResponseProvider>
    </PackerObjectProvider>
  );
}

export default App;

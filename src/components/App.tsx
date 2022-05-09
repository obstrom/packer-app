import React, { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

import { Bin, Item } from "../common/types";
import { PageTitle } from "./elements/PageTitle";
import { Col, Row } from "react-bootstrap";
import { AddObjectContainer } from "./AddObjectFormFrame";
import { ListPackerObjectFrame } from "./ListPackerObjectFrame";
import { PackerObjectTypes } from "../common/enums";

// TODO - https://github.com/pmndrs/react-three-fiber

const AppContainer = styled.div`
  background-color: #fff;
  min-width: 100vw;
  min-height: 100vh;
`;

const SetupContainer = styled.div`
  max-width: 720px;
`;

function App() {
  const [bins, setBins] = useState<Array<Bin>>([]);
  const [items, setItems] = useState<Array<Item>>([]);

  const deleteBin = (id: string) => {
    setBins(bins.filter((bin) => bin.uuid != id).map((bin) => bin));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.uuid != id).map((item) => item));
  };

  return (
    <AppContainer>
      <PageTitle text={"PackMe"} />
      <Container fluid="sm">
        <Row>
          <Col>
            <AddObjectContainer
              className="p-4 border rounded"
              bins={bins}
              setBins={setBins}
              items={items}
              setItems={setItems}
            />
          </Col>
          <Col>
            <ListPackerObjectFrame
              className="mb-2"
              headerTitle="Containers"
              packerObjectType={PackerObjectTypes.BIN}
              packerObjects={bins}
              setPackerObjects={setBins}
              handlePackerObjectDelete={deleteBin}
            />
            <ListPackerObjectFrame
              className="mb-2"
              headerTitle="Items"
              packerObjectType={PackerObjectTypes.ITEM}
              packerObjects={items}
              setPackerObjects={setItems}
              handlePackerObjectDelete={deleteItem}
            />
          </Col>
        </Row>
      </Container>
    </AppContainer>
  );
}

export default App;

import React, {useState} from 'react';
import styled from "styled-components";

import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";

import {Bin, Item} from "../common/types";
import {PageTitle} from "./elements/PageTitle";
import {AddForm} from "./AddForm";
import {Col, Row} from "react-bootstrap";
import {AddObjectContainer} from "./AddObjectFormFrame";
import {ListPackerObjectFrame} from "./ListPackerObjectFrame";

// TODO - https://github.com/pmndrs/react-three-fiber

const AppContainer = styled.div`
  background-color: #fff;
  min-width: 100vw;
  min-height: 100vh;
`

const SetupContainer = styled.div`
  max-width: 720px;
`

function App() {
    const [bins, setBins] = useState<Array<Bin>>([]);
    const [items, setItems] = useState<Array<Item>>([]);

    return (
        <AppContainer>
            <PageTitle text={"PackMe"} />
            <Container fluid="sm">
                <Row>
                    <Col>
                        <AddObjectContainer setBins={setBins} setItems={setItems} />
                    </Col>
                    <Col>
                        <ListPackerObjectFrame className="mb-2" headerTitle="Containers" packerObjects={bins} />
                        <ListPackerObjectFrame className="mb-2" headerTitle="Items" packerObjects={items} />
                    </Col>
                </Row>
            </Container>
        </AppContainer>
    );
}

export default App;

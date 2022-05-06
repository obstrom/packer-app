import React, {useState} from 'react';

import {Bin, Item} from "../common/types";
import styled from "styled-components";
import {PageTitle} from "./elements/PageTitle";
import {Form} from "react-bootstrap";
import {AddForm} from "./AddForm";

// TODO - https://github.com/pmndrs/react-three-fiber

const AppContainer = styled.div`
  background-color: #1e90ff;
  min-width: 100vw;
  min-height: 100vh;
`

function App() {
    const [containers, setContainers] = useState<Array<Bin>>([]);
    const [items, setItems] = useState<Array<Item>>([]);

    return (
        <AppContainer>
            <PageTitle text={"PackMe"} />
            <AddForm setContainers={setContainers} setItems={setItems} />
        </AppContainer>
    );
}

export default App;

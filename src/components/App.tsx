import React, {useState} from 'react';

import {Container, Item} from "../common/types";

// TODO - https://github.com/pmndrs/react-three-fiber

const theme = {
    global: {
        colors: {
        },
        font: {
            family: "Quicksand",
            size: "18px",
            height: "20px"
        }
    }
}

function App() {
    const [containers, setContainers] = useState<Array<Container>>([]);
    const [items, setItems] = useState<Array<Item>>([]);

    return (
        <div></div>
    );
}

export default App;

import React, {useState} from 'react';
import {Box, Footer, Grommet, Header, Heading, Main, Text} from "grommet";

import {DarkModeButton} from "./controls/DarkModeButton";
import {ContainersSection} from "./setup/ContainersSection";
import {SiteLogo} from "./element/SiteLogo";
import {ItemsSection} from "./setup/ItemsSection";
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
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [containers, setContainers] = useState<Array<Container>>([]);
    const [items, setItems] = useState<Array<Item>>([]);

    const themeMode = darkMode ? "dark" : "light";

    return (
        <Grommet
            theme={theme}
            themeMode={themeMode}
            background={{light: "light-1", dark: "dark-2"}}
        >
            <Box fill style={{minHeight: "100vh"}}>
                <Header
                    background={{light: "light-4", dark: "dark-1"}}
                    pad={{horizontal: "medium", vertical: "none"}}
                    elevation="medium"
                    style={{zIndex: '1'}}
                >
                    <SiteLogo />
                    <DarkModeButton
                        isDarkMode={darkMode}
                        handleClick={() => setDarkMode(state => !state)}
                    />
                </Header>
                <Main pad={{horizontal: "large", top: "small"}} width="xlarge" alignSelf="center">
                    <Heading level="2" size="small" style={{fontWeight: "600"}}>Setup</Heading>
                    <ContainersSection containers={containers} setContainers={setContainers} />
                    <ItemsSection items={items} setItems={setItems} />
                    <Heading level="2" size="small" style={{fontWeight: "600"}}>Results</Heading>
                </Main>
                <Footer justify="center" margin={{vertical: "large"}}>
                    <Text size="small" weight={"bold"}>add info and credits here</Text>
                </Footer>
            </Box>
        </Grommet>
    );
}

export default App;

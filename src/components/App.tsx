import React, {useState} from 'react';
import {Box, Footer, Grommet, Header, Heading, Main, Paragraph, Text} from "grommet";

import {DarkModeButton} from "./controls/DarkModeButton";
import {ContainersSection} from "./setup/ContainersSection";
import {SiteLogo} from "./element/SiteLogo";
import {AddContainerFormModal} from "./setup/AddContainerFormModal";
import {ItemsSection} from "./setup/ItemsSection";

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
    const [darkMode, setDarkMode] = useState(false);

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
                    <ContainersSection />
                    <ItemsSection />
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

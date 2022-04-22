import React, {useState} from 'react';
import {Box, Footer, Grommet, Heading, Main} from "grommet";
import {DarkModeButton} from "./controls/DarkModeButton";
import {HeaderBar} from "./layout/HeaderBar";

const theme = {
    global: {
        colors: {
            bgLight: "#FFF",
            bgDark: "#242424",
            light1: "#d7c6ac",
            light2: "#9a8d78",
            dark1: "#2a2a2a",
            dark2: "#4b4b4b"
        },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px'
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
            background={{ light: "bgLight", dark: "bgDark" }}
        >
            <Box fill>
                <HeaderBar>
                    <Heading level="1" size="small">Packer App</Heading>
                    <DarkModeButton isDarkMode={darkMode} handleClick={() => setDarkMode(state => !state)}/>
                </HeaderBar>
                <Main>
                    <Heading level="2" size="small">Main stuff</Heading>
                </Main>
                <Footer>
                    <Heading level="3" size="small">Footer</Heading>
                </Footer>
            </Box>
        </Grommet>
    );
}

export default App;

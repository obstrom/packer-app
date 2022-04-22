import React, {useState} from 'react';
import {Box, Button, Footer, Grommet, Header, Heading, Main, Text} from "grommet";
import {DarkModeButton} from "./controls/DarkModeButton";
import {Package, Trash} from "grommet-icons";

// TODO - https://github.com/pmndrs/react-three-fiber

const theme = {
    global: {
        colors: {
        },
        font: {
            family: "Quicksand",
            size: "18px",
            height: "20px",
            letterSpacing: "10px"
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
            background={{ light: "light-1", dark: "dark-2" }}
        >
            <Box fill style={{ minHeight: "100vh" }}>
                <Header
                    background={{ light: "light-4", dark: "dark-1" }}
                    pad={{ horizontal: "medium", vertical: "none" }}
                    elevation="medium"
                    style={{ zIndex: '1' }}
                >
                    <Box
                        direction="row"
                        align="center"
                    >
                        <Package
                            size="large"
                        />
                        <Heading
                            level="1"
                            size="small"
                            margin={{ left: "small" }}
                            style={{fontWeight: "900", userSelect: "none"}}
                        >
                            PackMe
                        </Heading>
                    </Box>
                    <DarkModeButton
                        isDarkMode={darkMode}
                        handleClick={() => setDarkMode(state => !state)}
                    />
                </Header>
                <Main
                    pad={{ horizontal: "large", top: "small" }}
                >
                    <Heading level="2" size="small" style={{ fontWeight: "600" }}>Setup</Heading>
                    <Box
                        fill="horizontal"
                        background={{ light: "light-4", dark: "dark-1" }}
                        round="small"
                        pad={{ horizontal: "small", vertical: "small" }}
                        margin={{ bottom: "small" }}
                    >
                        <Box
                            direction="row"
                            justify="between"
                            align="center"
                        >
                            <Heading level="3" size="small" margin={{ vertical: "none", left: "small" }}>Boxes</Heading>
                            <Box direction="row">
                                <Button
                                    label="Add box"
                                    margin={{ left: "small" }}
                                    style={{ fontWeight: "600" }}
                                />
                                <Button
                                    icon={<Trash />}
                                    plain={false}
                                    margin={{ left: "small" }}
                                    tip="Remove all"
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        fill="horizontal"
                        background={{ light: "light-4", dark: "dark-1" }}
                        round="small"
                        pad={{ horizontal: "small", vertical: "small" }}
                        margin={{ bottom: "small" }}
                    >
                        <Box
                            direction="row"
                            justify="between"
                            align="center"
                        >
                            <Heading level="3" size="small" margin={{ vertical: "none", left: "small" }}>Items</Heading>
                            <Box direction="row">
                                <Button
                                    label="Add item"
                                    margin={{ left: "small" }}
                                    style={{ fontWeight: "600" }}
                                />
                                <Button
                                    icon={<Trash />}
                                    plain={false}
                                    margin={{ left: "small" }}
                                    tip="Remove all"
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Heading level="2" size="small" style={{ fontWeight: "600" }}>Results</Heading>
                </Main>
                <Footer
                    justify="center"
                    margin={{ vertical: "large" }}
                >
                    <Text size="small" weight={"bold"}>add info and credits here</Text>
                </Footer>
            </Box>
        </Grommet>
    );
}

export default App;

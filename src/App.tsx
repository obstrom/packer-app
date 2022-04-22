import React, {useState} from 'react';
import {Grommet} from "grommet";
import {DarkModeButton} from "./components/DarkModeButton";
import {HeaderBar} from "./components/HeaderBar";

const theme = {
    global: {
        colors: {
            bgLight: "#FFF",
            bgDark: "#242424",
            primaryLight: "#d7c6ac",
            primaryDark: "#181818"
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
            <HeaderBar>
                <h1>Packer App</h1>
                <DarkModeButton isDarkMode={darkMode} handleClick={() => setDarkMode(state => !state)} />
            </HeaderBar>
        </Grommet>
    );
}

export default App;

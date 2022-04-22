import {Button} from "grommet";
import { Sun } from "grommet-icons";

type DarkModeButtonProps = {
    isDarkMode: boolean,
    handleClick: () => void
}

export const DarkModeButton = ({ isDarkMode, handleClick }: DarkModeButtonProps) => {
    const currentMode = isDarkMode ? "Dark" : "Light";

    return (
        <Button
            className={`dark-mode-button toggle-${currentMode.toLowerCase()}`}
            onClick={handleClick}
        >
            <Sun size="medium"/>
        </Button>
    );
};
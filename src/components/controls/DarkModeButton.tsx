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
            a11yTitle="Dark mode toggle"
            className={`dark-mode-button toggle-${currentMode.toLowerCase()}`}
            onClick={handleClick}
            hoverIndicator={true}
            icon={<Sun size="medium"/>}
            plain={false}
        />
    );
};
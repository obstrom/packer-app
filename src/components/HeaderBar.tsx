import {Box} from "grommet";

export const HeaderBar = ({ children }: any) => {
    return (
        <Box
            direction="row"
            align="center"
            background={{ dark: "primaryDark", light: "primaryLight" }}
            justify="between"
            pad={{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation="medium"
            style={{ zIndex: '1' }}
        >
            {children}
        </Box>
    );
};
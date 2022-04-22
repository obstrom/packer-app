import {Box} from "grommet";

export const HeaderBar = ({ children }: any) => {
    return (
        <Box
            direction="row"
            align="center"
            background={{ light: "light1", dark: "dark1" }}
            justify="between"
            pad={{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation="medium"
            style={{ zIndex: '1' }}
        >
            {children}
        </Box>
    );
};
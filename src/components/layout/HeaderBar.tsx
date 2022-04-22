import {Header} from "grommet";

export const HeaderBar = ({ children }: any) => {
    return (
        <Header
            direction="row"
            align="center"
            background={{ light: "light1", dark: "dark1" }}
            justify="between"
            pad={{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation="medium"
            style={{ zIndex: '1' }}
        >
            {children}
        </Header>
    );
};
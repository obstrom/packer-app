import {Package} from "grommet-icons";
import {Box, Heading} from "grommet";

export const SiteLogo = () => {
    return (
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
                margin={{left: "small"}}
                style={{fontWeight: "900", userSelect: "none"}}
            >
                PackIt
            </Heading>
        </Box>
    );
};
import React from 'react';
import {Box, Button, Text} from "grommet";
import {Container} from "../../common/types";
import {lengthUnitToString, weightUnitToString} from "../../common/enums";
import {FormClose, FormEdit} from "grommet-icons";

type ListContainerProps = {
    index: number
    container: Container
}

export const ListContainer = ({ index, container }: ListContainerProps) => {
    return (
        <Box
            direction="row"
            pad={{ horizontal: "medium", vertical: "small" }}
            background={{ light: "light-1", dark: "dark-2" }}
            round="small"
            justify="between"
        >
            <Box
                direction="row"
                gap="small"
            >
                <Text>{`${index + 1}. `}</Text>
                <Text>{`${container.width} x ${container.depth} x ${container.height} ${lengthUnitToString(container.lengthUnit)}`}</Text>
                <Text>{`${container.weight} ${weightUnitToString(container.weightUnit)}`}</Text>
                <Text>{`${container.maxWeight} ${weightUnitToString(container.weightUnit)}`}</Text>
                <Text weight={500} style={{fontStyle: "italic"}}>{container.description}</Text>
            </Box>
            <Box direction="row" gap="small">
                <Button plain icon={<FormEdit />} />
                <Button plain icon={<FormClose />} />
            </Box>
        </Box>
    );
};
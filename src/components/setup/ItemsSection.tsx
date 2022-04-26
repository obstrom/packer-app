import {Box, Button, Form, Heading, Layer, Select, TextInput} from "grommet";
import {AddButton} from "../controls/AddButton";
import {TrashButton} from "../controls/TrashButton";
import {useState} from "react";
import {Close} from "grommet-icons";

type ItemsSectionProps = {
    amount?: number
}

export const ItemsSection = ({ amount = 0 }: ItemsSectionProps) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <Box
            fill="horizontal"
            background={{light: "light-4", dark: "dark-1"}}
            round="small"
            pad={{horizontal: "small", vertical: "small"}}
            margin={{bottom: "small"}}
        >
            <Box
                direction="row"
                justify="between"
                align="center"
            >
                <Heading level="3" size="small" margin={{vertical: "none", left: "small"}}>
                    {(amount > 0) ? `Items (${amount})` : "Items"}
                </Heading>
                <Box direction="row">
                    <AddButton handleOnClick={openModal} />
                    <TrashButton tip="Remove all" margin={{ left: "small" }} />
                </Box>
            </Box>
            {showModal && null}
        </Box>
    );
};
import {Box, Button, Form, Heading, Layer, Select, TextInput} from "grommet";
import {AddButton} from "../controls/AddButton";
import {TrashButton} from "../controls/TrashButton";
import {useState} from "react";
import {Close} from "grommet-icons";

type SetupSectionProps = {
    title: string,
    typeName: string,
    amount?: number
}

export const SetupSection = ({ title, typeName, amount = 0 }: SetupSectionProps) => {
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
                    {(amount > 0) ? `${title} (${amount})` : title}
                </Heading>
                <Box direction="row">
                    <AddButton handleOnClick={openModal} />
                    <TrashButton tip="Remove all" margin={{ left: "small" }} />
                </Box>
            </Box>
            {showModal && <Layer
                full="horizontal"
                margin={{ horizontal: "xlarge" }}
                onEsc={closeModal}
                onClickOutside={closeModal}
            >
                <Box pad="medium">
                    <Box direction="row" justify="between" margin="none">
                        <Heading level="3" margin="none">Add container</Heading>
                        <Button onClick={closeModal}><Close /></Button>
                    </Box>
                    <Form>
                        <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }}>Details</Heading>
                        <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                            <Box flex="shrink">
                                <TextInput
                                    type="text"
                                    placeholder="SKU"
                                    size="small"
                                    required={false}
                                />
                            </Box>
                            <Box flex="grow">
                                <TextInput
                                    type="text"
                                    placeholder="Description"
                                    size="small"
                                    style={{ flex: 3 }}
                                    required={false}
                                />
                            </Box>
                        </Box>
                        <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }} >Dimensions</Heading>
                        <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                            <Box>
                                <TextInput
                                    type="number"
                                    placeholder="Width"
                                    size="small"
                                    required={true}
                                />
                            </Box>
                            <Box>
                                <TextInput
                                    type="number"
                                    placeholder="Depth"
                                    size="small"
                                    required={true}
                                />
                            </Box>
                            <Box>
                                <TextInput
                                    type="number"
                                    placeholder="Height"
                                    size="small"
                                    required={true}
                                />
                            </Box>
                            <Box flex="grow">
                                <Select
                                    placeholder="Unit"
                                    options={["mm", "cm", "dm", "m"]}
                                    size="small"
                                    selected={0}
                                    required={true}
                                />
                            </Box>
                        </Box>
                        <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }} >Weight</Heading>
                        <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                            <Box>
                                    <TextInput
                                    type="number"
                                    placeholder="Weight"
                                    size="small"
                                    required={true}
                                />
                            </Box>
                            <Box>
                                <TextInput
                                    type="number"
                                    placeholder="Max weight"
                                    size="small"
                                    required={true}
                                />
                            </Box>
                            <Box flex="grow">
                                <Select
                                    placeholder="Unit"
                                    options={["gram", "kg"]}
                                    size="small"
                                    selected={0}
                                    required={true}
                                />
                            </Box>
                        </Box>
                        <Box direction="row" gap="small" margin={{ vertical: "small", top: "medium" }} justify="start">
                            <Button
                                primary
                                color="status-ok"
                                type="submit"
                                label="Add container"
                                size="large"
                                plain={false}
                                style={{ fontWeight: 800, color: "white" }}
                            />
                        </Box>
                    </Form>
                </Box>
            </Layer>}
        </Box>
    );
};
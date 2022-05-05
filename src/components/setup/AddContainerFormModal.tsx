import React, {Dispatch, SetStateAction, useState} from 'react';
import {Box, Button, Form, Heading, Layer} from "grommet";
import {Close} from "grommet-icons";

import {FormTextFieldString} from "../controls/FormTextFieldString";
import {FormTextFieldPositiveInteger} from "../controls/FormTextFieldPositiveInteger";
import {FormSelectField} from "../controls/FormSelectField";
import {Container} from "../../common/types";
import {LengthUnits, WeightUnits, stringToLengthUnit, stringToWeightUnit} from "../../common/enums";

type AddContainerFormModalProps = {
    closeModal: () => void,
    containers: Array<Container>
    setContainers: Dispatch<SetStateAction<Array<Container>>>
}

export const AddContainerFormModal = ({ closeModal, containers, setContainers }: AddContainerFormModalProps) => {
    const [descriptionInput, setDescriptionInput] = useState<string>("");
    const [widthInput, setWidthInput] = useState<string>("");
    const [depthInput, setDepthInput] = useState<string>("");
    const [heightInput, setHeightInput] = useState<string>("");
    const [weightInput, setWeightInput] = useState<string>("");
    const [maxWeightInput, setMaxWeightInput] = useState<string>("");
    const [lengthUnitInput, setLengthUnitInput] = useState<string>("mm");
    const [weightUnitInput, setWeightUnitInput] = useState<string>("gram");

    const handleSubmit = () => {
        const newContainer: Container = {
            description: descriptionInput,
            width: parseInt(widthInput),
            depth: parseInt(depthInput),
            height: parseInt(heightInput),
            weight: parseInt(weightInput),
            maxWeight: parseInt(maxWeightInput),
            lengthUnit: stringToLengthUnit(lengthUnitInput) as LengthUnits,
            weightUnit: stringToWeightUnit(weightUnitInput) as WeightUnits
        }

        setContainers([...containers, newContainer]);
    }

    return (
        <Layer
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
                <Form onSubmit={handleSubmit}>
                    <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }}>Details</Heading>
                    <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                        <Box flex="grow">
                            <FormTextFieldString
                                label="Description"
                                name="description"
                                placeholder="Identifier like name or description"
                                value={descriptionInput}
                                required={true}
                                setValue={setDescriptionInput}
                            />
                        </Box>
                    </Box>
                    <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }} >Dimensions</Heading>
                    <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                        <Box>
                            <FormTextFieldPositiveInteger
                                name="width"
                                label="Width"
                                value={widthInput}
                                required={true}
                                setValue={setWidthInput}
                            />
                        </Box>
                        <Box>
                            <FormTextFieldPositiveInteger
                                name="depth"
                                label="Depth"
                                value={depthInput}
                                required={true}
                                setValue={setDepthInput}
                            />
                        </Box>
                        <Box>
                            <FormTextFieldPositiveInteger
                                name="height"
                                label="Height"
                                value={heightInput}
                                required={true}
                                setValue={setHeightInput}
                            />
                        </Box>
                        <Box flex="grow" direction="column">
                            <FormSelectField
                                label="Unit"
                                placeholder="Select unit"
                                options={["mm", "cm", "dm", "m"]}
                                value={lengthUnitInput}
                                required={true}
                                setUnit={setLengthUnitInput}
                            />
                        </Box>
                    </Box>
                    <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }} >Weight</Heading>
                    <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                        <Box>
                            <FormTextFieldPositiveInteger
                                label="Weight"
                                name="weight"
                                value={weightInput}
                                required={true}
                                setValue={setWeightInput}
                            />
                        </Box>
                        <Box>
                            <FormTextFieldPositiveInteger
                                label="Max weight"
                                name="maxWeight"
                                value={maxWeightInput}
                                required={true}
                                setValue={setMaxWeightInput}
                            />
                        </Box>
                        <Box flex="grow">
                            <FormSelectField
                                label="Unit"
                                placeholder="Select unit"
                                options={["gram", "kg"]}
                                value={weightUnitInput}
                                required={true}
                                setUnit={setWeightUnitInput}
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
        </Layer>
    );
};
import React, {useState} from 'react';
import {Box, Button, Form, Heading, Layer, Select, FormField} from "grommet";
import {Close} from "grommet-icons";

import {FormTextFieldString} from "../controls/FormTextFieldString";
import {FormTextFieldPositiveInteger} from "../controls/FormTextFieldPositiveInteger";
import {FormSelectField} from "../controls/FormSelectField";

type AddContainerFormModalProps = {
    closeModal: () => void
}

export const AddContainerFormModal = ({ closeModal }: AddContainerFormModalProps) => {
    const [description, setDescription] = useState("");
    const [width, setWidth] = useState("");
    const [depth, setDepth] = useState("");
    const [height, setHeight] = useState("");
    const [lengthUnit, setLengthUnit] = useState("");
    const [weight, setWeight] = useState("");
    const [maxWeight, setMaxWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("");

    const handleSubmit = () => {
        console.log("sumbit")
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
                                value={description}
                                required={true}
                                setValue={setDescription}
                            />
                        </Box>
                    </Box>
                    <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }} >Dimensions</Heading>
                    <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                        <Box>
                            <FormTextFieldPositiveInteger
                                name="width"
                                label="Width"
                                value={width}
                                required={true}
                                setValue={setWidth}
                            />
                        </Box>
                        <Box>
                            <FormTextFieldPositiveInteger
                                name="depth"
                                label="Depth"
                                value={depth}
                                required={true}
                                setValue={setDepth}
                            />
                        </Box>
                        <Box>
                            <FormTextFieldPositiveInteger
                                name="height"
                                label="Height"
                                value={height}
                                required={true}
                                setValue={setHeight}
                            />
                        </Box>
                        <Box flex="grow" direction="column">
                            <FormSelectField
                                label="Unit"
                                placeholder="Select unit"
                                options={["mm", "cm", "dm", "m"]}
                                value={lengthUnit}
                                required={true}
                                setUnit={setLengthUnit}
                            />
                        </Box>
                    </Box>
                    <Heading level="4" style={{ fontWeight: 800 }} margin={{ top: "medium", bottom: "none" }} >Weight</Heading>
                    <Box direction="row" gap="small" margin={{ vertical: "small" }}>
                        <Box>
                            <FormTextFieldPositiveInteger
                                label="Weight"
                                name="weight"
                                value={weight}
                                required={true}
                                setValue={setWeight}
                            />
                        </Box>
                        <Box>
                            <FormTextFieldPositiveInteger
                                label="Max weight"
                                name="maxWeight"
                                value={maxWeight}
                                required={true}
                                setValue={setMaxWeight}
                            />
                        </Box>
                        <Box flex="grow">
                            <FormSelectField
                                label="Unit"
                                placeholder="Select unit"
                                options={["gram", "kg"]}
                                value={weightUnit}
                                required={true}
                                setUnit={setWeightUnit}
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
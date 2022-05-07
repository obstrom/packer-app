import React, {Dispatch, SetStateAction, useState} from 'react';

import { v4 as uuidv4 } from 'uuid';

import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {Bin, FormSelectOption, Item} from "../common/types";
import {LengthUnits, stringToLengthUnit, stringToWeightUnit, WeightUnits} from "../common/enums";

import {FormUnitNumberInput} from "./controls/FormUnitNumberInput";
import {FormSelect} from "./controls/FormSelect";
import {FormTextInput} from "./controls/FormTextInput";

type AddFormProps = {
    bins: Array<Bin>
    setBins: Dispatch<SetStateAction<Array<Bin>>>
    items: Array<Item>
    setItems: Dispatch<SetStateAction<Array<Item>>>
}

export const AddForm = ({ bins, setBins, items, setItems }: AddFormProps) => {
    const [formType, setFormType] = useState("bin");
    const [formData, setFormData] = useState({
        description: "",
        width: 0,
        depth: 0,
        height: 0,
        weight: 0,
        maxWeight: 0,
        lengthUnit: "mm",
        weightUnit: "gram",
        quantity: 1
    });

    const typeSelectOptions: Array<FormSelectOption> = [
        { value: "bin", text: "Container" },
        { value: "item", text: "Item" }
    ];

    const lengthUnitSelectOptions: Array<FormSelectOption> = [
        { value: "mm", text: "millimeter (mm)" },
        { value: "cm", text: "centimeter (cm)" },
        { value: "dm", text: "decimeter (dm)" },
        { value: "m", text: "meter (m)" },
    ];

    const weightUnitSelectOptions: Array<FormSelectOption> = [
        { value: "g", text: "gram (g)" },
        { value: "kg", text: "kilogram (kg)" }
    ];

    const handleFormOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        handleAddButton();
    }

    const handleAddButton = () => {
        if (formType === "bin") {
            const newBin: Bin = {
                uuid: uuidv4(),
                description: formData.description,
                width: formData.width,
                depth: formData.depth,
                height: formData.height,
                weight: formData.weight,
                maxWeight: formData.maxWeight,
                lengthUnit: stringToLengthUnit(formData.lengthUnit) as LengthUnits,
                weightUnit: stringToWeightUnit(formData.weightUnit) as WeightUnits,
            }

            setBins([... bins, newBin]);
        }

        if (formType === "item") {
            const newItem: Item = {
                uuid: uuidv4(),
                description: formData.description,
                width: formData.width,
                depth: formData.depth,
                height: formData.height,
                weight: formData.weight,
                quantity: formData.quantity,
                lengthUnit: stringToLengthUnit(formData.lengthUnit) as LengthUnits,
                weightUnit: stringToWeightUnit(formData.weightUnit) as WeightUnits,
            }

            setItems([... items, newItem]);
        }
    }

    const handleResetButton = () => {
        setFormData({
            description: "",
            width: 0,
            depth: 0,
            height: 0,
            weight: 0,
            maxWeight: 0,
            lengthUnit: "mm",
            weightUnit: "gram",
            quantity: 1
        });
    }

    return (
        <Form onSubmit={handleFormOnSubmit}>
            <Col className="mb-4">
                <FormSelect
                    controlId="typeSelect"
                    options={typeSelectOptions}
                    label="Select type"
                    onChange={(e) => setFormType(e.target.value)}
                    value={formType}
                    className="mb-2"
                />
                <FormTextInput
                    label="Description"
                    controlId="inputDescription"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, "description": e.target.value })}
                />
            </Col>
            <Col className="mb-4">
                <h4>Dimensions</h4>
                <Stack direction="horizontal" gap={2}>
                    <FormUnitNumberInput
                        label="Width"
                        controlId="inputWidth"
                        unitText={"mm"}
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, "width": e.target.value })}
                    />
                    <FormUnitNumberInput
                        label="Depth"
                        controlId="inputDepth"
                        unitText={"mm"}
                        value={formData.depth}
                        onChange={(e) => setFormData({ ...formData, "depth": e.target.value })}
                    />
                    <FormUnitNumberInput
                        label="Height"
                        controlId="inputHeight"
                        unitText={"mm"}
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, "height": e.target.value })}
                    />
                </Stack>
            </Col>
            <Col className="mb-4">
                <h4>Weight</h4>
                <Stack direction="horizontal" gap={2}>
                    <FormUnitNumberInput
                        label="Weight"
                        controlId="inputWeight"
                        unitText={"gram"}
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, "weight": e.target.value })}
                    />
                    {formType === "bin" &&
                        <FormUnitNumberInput
                            label="Max weight"
                            controlId="inputMaxWeight"
                            unitText={"gram"}
                            value={formData.maxWeight}
                            onChange={(e) => setFormData({ ...formData, "maxWeight": e.target.value })}
                        />
                    }
                </Stack>
            </Col>
            <Col className="mb-4">
                <h4>Units</h4>
                <Row>
                    <Col>
                        <FormSelect
                            controlId={"lengthUnitSelect"}
                            options={lengthUnitSelectOptions}
                            label="Length unit"
                            onChange={(e) => setFormData({ ...formData, "lengthUnit": e.target.value })}
                            value={formData.lengthUnit}
                        />
                    </Col>
                    <Col>
                        <FormSelect
                            controlId={"weightUnitSelect"}
                            options={weightUnitSelectOptions}
                            label="Weight unit"
                            onChange={(e) => setFormData({ ...formData, "weightUnit": e.target.value })}
                            value={formData.weightUnit}
                        />
                    </Col>
                </Row>
            </Col>
            {formType === "item" && <Col className="mb-4">
                <h4>Amount</h4>
                <Row>
                    <Col>
                        <FormUnitNumberInput
                            label="Quantity"
                            controlId="inputQuantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, "quantity": e.target.value })}
                        />
                    </Col>
                </Row>
            </Col>}
            <Col>
                <Button type="submit">Add</Button>
                <Button className="btn-secondary mx-2" onClick={handleResetButton}>Reset</Button>
            </Col>
        </Form>
    );
};
import React, {Dispatch, SetStateAction, useState} from 'react';

import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Bin, FormSelectOption, Item} from "../common/types";
import {FormUnitNumberInput} from "./controls/FormUnitNumberInput";
import {FormSelect} from "./controls/FormSelect";
import {Button} from "react-bootstrap";

type AddFormProps = {
    setContainers: Dispatch<SetStateAction<Array<Bin>>>
    setItems: Dispatch<SetStateAction<Array<Item>>>
}

export const AddForm = ({ setContainers, setItems }: AddFormProps) => {
    const [formType, setFormType] = useState("bin");
    const [formData, setFormData] = useState({
        width: 0,
        depth: 0,
        height: 0,
        weight: 0,
        maxWeight: 0,
        lengthUnit: "mm",
        weightUnit: "gram"
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

    return (
        <Form>
            <FormSelect
                controlId="typeSelect"
                options={typeSelectOptions}
                label="Select type"
                onChange={(e) => setFormType(e.target.value)}
                value={formType}
                className="mb-4"
            />
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
            <Col>
                <Button>Add</Button>
                <Button className="btn-secondary mx-2">Reset</Button>
            </Col>
        </Form>
    );
};
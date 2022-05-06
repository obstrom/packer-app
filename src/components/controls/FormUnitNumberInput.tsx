import React from 'react';
import Form from "react-bootstrap/Form";

type FormUnitNumberInputProps = {
    unitText: string
    value: number
    controlId: string
    label?: string
    className?: string
    onChange?: (e:any) => void
}

export const FormUnitNumberInput = ({ unitText, value, controlId, label, className, onChange }: FormUnitNumberInputProps) => {
    return (
        <Form.Group controlId={controlId} className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Group className="input-group">
                <Form.Control type="number" placeholder="0" value={value} onChange={onChange} />
                <span className="input-group-text">{unitText}</span>
            </Form.Group>
        </Form.Group>
    );
};
import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

type FormTextInputProps = {
  value: string;
  controlId: string;
  label?: string;
  className?: string;
  onChange?: (e: any) => void;
};

export const FormTextInput = ({
  value,
  controlId,
  label,
  className,
  onChange,
}: FormTextInputProps) => {
  return (
    <Form.Group controlId={controlId} className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Group className="input-group">
        <Form.Control type="text" value={value} onChange={onChange} />
      </Form.Group>
    </Form.Group>
  );
};

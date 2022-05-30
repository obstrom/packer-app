import React from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

type FormTextInputProps = {
  value: string;
  controlId: string;
  label?: string;
  className?: string;
  onChange?: (e: any) => void;
};

const LabelText = styled(Form.Label)`
  font-size: 0.9rem;
`;

export const FormTextInput = ({
  value,
  controlId,
  label,
  className,
  onChange,
}: FormTextInputProps) => {
  return (
    <Form.Group controlId={controlId} className={className}>
      <LabelText className="mb-1">{label}</LabelText>
      <Form.Group className="input-group">
        <Form.Control size="sm" type="text" value={value} onChange={onChange} />
      </Form.Group>
    </Form.Group>
  );
};

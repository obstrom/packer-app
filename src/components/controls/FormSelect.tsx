import React from "react";
import Form from "react-bootstrap/Form";
import { FormSelectOption } from "../../commons/types";
import styled from "styled-components";

type FormSelectProps = {
  controlId: string;
  options: Array<FormSelectOption>;
  label?: string;
  className?: string;
  onChange?: (e: any) => void;
  value?: string;
};

const LabelText = styled(Form.Label)`
  font-size: 0.9rem;
`;

export const FormSelect = ({
  controlId,
  options,
  label,
  className,
  onChange,
  value,
}: FormSelectProps) => {
  return (
    <Form.Group controlId={controlId} className={className}>
      <LabelText className="mb-1">{label}</LabelText>
      <Form.Select size="sm" onChange={onChange} value={value}>
        {options.map((value, index) => (
          <option key={index} value={value.value}>
            {value.text}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

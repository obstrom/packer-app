import React from "react";
import Form from "react-bootstrap/Form";
import { FormSelectOption } from "../../common/types";

type FormSelectProps = {
  controlId: string;
  options: Array<FormSelectOption>;
  label?: string;
  className?: string;
  onChange?: (e: any) => void;
  value?: string;
};

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
      <Form.Label>{label}</Form.Label>
      <Form.Select onChange={onChange} value={value}>
        {options.map((value, index) => (
          <option key={index} value={value.value}>
            {value.text}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

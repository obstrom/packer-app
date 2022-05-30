import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";

type FormUnitNumberInputProps = {
  value: string;
  setValue: (e: string) => void;
  controlId: string;
  setError: (e: boolean) => void;
  unitText?: string;
  label?: string;
  className?: string;
  required?: boolean;
  allowZero?: boolean;
  maxValue?: number;
};

const LabelText = styled(Form.Label)`
  font-size: 0.9rem;
`;

export const FormUnitNumberInput = ({
  unitText,
  value,
  setValue,
  controlId,
  setError,
  label,
  className,
  required = false,
  allowZero = true,
  maxValue,
}: FormUnitNumberInputProps) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleOnChange = (e: any): string => {
    const input = e.target.value;
    const inputValid = e.target.validity.valid;

    if (
      input === "" ||
      (!allowZero && parseInt(input) === 0) ||
      (maxValue && input > maxValue)
    ) {
      setIsInvalid(true);
      setError(true);
      return input;
    }

    if (!inputValid) return value;

    setIsInvalid(false);
    setError(false);

    return input;
  };

  return (
    <Form.Group controlId={controlId} className={className}>
      <LabelText className="mb-1">{label}</LabelText>
      <InputGroup size="sm">
        <Form.Control
          type="text"
          inputMode="numeric"
          min="0"
          step="1"
          pattern="[\d]*"
          value={value}
          required={required}
          isInvalid={isInvalid}
          onChange={(e) => setValue(handleOnChange(e))}
        />
        {unitText && <InputGroup.Text>{unitText}</InputGroup.Text>}
      </InputGroup>
    </Form.Group>
  );
};

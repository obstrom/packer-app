import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { InputGroup } from "react-bootstrap";

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
};

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
}: FormUnitNumberInputProps) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleOnChange = (e: any): string => {
    const input = e.target.value;
    const inputValid = e.target.validity.valid;

    if (input === "" || (!allowZero && parseInt(input) === 0)) {
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
      <Form.Label className="mb-1">{label}</Form.Label>
      <Form.Group className="input-group">
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
        {unitText && <span className="input-group-text">{unitText}</span>}
      </Form.Group>
    </Form.Group>
  );
};

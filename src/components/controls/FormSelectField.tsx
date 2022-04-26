import React, {Dispatch, SetStateAction} from 'react';
import {Select} from "grommet";

type FormSelectFieldProps = {
    label?: string,
    placeholder?: string,
    options?: Array<string>
    required?: boolean
    value: string
    setUnit: Dispatch<SetStateAction<string>>
}

export const FormSelectField = ({ label, placeholder, options = [], value, required = false, setUnit }: FormSelectFieldProps) => {
    return (
        <>
            {label && <label style={{ paddingBottom: "20px" }}>{label}</label>}
            <Select
                placeholder={placeholder}
                options={options}
                value={value}
                required={required}
                onChange={e => setUnit(e.target.value)}
                size="small"
            />
        </>
    );
};
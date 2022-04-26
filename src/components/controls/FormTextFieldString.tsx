import {FormField, TextInput} from "grommet";
import React, {Dispatch, SetStateAction} from "react";

type FormTextFieldStringProps = {
    name: string,
    placeholder?: string,
    id?: string,
    label: string,
    value: string,
    required: boolean
    setValue: Dispatch<SetStateAction<string>>
}

export const FormTextFieldString = ({ label, name, placeholder, id, value, required, setValue }: FormTextFieldStringProps) => {
    return (
        <FormField
            id={id}
            type="text"
            label={label}
            placeholder={placeholder}
            name={name.toLocaleLowerCase()}
            required={required}
            value={value}
            onChange={e => {
                setValue(e.target.value);
            }}
        />
    );
};
import {Dispatch, SetStateAction} from "react";
import {FormField} from "grommet";

type FormTextFieldPositiveIntegerProps = {
    name: string,
    label?: string,
    placeholder?: string,
    id?: string,
    value: string,
    required: boolean
    setValue: Dispatch<SetStateAction<string>>
}

export const FormTextFieldPositiveInteger = ({ name, label, placeholder, id, value, required, setValue }: FormTextFieldPositiveIntegerProps) => {
    const handleInput = (e: any) => setValue((e.target.validity.valid) ? e.target.value : value);

    return (
        <FormField
            id={id}
            label={label}
            placeholder={placeholder}
            required={required}
            name={name}
            value={value}
            inputMode="numeric"
            type="text"
            min="0"
            step="1"
            pattern="[0-9]*"
            onInput={e => handleInput(e)}
        />
    );
};
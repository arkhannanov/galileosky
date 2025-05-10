// FormInputField.tsx

import React, { useState, useEffect } from 'react';

type InputFieldProps = {
    inputField: {
        type: string;
        label: string;
        id: number;
    };
    deleteInputField: (id: number) => void;
};

const FormInputField: React.FC<InputFieldProps> = ({ inputField, deleteInputField }) => {
    const [inputValue, setInputValue] = useState<string | boolean | null>('');

    useEffect(() => {
        // Initialize the value based on the type.
        if (inputField.type === 'checkbox') {
            setInputValue(false);  // Default value for checkboxes
        } else {
            setInputValue('');  // Default for other input types
        }
    }, [inputField.type]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (inputField.type === 'checkbox') {
            setInputValue(event.target.checked);
        } else {
            setInputValue(event.target.value);
        }
    };

    let inputFieldElement: JSX.Element | null;

    switch (inputField.type) {
        case 'text':
            inputFieldElement = <input type="text" value={inputValue as string} onChange={handleChange} />;
            break;
        case 'dropdown':
            inputFieldElement = (
                <select value={inputValue as string} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="text1">Text 1</option>
                    <option value="text2">Text 2</option>
                    <option value="text3">Text 3</option>
                </select>
            );
            break;
        case 'checkbox':
            inputFieldElement = (
                <label>
                    <input
                        type="checkbox"
                        checked={inputValue as boolean}
                        onChange={handleChange}
                    /> Check
                </label>
            );
            break;
        case 'radio':
            inputFieldElement = (
                <div>
                    <label>
                        <input
                            type="radio"
                            name={`radio-${inputField.id}`}
                            value="radioText1"
                            checked={inputValue === 'radioText1'}
                            onChange={handleChange}
                        /> Radio Text 1
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`radio-${inputField.id}`}
                            value="radioText2"
                            checked={inputValue === 'radioText2'}
                            onChange={handleChange}
                        /> Radio Text 2
                    </label>
                </div>
            );
            break;
        case 'textarea':
            inputFieldElement = <textarea value={inputValue as string} onChange={handleChange} />;
            break;
        case 'date':
            inputFieldElement = <input type="date" value={inputValue as string} onChange={handleChange} />;
            break;
        case 'file':
            inputFieldElement = <input type="file" />;
            break;
        default:
            inputFieldElement = null;
    }

    return (
        <div>
            <label>{inputField.label}</label>
            {inputFieldElement}
            <button onClick={() => deleteInputField(inputField.id)}>
                Delete
            </button>
        </div>
    );
};

export default FormInputField;

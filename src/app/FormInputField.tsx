// FormInputField.tsx

import React, {JSX} from 'react';

type InputFieldProps = {
    inputField: {
        type: string;
        label: string;
        id: number;
    };
    deleteInputField: (id: number) => void;
};

const FormInputField: React.FC<InputFieldProps> = ({ inputField, deleteInputField }) => {
    let inputFieldElement: JSX.Element | null;

    switch (inputField.type) {
        case 'text':
            inputFieldElement = <input type="text" />;
            break;
        case 'dropdown':
            inputFieldElement = (
                <select>
                    <option value="text1">Text 1</option>
                    <option value="text2">Text 2</option>
                    <option value="text3">Text 3</option>
                </select>
            );
            break;
        case 'checkbox':
            inputFieldElement = (
                <div>
                    <label>
                        <input type="checkbox" name="checkText1" /> Check Text 1
                    </label>
                    <label>
                        <input type="checkbox" name="checkText2" /> Check Text 2
                    </label>
                    <label>
                        <input type="checkbox" name="checkText3" /> Check Text 3
                    </label>
                </div>
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
                        />{' '}
                        Radio Text 1
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`radio-${inputField.id}`}
                            value="radioText2"
                        />{' '}
                        Radio Text 2
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`radio-${inputField.id}`}
                            value="radioText3"
                        />{' '}
                        Radio Text 3
                    </label>
                </div>
            );
            break;
        case 'textarea':
            inputFieldElement = <textarea />;
            break;
        case 'date':
            inputFieldElement = <input type="date" />;
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

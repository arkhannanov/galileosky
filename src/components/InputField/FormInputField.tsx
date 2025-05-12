import React, { useState, useEffect, JSX } from 'react';
import styles from './styles.module.css'; // Import your styles

type InputFieldProps = {
    inputField: {
        type: 'integer' | 'float' | 'string' | 'date' | 'time';
        label: string;
        id: string; // Changed to string
    };
    deleteInputField: (id: string) => void; // Changed to string
};

const FormInputField: React.FC<InputFieldProps> = ({ inputField, deleteInputField }) => {
    const [inputValue, setInputValue] = useState<string | number | null>(null);

    useEffect(() => {
        setInputValue(null); // Reset value when type changes
    }, [inputField.type]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (inputField.type === 'integer') {
            setInputValue(parseInt(value) || null); // Parse as integer
        } else if (inputField.type === 'float') {
            setInputValue(parseFloat(value) || null); // Parse as float
        } else {
            setInputValue(value); // String, date, time
        }
    };

    let inputFieldElement: JSX.Element | null;

    switch (inputField.type) {
        case 'string':
            inputFieldElement = (
                <input className={styles.inputField} type="text" value={inputValue as string || ''} onChange={handleChange} />
            );
            break;
        case 'integer':
            inputFieldElement = (
                <input
                    className={styles.inputField}
                    type="number"
                    value={inputValue !== null ? inputValue : ''}
                    onChange={handleChange}
                    step="1"
                />
            );
            break;
        case 'float':
            inputFieldElement = (
                <input
                    className={styles.inputField}
                    type="number"
                    value={inputValue !== null ? inputValue : ''}
                    onChange={handleChange}
                    step="0.01"
                />
            );
            break;
        case 'date':
            inputFieldElement = (
                <input className={styles.inputField} type="date" value={inputValue as string || ''} onChange={handleChange} />
            );
            break;
        case 'time':
            inputFieldElement = (
                <input className={styles.inputField} type="time" value={inputValue as string || ''} onChange={handleChange} />
            );
            break;
        default:
            inputFieldElement = null;
    }

    return (
        <div className={styles.inputFieldContainer}>
            <label className={styles.label}>{inputField.label}</label>
            {inputFieldElement}
            <button className={styles.deleteButton} onClick={() => deleteInputField(inputField.id)}>
                Удалить
            </button>
        </div>
    );
};

export default FormInputField;

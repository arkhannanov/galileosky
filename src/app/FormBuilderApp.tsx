"use client";

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import './styles.css';

type InputField = {
    type: string;
    label: string;
    id: string;
};

const FormBuilderApp: React.FC = () => {
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [buttonGroupHeight, setButtonGroupHeight] = useState<number>(0);
    const buttonGroupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateHeight = () => {
            if (buttonGroupRef.current) {
                setButtonGroupHeight(buttonGroupRef.current.offsetHeight);
            }
        };

        calculateHeight();  // Run it once on mount

        // Update on window resize
        window.addEventListener('resize', calculateHeight);
        return () => {
            window.removeEventListener('resize', calculateHeight);
        };
    }, []);

    const insertInputField = (fieldType: string): void => {
        setInputFields((prevFields) => [
            ...prevFields,
            { type: fieldType, label: `${fieldType}:`, id: uuidv4() }, // This is a quick fix but may cause duplicates
        ]);
    };

    const deleteInputField = (id: number): void => {
        setInputFields((prevFields) => prevFields.filter((inputField) => inputField.id !== id));
    };

    return (
        <div className="container">
            {/* Фиксированная кнопочная группа */}
            <div className="button-group" ref={buttonGroupRef}>
                <button onClick={() => insertInputField('text')}>Insert Text Field</button>
                <button onClick={() => insertInputField('dropdown')}>Insert Dropdown Field</button>
                <button onClick={() => insertInputField('checkbox')}>Insert Checkbox Field</button>
            </div>

            {/* Контейнер полей */}
            <div className="fields-container" style={{ marginTop: `${buttonGroupHeight}px` }}>
                {inputFields.map((inputField) => (
                    <div key={inputField.id}>
                        <label>{inputField.label}</label>
                        {inputField.type === 'dropdown' ? (
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </select>
                        ) : (
                            <input type={inputField.type} />
                        )}
                        <button onClick={() => deleteInputField(inputField.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormBuilderApp;

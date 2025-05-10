"use client";

import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

type InputField = {
    type: string;
    label: string;
    id: number;
};

const FormBuilderApp: React.FC = () => {
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [buttonGroupHeight, setButtonGroupHeight] = useState<number>(0);

    const buttonGroupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Вычисление высоты кнопочной группы
        if (buttonGroupRef.current) {
            setButtonGroupHeight(buttonGroupRef.current.offsetHeight);
        }

        // Обновление при изменении размера окна
        const handleResize = () => {
            if (buttonGroupRef.current) {
                setButtonGroupHeight(buttonGroupRef.current.offsetHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const insertInputField = (fieldType: string): void => {
        setInputFields([
            ...inputFields,
            { type: fieldType, label: `${fieldType}:`, id: Date.now() },
        ]);
    };

    const deleteInputField = (id: number): void => {
        setInputFields(inputFields.filter((inputField) => inputField.id !== id));
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
            <div
                className="fields-container"
                style={{ marginTop: `${buttonGroupHeight}px` }}
            >
                {inputFields.map((inputField) => (
                    <div key={inputField.id}>
                        <label>{inputField.label}</label>
                        <input type={inputField.type} />
                        <button onClick={() => deleteInputField(inputField.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormBuilderApp;

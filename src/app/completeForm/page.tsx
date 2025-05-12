"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

const CompleteForm = () => {
    const searchParams = useSearchParams();
    const fields = searchParams.get('fields');

    if (!fields) return null; // Ожидание запроса

    const parsedFields = JSON.parse(fields);

    // Создаем состояние для хранения значений всех полей
    const [inputFields, setInputFields] = useState(
        parsedFields.map((field: any) => ({
            ...field,
            value: field.value || '' // Устанавливаем значение (пустое по умолчанию)
        }))
    );

    // Обработчик изменения ввода
    const handleInputChange = (id: string, value: string) => {
        setInputFields((prevFields: any[]) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, value } : field
            )
        );
    };

    return (
        <div className={styles.fieldsContainer}>
            <h2 className={styles.centeredTitle}>Форма</h2>
            {inputFields.map((inputField: any) => (
                <div key={inputField.id} className={styles.inputFieldContainer}>
                    <label className={styles.label}>{inputField.label}</label>
                    <input
                        className={styles.inputField}
                        type={inputField.type === 'integer' || inputField.type === 'float' ? 'number' : inputField.type}
                        value={inputField.value}
                        onChange={(e) => handleInputChange(inputField.id, e.target.value)} // Позволяем вводить данные
                    />
                </div>
            ))}
        </div>
    );
};

export default CompleteForm;

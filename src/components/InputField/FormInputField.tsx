import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Импорт стилей

type InputFieldProps = {
    inputField: {
        type: 'integer' | 'float' | 'string' | 'date' | 'time';
        label: string;
        id: string;
    };
    deleteInputField: (id: string) => void;
};

const FormInputField: React.FC<InputFieldProps> = ({ inputField, deleteInputField }) => {
    const [inputValue, setInputValue] = useState<string | number | null>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setInputValue('');
        setErrorMessage(null);
    }, [inputField.type]);

    const validateInput = (value: string) => {
        switch (inputField.type) {
            case 'integer':
                return /^[+-]?\d+$/.test(value) ? null : 'Введите целое число';
            case 'float':
                return /^[+-]?\d+(\.\d+)?$/.test(value) ? null : 'Введите дробное число';
            case 'string':
                return value.trim() === '' ? 'Введите текст' : null;
            case 'date':
                return /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : 'Введите дату в формате YYYY-MM-DD';
            case 'time':
                return /^\d{2}:\d{2}$/.test(value) ? null : 'Введите время в формате HH:MM';
            default:
                return 'Неверный тип ввода';
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);

        const validationError = validateInput(value);
        setErrorMessage(validationError);
    };

    return (
        <div className={styles.inputFieldContainer}>
            <label className={styles.label}>{inputField.label}</label>
            <div className={styles.inputAndIcon}>
                <input
                    className={styles.inputField}
                    type={inputField.type === 'integer' || inputField.type === 'float' || inputField.type === 'string' ? 'text' : inputField.type}
                    value={inputValue || ''}
                    onChange={handleChange}
                />
                <button
                    className={styles.deleteButton}
                    onClick={() => deleteInputField(inputField.id)}
                    title="Удалить поле"
                >
                    🗑️
                </button>
            </div>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

export default FormInputField;

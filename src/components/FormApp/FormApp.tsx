// app/page.tsx
"use client";

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormInputField from '../InputField/FormInputField';
import styles from "./styles.module.css";

type InputField = {
    type: 'integer' | 'float' | 'string' | 'date' | 'time';
    label: string;
    id: string;
};

const FormApp = () => {
    const [inputFields, setInputFields] = useState<InputField[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

    const insertInputField = (fieldType: string): void => {
        setInputFields((prevFields) => [
            ...prevFields,
            { type: fieldType as InputField['type'], label: `${fieldType}:`, id: uuidv4() },
        ]);
    };

    const deleteInputField = (id: string): void => {
        setInputFields((prevFields) => prevFields.filter((inputField) => inputField.id !== id));
    };

    const validateForm = (): boolean => {
        for (const field of inputFields) {
            const inputElement = document.getElementById(field.id) as HTMLInputElement;
            if (inputElement && !inputElement.value) {
                alert(`${field.label} не может быть пустым!`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setLoading(true);

            // Имитация запроса
            setTimeout(() => {
                setLoading(false);
                setSnackbarVisible(true);

                // Автоматическое скрытие снекбара через 3 секунды
                setTimeout(() => setSnackbarVisible(false), 3000);
            }, 1000);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Конструктор Форм</h1> {/* Centered title */}
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={() => insertInputField('string')}>Добавить поле ввода строки</button>
                <button className={styles.button} onClick={() => insertInputField('integer')}>Добавить поле ввода целого числа</button>
                <button className={styles.button} onClick={() => insertInputField('float')}>Добавить поле ввода дробного числа</button>
                <button className={styles.button} onClick={() => insertInputField('date')}>Добавить поле ввода даты</button>
                <button className={styles.button} onClick={() => insertInputField('time')}>Добавить поле ввода времени</button>
            </div>

            {/* Контейнер для центровки кнопки */}
            <div className={styles.centeredButton}>
                <button
                    className={`${styles.button} ${styles.createFormButton}`}
                    onClick={handleSubmit}
                    disabled={loading} // Блокировка кнопки при загрузке
                >
                    {loading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        "Отправить форму"
                    )}
                </button>
            </div>

            <div className={styles.fieldsContainer}>
                {inputFields.map((inputField) => (
                    <FormInputField
                        key={inputField.id}
                        inputField={inputField}
                        deleteInputField={deleteInputField}
                    />
                ))}
            </div>

            {/* Snackbar для уведомления */}
            {snackbarVisible && (
                <div className={styles.snackbar}>
                    Форма успешно отправлена!
                </div>
            )}
        </div>
    );
}

export default FormApp;

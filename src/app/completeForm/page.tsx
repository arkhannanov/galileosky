// app/completeForm/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css'; // Import your styles

const CompleteForm = () => {
    const searchParams = useSearchParams();
    const fields = searchParams.get('fields');

    if (!fields) return null; // Ожидание запроса

    const inputFields = JSON.parse(fields);

    return (
        <div className={styles.fieldsContainer}> {/* Add class for consistent margins */}
            <h2 className={styles.centeredTitle}>Форма</h2> {/* Centered title */}
            {inputFields.map((inputField: any) => (
                <div key={inputField.id} className={styles.inputFieldContainer}>
                    <label className={styles.label}>{inputField.label}</label>
                    <input
                        className={styles.inputField}
                        type={inputField.type}
                        readOnly
                        value={inputField.value || ''} // Add value if available
                    />
                </div>
            ))}
        </div>
    );
};

export default CompleteForm;

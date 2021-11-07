import React from 'react'
import { ChangeMe } from '../../CoinbaseTracker/models'
import { useField, Form, FormikProps, Formik } from 'formik';

export const FormFieldInput: React.FC<ChangeMe> = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <label className='FormFieldInputLabel'>
                {label}
                <input {...field} {...props} />
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
}
import React from 'react'
import { ChangeMe } from '../../CoinbaseTracker/models'
import { useField, Form, FormikProps, Formik } from 'formik';
import Select from 'react-select';

export const FormFieldDropdown: React.FC<ChangeMe> = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props); // can pass 'props' into useField also, if 'props' contains a name attribute
    const { setValue, setTouched, setError } = helpers;

    const { options } = props;

    const setFieldProps = (selectedOption: { label: string; value: string }) => {
        setValue(selectedOption.value)
        setTouched(true)
        setError(undefined)
    }

    return (
        <Select name={field.name} options={options} onChange={(selectedOption: any) => setFieldProps(selectedOption as any)} />
    );
};
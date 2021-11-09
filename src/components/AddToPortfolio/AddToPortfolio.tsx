import { Formik, Form } from "formik"
import React from "react"
import { ChangeMe, TradingPair } from "../CoinbaseTracker/models"
import { FormFieldDropdown } from "../FormFieldComponents/FormFieldDropdown/FormFieldDropdown"
import { FormFieldInput } from "../FormFieldComponents/FormFieldInput/FormFieldInput"

type AddToPortfolioProps = {
    handleSubmit: ChangeMe;
    initialValues: ChangeMe;
    options: ChangeMe;
}

export const AddToPortfolio: React.FC<AddToPortfolioProps> = ({ handleSubmit, initialValues, options }) => {
    return (
        <div className='AddToPortfolio'>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <FormFieldDropdown options={options} name='assetPair' label='Asset pair' />
                    <FormFieldInput type='number' name='costPerCoin' label='Amount paid per coin' />
                    <FormFieldInput type='number' name='totalCoins' label='Total no. of coins' />
                    <button type='submit' className='Btn'>Add Purchase</button>
                </Form>
            </Formik>
        </div>
    )
}
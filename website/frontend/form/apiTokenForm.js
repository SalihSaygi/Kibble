import React from 'react'
import { Formik } from 'formik'

const Basic = () => {
    <div>
        <h1>
            Enter Your API Token
        </h1>
        <p>
            How? Follow<a>This</a>
        </p>
        <Formik 
            initialValues = {{apiToken = ''}}
            validate = {values => {
                const errors = {}
                if(!values.apiToken) {
                    errors.apiToken = 'API Token is Required'
                } else if(!/[^a-zA-Z0-9]+/g.test(values.apiToken)) {
                    errors.apiToken = 'Invalid API Token'
                }
                return errors
            }}
            onSubmit = {(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            })}
        </Formik>
    </div>
}
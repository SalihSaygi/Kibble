import React from 'react';
import { useFormik, Formik } from 'formik';
import { useMutation } from 'react-query';
// import { postProfileApiToken } from '@apiCalls/back/userApi';
import { TextField } from '@material-ui/core';
import { postProfileApiToken } from '@apiCalls/back/userApi';

const TokenForm = () => {
  const formik = useFormik({
    initialValues: {
      apiToken: '',
    },
    validate: values => {
      const errors = {};
      if (!values.apiToken) {
        errors.apiToken = 'API Token is Required';
      } else if (/[^a-zA-Z0-9]+/g.test(values.apiToken)) {
        errors.apiToken = 'Invalid API Token';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));

      mutation.mutate({
        apiToken: values.apiToken,
      });
    },
  });
  const mutation = useMutation(apiToken => postProfileApiToken(apiToken));
  if (mutation.isError) console.log(mutation.error);
  return (
    <div>
      <h1>Enter Your API Token</h1>
      <p>
        How? Follow<a href="http://dogegarden.net">this.</a>
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input id="apiToken" onChange={formik.handleChange} />
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
        {mutation.isLoading && <p>Please wait</p>}
        {mutation.isError && <p>Error!</p>}
      </form>
      )
    </div>
  );
};

export default TokenForm;

import React from 'react';
import { useFormik, Formik } from 'formik';
import { useMutation } from 'react-query';
import { postProfileApiToken } from '@apiCalls/back/userApi';

const TokenForm = () => {
  const formik = useFormik({
    initialValues: {
      accessToken: '',
      refreshToken: '',
    },
    validate: values => {
      const errors = {};
      if (!values.accessToken || !values.refreshToken) {
        errors.accessToken = 'API Token is Required';
        errors.refreshToken = 'API Token is Required';
      } else if (
        /[^a-zA-Z0-9]+/g.test(values.accessToken && values.refreshToken)
      ) {
        errors.accessToken = 'Invalid API Token';
        errors.refreshToken = 'Invalid API Token';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));

      mutation.mutate({
        accessToken: values.accessToken,
        refreshToken: values.refreshToken,
      });
    },
  });
  const mutation = useMutation((accessToken, refreshToken) =>
    postProfileApiToken(accessToken, refreshToken)
  );
  if (mutation.isError) console.log(mutation.error);
  return (
    <div>
      <h1>Enter Your API Tokens</h1>
      <p>
        How? Follow<a href="http://dogegarden.net">this.</a>
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input id="accessToken" onChange={formik.handleChange} />
        <input id="refreshToken" onChange={formik.handleChange} />
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

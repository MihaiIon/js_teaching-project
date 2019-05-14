import React, { useState, useEffect } from "react";

// Components
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import Preview from "./Preview";

function Form() {
  const [value, setValue] = useState("");
  return (
    <div className="c-form">
      <Preview value={undefined} />
      <hr className="c-form_hr" />
      <Formik
        initialValues={value}
        onSubmit={(values, actions) => {}}
        render={({ errors, status, touched, isSubmitting }) => (
          <FormikForm className="c-form_form">
            <Field
              type="text"
              name="sentence"
              className="c-form_input"
              placeholder="...continue the sentence above"
            />
            <ErrorMessage name="sentence" component="div" />
            <button className="c-form_btn" type="submit" disabled={isSubmitting}>
              Add this sentence to the story
            </button>
          </FormikForm>
        )}
      />
    </div>
  );
}

export default Form;

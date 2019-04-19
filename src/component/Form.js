import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const PracticeForm = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
    </div>
    <label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join our newsletter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    {!errors.password && !errors.email && values.email ? (
      <div>
        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </div>
    ) : (
      <div>
        <button disabled={isSubmitting} type="submit">
          Review
        </button>
      </div>
    )}
  </Form>
);

export default withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      plan: plan || "free"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(9, "Password must be 9 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setError, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "mateen@test.io") {
        setError({ email: "That email is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);

    console.log(values);
  }
})(PracticeForm);

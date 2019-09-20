import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <h1>User Onboarding</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}
        
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}
        

        <Field component="select" className="role-select" name="role">
          <option>Please Choose an Option</option>
          <option value="frontEnd">Front End</option>
          <option value="ui">UI</option>
          <option value="backEnd">Back End</option>
        </Field>
        
        <label>
         terms
          <Field
            required
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          
        </label>
        <button>Submit!</button>
      </Form>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name:{user.name}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email|| "",
      password: password || "",
      terms: terms || false,
      
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("You must put a name"),
    email: Yup.string().required(),
    password: Yup.string().required().min(4)
  }),
  //You can use this to see the values
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserForm);

export default FormikUserForm;

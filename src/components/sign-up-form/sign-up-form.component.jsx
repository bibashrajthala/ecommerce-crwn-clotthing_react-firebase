import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  //   console.log(formFields);

  // to clear/reset form's input fields when submitted ie when we click on submit button
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords donot match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //   console.log(response);
      console.log(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, user already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">Display Name</label>
        <input
          id="displayName"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;

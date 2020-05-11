/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

// import {
//   LinkButtons,
//   updateButton,
//   homeButton,
//   loginButton,
//   HeaderBar,
//   forgotButton,
//   inputStyle,
//   SubmitButtons,
// } from "../components";

const loading = {
  margin: "1em",
  fontSize: "24px",
};

const title = {
  pageTitle: "Password Reset Screen",
};

export default function ResetPassword() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [updated, setUpdated] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [error, setError] = React.useState();

  const token = useParams();

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/users/reset", {
        params: {
          resetPasswordToken: token.token,
        },
      });
      // console.log(response);
      if (response.data.message === "password reset link a-ok") {
        setEmail(response.data.email);
        setUpdated(false);
        setIsLoading(false);
        setError(false);
      } else {
        console.log(error.response.data);
        setUpdated(false);
        setIsLoading(false);
        setError(true);
      }
    }

    fetchData();
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      console.log("resetPassword.jsx - updatePassword email", email);
      console.log("resetPassword.jsx - updatePassword password", password);
      console.log(
        "resetPassword.jsx - updatePassword resetPasswordToken",
        token.token
      );

      const response = await axios.put("/api/users/updatePasswordViaEmail", {
        email,
        password,
        resetPasswordToken: token.token,
      });
      console.log(response.data);
      if (response.data.message === "password updated") {
        setUpdated(true);
        setError(false);
      } else {
        setUpdated(false);
        setError(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (error) {
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
        <div>
          <h4>Problem resetting password. Please send another reset link.</h4>
          <Button variant="contained" color="primary" href="/">
            Home
          </Button>
          <Button variant="contained" color="secondary" href="/forgotPassword">
            Home
          </Button>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
        <div>Loading User Data...</div>
      </div>
    );
  }
  return (
    <div>
      {/* <HeaderBar title={title} /> */}

      <TextField
        // style={inputStyle}
        id="password"
        label="password"
        onChange={handlePasswordChange}
        value={password}
        type="password"
      />

      <Button variant="contained" color="primary" onClick={updatePassword}>
        Update Password
      </Button>

      {updated && (
        <div>
          <p>
            Your password has been successfully reset, please try logging in
            again.
          </p>

          <Button variant="contained" color="primary" href="/login">
            Login
          </Button>
        </div>
      )}
      <Button variant="contained" color="secondary" href="/forgotPassword">
        Home
      </Button>
    </div>
  );
}

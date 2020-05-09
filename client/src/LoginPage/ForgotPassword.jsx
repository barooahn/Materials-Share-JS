/* eslint-disable no-console */
import React from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const title = {
  pageTitle: "Forgot Password Screen",
};

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [showError, setShowError] = React.useState();
  const [messageFromServer, setMessageFromServer] = React.useState();
  const [showNullError, setShowNullError] = React.useState();

  // handleChange = (name) => (event) => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (email === "") {
      setShowError(false);
      setShowNullError(true);
      setMessageFromServer("");
    } else {
      try {
        const response = await axios.post("/api/users/forgotPassword", {
          email,
        });
        console.log(response.data);
        if (response.data === "recovery email sent") {
          setShowError(false);
          setShowNullError(false);
          setMessageFromServer("recovery email sent");
        }
      } catch (error) {
        console.error(error.response?.data);
        if (error.response.data === "email not in db") {
          setShowError(true);
          setShowNullError(false);
          setMessageFromServer("");
        }
      }
    }
  };

  return (
    <div>
      {/* <HeaderBar title={title} /> */}
      {/* <form className="profile-form" onSubmit={this.sendEmail}> */}
      <form
        // className={classes.root}
        noValidate
        autoComplete="off"
        onClick={sendEmail}
      >
        <TextField
          id="email"
          label="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email Address"
          variant="outlined"
        />

        <Button variant="contained">Send Password Reset Email</Button>
      </form>
      {/* </form> */}
      {showNullError && (
        <div>
          <p>The email address cannot be null.</p>
        </div>
      )}
      {showError && (
        <div>
          <p>
            That email address isn&apos;t recognized. Please try again or
            register for a new account.
          </p>
          <Button variant="contained" color="primary" href="/register">
            Register
          </Button>
        </div>
      )}
      {messageFromServer === "recovery email sent" && (
        <div>
          <h3>Password Reset Email Successfully Sent!</h3>
        </div>
      )}
      <Button href="/">Home</Button>
    </div>
  );
}

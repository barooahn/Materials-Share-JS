/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
    paddingBottom: 70,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  input: {
    marginBottom: 12,
  },
}));

const loading = {
  margin: "1em",
  fontSize: "24px",
};

const title = {
  pageTitle: "Password Reset Screen",
};

export default function ResetPassword() {
  const classes = useStyles();
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
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        {updated && (
          <div>
            <Typography component="h5" color="primary" variant="h6">
              Your password has been successfully reset, please try logging in
              again.
            </Typography>
            <br />
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
          </div>
        )}

        <Typography
          align={"center"}
          color={"error"}
          component="h6"
          variant="h6"
        ></Typography>
        <br />
        <br />
        <TextField
          // style={inputStyle}
          id="password"
          onChange={handlePasswordChange}
          value={password}
          type="password"
          className={classes.input}
          label="Password *"
          name="password"
          autoFocus
          fullWidth
          variant="outlined"
          placeholder="New Password"
        />
        <form className={classes.form} noValidate autoComplete="off">
          <Button variant="contained" color="primary" onClick={updatePassword}>
            Update Password
          </Button>
          <br />
          <br />
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
        </form>
      </Paper>
    </main>
  );
}

/* eslint-disable no-console */

import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

// import {
//   LinkButtons,
//   SubmitButtons,
//   HeaderBar,
//   homeButton,
//   cancelButton,
//   saveButton,
//   loginButton,
//   inputStyle,
// } from '../components';

const loading = {
  margin: "1em",
  fontSize: "24px",
};

const title = {
  pageTitle: "Update Password Screen",
};

export default function UpdatePassword() {
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [updated, setUpdated] = React.useState();
  const [loadingUser, setLoadingUser] = React.useState();
  const [error, setError] = React.useState();

  // const name = useParams();

  React.useEffect(() => {
    setLoadingUser(true);
    const accessString = localStorage.getItem("JWT_TOKEN");
    if (accessString === null) {
      setLoadingUser(false);
      setError(true);
    } else {
      try {
        const response = axios.get("api/users/findUser", {
          params: {
            name,
          },
          headers: { Authorization: `JWT ${accessString}` },
        });
        this.setState({
          loadingUser: false,
          name: response.data.name,
          password: response.data.password,
          error: false,
        });
      } catch (error) {
        console.log(error.response.data);
        this.setState({
          loadingUser: false,
          error: true,
        });
      }
    }
  }, []);

  // React.useEffect(() => {}, [slug]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const updatePassword = async (e) => {
    const accessString = localStorage.getItem("JWT");
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    } else {
      e.preventDefault();
      const { name, password } = this.state;
      try {
        const response = await axios.put(
          "/api/users/updatePassword",
          {
            name,
            password,
          },
          {
            headers: { Authorization: `JWT ${accessString}` },
          }
        );
        if (response.data.message === "password updated") {
          this.setState({
            updated: true,
            error: false,
            loadingUser: false,
          });
        }
      } catch (error) {
        console.log(error.response.data);
        this.setState({
          updated: false,
          error: true,
          loadingUser: false,
        });
      }
    }
  };

  // eslint-disable-next-line consistent-return

  if (error) {
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
        <p style={loading}>
          There was a problem accessing your data. Please go login again.
        </p>
        <Button buttonText="Go Login" link="/login" />
      </div>
    );
  }
  if (loadingUser !== false) {
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
        <p style={loading}>Loading user data...</p>
      </div>
    );
  }
  if (loadingUser === false && updated === true) {
    return <Redirect to={`/profile`} />;
  }
  if (loadingUser === false) {
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
        <form className="profile-form" onSubmit={updatePassword}>
          <TextField
            // style={inputStyle}
            id="password"
            label="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          <Button variant="contained" color="primary" onClick={updatePassword}>
            Save Changes
          </Button>
          {/* <Button  buttonText="Save Changes" /> */}
        </form>

        <Button variant="contained" color="secondary" href="/forgotPassword">
          Home
        </Button>
        <Button variant="contained" color="secondary" href="/profile">
          Cancel Changes
        </Button>
      </div>
    );
  }
}

/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {
    useParams
  } from "react-router-dom";

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
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Update Password Screen',
};


export default function UpdatePassword() {

    const [name, setName] = React.useState();
    const [password, setPassword] = React.useState();
    const [updated, setUpdated] = React.useState();
    const [loadingUser, setLoadingUser] = React.useState();
    const [error, setError] = React.useState();


    React.useEffect(() => {
        setLoadingUser(true);  
        const accessString = localStorage.getItem('JWT_TOKEN');
        if (accessString === null) {
            setLoadingUser(false)
            setError(true)
        } else {
          const {name}  =    useParams();
          try {
            const response = await axios.get('http://localhost:3003/findUser', {
              params: {
                username,
              },
              headers: { Authorization: `JWT ${accessString}` },
            });
            this.setState({
              loadingUser: false,
              username: response.data.username,
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

    
      }, [slug]);


      React.useEffect(() => {

      }, [slug]);
  

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    } else {
      e.preventDefault();
      const { username, password } = this.state;
      try {
        const response = await axios.put(
          'http://localhost:3003/updatePassword',
          {
            username,
            password,
          },
          {
            headers: { Authorization: `JWT ${accessString}` },
          },
        );
        if (response.data.message === 'password updated') {
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
          <HeaderBar title={title} />
          <p style={loading}>
            There was a problem accessing your data. Please go login again.
          </p>
          <LinkButtons
            style={loginButton}
            buttonText="Go Login"
            link="/login"
          />
        </div>
      );
    }
    if (loadingUser !== false) {
      return (
        <div>
          <HeaderBar title={title} />
          <p style={loading}>Loading user data...</p>
        </div>
      );
    }
    if (loadingUser === false && updated === true) {
      return <Redirect to={`/userProfile/${username}`} />;
    }
    if (loadingUser === false) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.updatePassword}>
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              type="password"
            />
            <SubmitButtons buttonStyle={saveButton} buttonText="Save Changes" />
          </form>
          <LinkButtons buttonStyle={homeButton} buttonText="Go Home" link="/" />
          <LinkButtons
            buttonStyle={cancelButton}
            buttonText="Cancel Changes"
            link={`/userProfile/${username}`}
          />
        </div>
      );
    }
  }



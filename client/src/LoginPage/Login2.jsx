import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
import { oauthFacebook, oauthGoogle, logIn } from "../auth/helpers";

class Login2 extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    // we use this to make the card to appear after the page has been rendered

    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: "",
      formErrors: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setReturnPath() {
    const to =
      this.props.location.state !== undefined &&
      this.props.location.state.prevPath === "create"
        ? "/create"
        : "/profile";
    this.props.history.push(to);
  }

  async onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    await logIn(user);
    if (!this.props.errorMessage) {
      this.setReturnPath();
    }
  }

  async responseGoogle(res) {
    console.log(res);
    await oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.setReturnPath();
    }
  }

  async responseFacebook(res) {
    await oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.setReturnPath();
    }
  }

  render() {
    const { classes } = this.props;
    console.log("location: ", this.props.location);
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Typography
            align={"center"}
            color={"error"}
            component="h6"
            variant="h6"
          >
            {this.state.formErrors}
          </Typography>

          <FacebookLogin
            appId="1883125445347981"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            // cssClass="my-facebook-button-class"
            icon="fa-facebook"
            textButton="Login"
          />
          <GoogleLogin
            clientId="164931093808-jtgcj34sphhdtvt9j6vg488nm3uvmall.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            //className="my-google-button-class"
          />

          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
                value={this.state.email}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login2.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export default withRouter(withStyles(styles)(Login2));

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useLocation, useHistory } from "react-router-dom";
import { signUser, logIn } from "../auth/helpers";
import { NavLink } from "react-router-dom";

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

export default () => {
  const classes = useStyles();

  // const [cardAnimaton, setCardAnimaton] = React.useState("cardHidden");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formErrors, setFormErrors] = React.useState("");

  // const preventDefault = (event) => event.preventDefault();
  let location = useLocation();
  let history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const setReturnPath = () => {
    const to =
      location.state !== undefined && location.prevPath === "create"
        ? "/create"
        : "/profile";
    history.push(to);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    const response = await logIn(user);
    console.log(" Login response", response);
    if (response) {
      setReturnPath();
    }
  };

  const responseGoogle = async (res) => {
    const user = {
      method: "google",
      name: res.profileObj.name,
      id: res.profileObj.googleId,
      img: res.profileObj.imageUrl,
      email: res.profileObj.email,
    };

    const response = await signUser(user);

    if (response) {
      setReturnPath();
    }
  };

  const responseFacebook = async (res) => {
    // console.log("got facebook response ", res.id);
    const user = {
      method: "facebook",
      name: res.name,
      id: res.id,
      img: res.picture.data.url,
      email: res.email,
    };
    const response = await signUser(user);

    if (response) {
      setReturnPath();
    }
  };

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
          {formErrors}
        </Typography>

        <FacebookLogin
          appId="1883125445347981"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          // cssClass="my-facebook-button-class"
          icon="fa-facebook"
          textButton="Login"
          disableMobileRedirect={true}
        />
        <GoogleLogin
          clientId="164931093808-jtgcj34sphhdtvt9j6vg488nm3uvmall.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          //className="my-google-button-class"
        />

        <form className={classes.form}>
          <TextField
            className={classes.input}
            label="Email *"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            value={email}
            fullWidth
            variant="outlined"
          />
          <TextField
            className={classes.input}
            label="Password *"
            name="password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handlePasswordChange}
            value={password}
            fullWidth
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Typography className={classes.root}>
            <NavLink to="/forgotPassword" className="link" key="profile">
              Forgotten Password
            </NavLink>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
};

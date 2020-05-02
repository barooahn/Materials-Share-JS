import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOpenRounded";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { signUser, register } from "../auth/helpers";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { withRouter, useLocation, useHistory } from "react-router-dom";

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
}));

export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    cardAnimaton: "cardHidden",
    name: "",
    email: "",
    password1: "",
    password: "",
    formErrors: "",
  });

  let location = useLocation();
  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    let password;
    password = state.password === state.password1 ? state.password1 : null;

    const user = {
      name: state.name,
      email: state.email,
      password: password,
    };

    await register(user);
    if (!state.errorMessage) {
      history.push("/login");
    }
  };

  const responseGoogle = (res) => {
    const user = {
      method: "google",
      name: res.profileObj.name,
      id: res.profileObj.googleId,
      img: res.profileObj.imageUrl,
      email: res.profileObj.email,
    };

    signUser(user);

    if (!state.errorMessage) {
      setReturnPath();
    }
  };

  const responseFacebook = async (res) => {
    const user = {
      method: "facebook",
      name: res.name,
      id: res.id,
      img: res.picture.data.url,
      email: res.email,
    };
    const response = await signUser(user);

    // console.log("got facebook response ", response);

    if (!state.errorMessage) {
      setReturnPath();
    }
  };

  const handleChange = (e) => {
    // console.log("here", e.target.value);
    setState({ [e.target.name]: e.target.value });
  };

  const setReturnPath = () => {
    const to =
      location.state !== undefined && location.state.prevPath === "create"
        ? "/create"
        : "/profile";
    history.push(to);
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Typography variant="body1">{state.formErrors}</Typography>
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
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              value={state.name}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={state.email}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChange}
              value={state.password}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Repeat Password</InputLabel>
            <Input
              name="password1"
              type="password"
              id="password1"
              autoComplete="new-password"
              onChange={handleChange}
              value={state.password1}
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
            onClick={onSubmit}
          >
            Register
          </Button>
        </form>
      </Paper>
    </main>
  );
};

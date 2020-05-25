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
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useLocation, useHistory } from "react-router-dom";
import { signUser, logIn } from "../auth/helpers";
import { NavLink } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";

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
    marginTop: theme.spacing.unit * 4,
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
  sbcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButtons: {
    margin: 12,
  },
  forgottenPass: {
    cursor: "pointer",
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
    // console.log(" Login response", response);

    if (response.err) {
      setFormErrors(response.message);
    } else {
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

  function FacebookIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
      </SvgIcon>
    );
  }
  function GoogleIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
      </SvgIcon>
    );
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography
          align={"center"}
          color={"error"}
          component="h6"
          variant="h6"
        >
          {formErrors}
        </Typography>
        <div className={classes.sbcontainer}>
          <div className={classes.socialButtons}>
            <FacebookLogin
              appId="1883125445347981"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              // icon="fa-facebook"
              // textButton="Login"
              disableMobileRedirect={true}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  startIcon={<FacebookIcon />}
                  variant="outlined"
                  size="large"
                >
                  Login
                </Button>
              )}
            />
          </div>
          <div className={classes.socialButtons}>
            <GoogleLogin
              clientId="164931093808-jtgcj34sphhdtvt9j6vg488nm3uvmall.apps.googleusercontent.com"
              buttonText="Login"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  startIcon={<GoogleIcon />}
                  variant="outlined"
                  size="large"
                >
                  Login
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className="my-google-button-class"
            />
          </div>
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <div className={classes.input}>
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
          </div>
          <div className={classes.input}>
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
          </div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <NavLink to="/forgotPassword" className="link" key="profile">
            <Typography
              variant="caption"
              display="block"
              color="primary"
              className={classes.forgottenPass}
            >
              Forgotten Password
            </Typography>
          </NavLink>
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

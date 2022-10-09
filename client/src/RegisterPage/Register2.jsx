import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOpenRounded";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { signUser, register } from "../auth/helpers";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SvgIcon from "@mui/material/SvgIcon";

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
		margin: "10px",
		padding: "10px",
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: "10px",
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	input: {
		// marginTop: "5px",
		// padding: "20px"
		// border: "1px solid black",
		// backgroundColor: "#000"
	},
	sbcontainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	socialButtons: {
		margin: 12,
	},
}));

const Register2 = () => {
	const classes = useStyles();
	// const [cardAnimaton, setCardAnimaton] = React.useState("cardHidden");
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [password1, setPassword1] = React.useState("");
	const [nameError, setNameError] = React.useState(false);
	const [emailError, setEmailError] = React.useState(false);
	const [passwordError, setPasswordError] = React.useState(false);
	const [password1Error, setPassword1Error] = React.useState(false);
	const [formError, setFormError] = React.useState([""]);

	let location = useLocation();
	let history = useHistory();

	React.useEffect(() => {
		async function fetchMyAPI() {
			if (formError.length < 1) {
				const user = {
					name: name,
					email: email,
					password: password,
				};
				const response = await register(user);
				if (response?.err) {
					setFormError((formError) => [
						...formError,
						response.message,
					]);
				} else {
					history.push("/login");
				}
			}
		}
		fetchMyAPI();
	}, [formError]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setFormError([]);
		setNameError(false);
		setEmailError(false);
		setPassword1Error(false);
		setPasswordError(false);
		if (password !== password1) {
			setPasswordError(true);
			setPassword1Error(true);
			setFormError((formError) => [
				...formError,
				"Passwords don't match",
			]);
		}

		if (name === "") {
			setNameError(true);
			setFormError((formError) => [
				...formError,
				"Please enter your name",
			]);
		}
		if (email === "") {
			setEmailError(true);
			setFormError((formError) => [
				...formError,
				"Please enter your email",
			]);
		}
		if (password.length < 8) {
			setPasswordError(true);
			setFormError((formError) => [
				...formError,
				"Password must be more than 8 characters ",
			]);
		}
		if (password1 === "") {
			setPassword1Error(true);
			setFormError((formError) => [
				...formError,
				"Please repeat the password",
			]);
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
	};

	const responseFacebook = async (res) => {
		const user = {
			method: "facebook",
			name: res.name,
			id: res.id,
			img: `https://graph.facebook.com/${res.id}/picture?type=square`,
			email: res.email,
		};
		const response = await signUser(user);

		if (response) {
			setReturnPath();
		}
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handlePassword1Change = (e) => {
		setPassword1(e.target.value);
	};

	const setReturnPath = () => {
		const to =
			location.state !== undefined && location.prevPath === "create"
				? "/create"
				: "/profile";
		history.push(to);
	};

	function FacebookIcon(props) {
		return (
			<SvgIcon {...props}>
				<path d='M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z' />
			</SvgIcon>
		);
	}
	function GoogleIcon(props) {
		return (
			<SvgIcon {...props}>
				<path d='M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z' />
			</SvgIcon>
		);
	}

	return (
		<div className={classes.main}>
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<div className={classes.sbcontainer}>
					<div className={classes.socialButtons}>
						<FacebookLogin
							appId='1883125445347981'
							autoLoad={false}
							fields='name,email,picture'
							callback={responseFacebook}
							disableMobileRedirect={true}
							render={(renderProps) => (
								<Button
									onClick={renderProps.onClick}
									startIcon={<FacebookIcon />}
									variant='outlined'
									size='large'
								>
									Login
								</Button>
							)}
						/>
					</div>
					<div className={classes.socialButtons}>
						<GoogleLogin
							clientId='164931093808-jtgcj34sphhdtvt9j6vg488nm3uvmall.apps.googleusercontent.com'
							buttonText='Login'
							render={(renderProps) => (
								<Button
									onClick={renderProps.onClick}
									startIcon={<GoogleIcon />}
									variant='outlined'
									size='large'
								>
									Login
								</Button>
							)}
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							className='my-google-button-class'
						/>
					</div>
				</div>
				<Typography component='h1' variant='h5'>
					Register
				</Typography>
				{formError.map((error) => (
					<Typography variant='body1' color='secondary'>
						{error}
					</Typography>
				))}
				<form className={classes.form}>
					<TextField
						className={classes.input}
						label='Name *'
						autoComplete='name'
						onChange={handleNameChange}
						value={name}
						fullWidth
						variant='outlined'
						error={nameError}
						margin='dense'
					/>
					<TextField
						className={classes.input}
						label='Email *'
						name='email'
						autoComplete='email'
						autoFocus
						onChange={handleEmailChange}
						value={email}
						fullWidth
						variant='outlined'
						error={emailError}
						margin='dense'
					/>
					<TextField
						className={classes.input}
						label='Password *'
						name='password'
						type='password'
						id='password'
						autoComplete='new-password'
						onChange={handlePasswordChange}
						value={password}
						fullWidth
						variant='outlined'
						error={passwordError}
						margin='dense'
					/>
					<TextField
						className={classes.input}
						label='Repeat Password *'
						name='password1'
						type='password'
						id='password1'
						autoComplete='new-password'
						onChange={handlePassword1Change}
						value={password1}
						fullWidth
						variant='outlined'
						error={password1Error}
						margin='dense'
					/>
					<FormControlLabel
						control={
							<Checkbox name='checkedB' color='primary' />
						}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						onClick={onSubmit}
					>
						Register
					</Button>
				</form>
			</Paper>
		</div>
	);
};
export default Register2;

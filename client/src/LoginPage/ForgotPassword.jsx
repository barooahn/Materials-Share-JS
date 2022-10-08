/* eslint-disable no-console */
import React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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

export default function ForgotPassword() {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
	const [showError, setShowError] = React.useState();
	const [messageFromServer, setMessageFromServer] = React.useState();
	const [showNullError, setShowNullError] = React.useState(false);

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
				const response = await axios.post(
					"/api/users/forgotPassword",
					{
						email,
					}
				);
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
		<div className={classes.main}>
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Forgotten password
				</Typography>
				{showNullError && (
					<Typography
						component='h5'
						color='secondary'
						variant='h6'
					>
						The email address cannot be empty.
					</Typography>
				)}
				{showError && (
					<div>
						<Typography
							component='h5'
							color='secondary'
							variant='h6'
						>
							That email address isn&apos;t recognized.
							Please try again or register for a new
							account.
						</Typography>
						<br />
						<Button
							variant='contained'
							color='primary'
							href='/register'
						>
							Register
						</Button>
					</div>
				)}
				{messageFromServer === "recovery email sent" && (
					<Typography
						component='h5'
						color='primary'
						variant='h6'
					>
						Password Reset Email Successfully Sent!
					</Typography>
				)}
				<br />
				<Typography
					align={"center"}
					color={"error"}
					component='h6'
					variant='h6'
				></Typography>

				<form
					className={classes.form}
					noValidate
					autoComplete='off'
				>
					<TextField
						className={classes.input}
						label='Email *'
						name='email'
						autoComplete='email'
						autoFocus
						fullWidth
						id='email'
						value={email}
						placeholder='Email Address'
						variant='outlined'
						onChange={handleEmailChange}
					/>
					<Button
						color='primary'
						variant='contained'
						onClick={sendEmail}
					>
						Send Password Reset Email
					</Button>
					<br />
					<br />
					<Button color='secondary' variant='contained' href='/'>
						Home
					</Button>
				</form>
			</Paper>
		</div>
	);
}

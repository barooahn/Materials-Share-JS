import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";
import Paper from "@material-ui/core/Paper";
import { sendEmail } from "../actions/materials-share-email";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			display: "flex",
			flexDirection: "column",
			padding: theme.spacing(1),
		},
	},
	inputText: {
		marginBottom: 10,
	},
	submit: {
		marginTop: 10,
		width: "100px",
	},
}));

export default function ContactForm() {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [message, setMessage] = React.useState("");

	const onNameChange = (e) => {
		setName(e.target.value);
	};
	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const onMessageChange = (e) => {
		setMessage(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		var body = {
			from: email,
			to: "barooahn@gmail.com",
			subject: "Materials Share - User Email",
			text: `${name} sent:  ${message}`,
		};
		sendEmail(body).then((response) => {
			if (response.status === "success") {
				alert("Message Sent.");
				this.resetForm();
			} else if (response.status === "fail") {
				alert("Message failed to send.");
			}
		});
	};

	const resetForm = () => {
		setName("");
		setEmail("");
		setMessage("");
	};

	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography align='center' variant='h5' component='h4'>
				Have a question or comment?
			</Typography>
			<form id='contact-form' onSubmit={handleSubmit} method='POST'>
				<TextField
					className={classes.inputText}
					key={"Name"}
					label='Name'
					value={name}
					onChange={onNameChange}
					variant='outlined'
				/>
				<TextField
					className={classes.inputText}
					key={"Email"}
					label='Email'
					value={email}
					onChange={onEmailChange}
					variant='outlined'
				/>
				<TextField
					className={classes.inputText}
					key={"Message"}
					label='Message'
					value={message}
					multiline={true}
					rows={5}
					onChange={onMessageChange}
					variant='outlined'
				/>
				<ReCAPTCHA
					sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
				/>
				<Button
					className={classes.submit}
					variant='contained'
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleSubmit}>
					Submit
				</Button>
			</form>
		</Paper>
	);
}

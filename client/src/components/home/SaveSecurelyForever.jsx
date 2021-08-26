import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	saveSecurelyForever: {
		margin: "20px 0",
		[theme.breakpoints.up("sm")]: {
			textAlign: "left",
			margin: "20px -24px",
		},
	},
	img: {
		backgroundSize: "cover",
		background:
			"url(./img/saveSecurelyForeverImg.webp)  no-repeat center center",
		backgroundAttachment: "fixed",
		minHeight: "400px",
	},

	typography: {
		padding: "1rem",
		[theme.breakpoints.up("sm")]: {
			padding: 20,
			textAlign: "left",
			margin: "0 20px",
			fontSize: "1.3rem",
		},
	},
	proTip: {
		fontSize: "2rem",
		paddingLeft: "1rem",
		[theme.breakpoints.up("sm")]: { marginLeft: 20 },
	},

	title: {
		padding: "1rem",
		backgroundColor: "black",
		color: "#fff",
	},
}));

export default function DocsPicsVids() {
	const classes = useStyles();

	return (
		<div className={classes.saveSecurelyForever}>
			<div className={classes.img}> </div>

			<Typography
				className={classes.title}
				align='center'
				variant='h1'
				component='h1'>
				Save Securely, Forever
			</Typography>

			<br />
			<Grid container spacing={1} justify='center' alignItems='center'>
				<Grid item sm={8} xs={12}>
					<Typography
						className={classes.typography}
						variant='body1'>
						Save your work to the cloud. No need to carry
						around laptops, hard disk drives, USB sticks or
						boxes of materials. Always carry your work with
						you with cloud storage. Anywhere you can access
						the internet, you can access your resources. On
						your phone, your work computer, your laptop or
						even on a projector.
					</Typography>

					<Typography
						className={classes.proTip}
						variant='h2'
						component='h3'
						color='secondary'>
						Pro Tip
					</Typography>
					<Typography
						className={classes.typography}
						variant='body1'>
						Look out for the padlock on websites to make sure
						your data is secure. Insecure websites can access
						data you do not want to share. Material Share only
						shares your teaching resources with your
						permission and never shares your personal data.
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

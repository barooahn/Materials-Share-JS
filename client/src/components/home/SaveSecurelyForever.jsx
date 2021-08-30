import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	saveSecurelyForever: {
		margin: "20px 0",
		[theme.breakpoints.up("sm")]: {
			margin: "0 -24px",
		},
		backgroundColor: "white",
	},
	img: {
		backgroundSize: "cover",
		background:
			"url(./img/DocsPicsVidsImg-80.webp)  no-repeat center center",
		backgroundAttachment: "fixed",
		minHeight: "100vh",
	},

	mainText: {
		// border: "4px solid #313b61",
		backgroundColor: "#546f8b",
		color: "white",
		padding: "1rem",
		margin: "10px 0",
		[theme.breakpoints.up("sm")]: {
			textAlign: "left",
		},
	},
	proTipContainer: {
		width: "50%",
		padding: "20px",
		position: "relative",
		marginLeft: "auto",
		marginRight: 0,
		backgroundColor: "white",
		borderRadius: "5px 0 0 0",
	},
	proTip: {
		fontSize: "1.2rem",
		fontWeight: 700,
		textTransform: "capitalize",

		[theme.breakpoints.up("sm")]: {},
	},

	tipText: {
		[theme.breakpoints.up("sm")]: {
			fontSize: "1rem",
		},
	},
	title: {
		color: "black",
		paddingTop: "25px",
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
						className={classes.mainText}
						variant='body1'>
						Save your work to the cloud. No need to carry
						around laptops, hard disk drives, USB sticks or
						boxes of materials. Always carry your work with
						you with cloud storage. Anywhere you can access
						the internet, you can access your resources. On
						your phone, your work computer, your laptop or
						even on a projector.
					</Typography>
					<div className={classes.proTipContainer}>
						<Typography
							className={classes.proTip}
							variant='h2'
							component='h3'
							color='secondary'>
							PRO TIP
						</Typography>
						<Typography
							className={classes.tipText}
							variant='body2'>
							Look out for the padlock on websites to make
							sure your data is secure. Insecure websites
							can access data you do not want to share.
							Material Share only shares your teaching
							resources with your permission and never
							shares your personal data.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

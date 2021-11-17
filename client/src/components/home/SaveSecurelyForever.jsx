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
			"url(./img/saveSecurelyForeverImg.webp)  no-repeat 60% center",
		backgroundAttachment: "fixed",
		minHeight: "100vh",
	},

	mainText: {
		backgroundColor: "#7a5195",
		color: "white",
		padding: "3rem 1rem",
		margin: "10px auto",
		[theme.breakpoints.up("sm")]: {
			padding: "2rem",
			textAlign: "left",
			maxWidth: "66%",
			fontSize: "1.2rem",
		},
	},
	proTipContainer: {
		padding: "20px",
		margin: "10px auto",
		borderRadius: "5px 0 0 0",
		paddingBottom: "10px",
		[theme.breakpoints.up("sm")]: {
			width: "50%",
		},
	},
	proTip: {
		fontSize: "1.2rem",
		fontWeight: 700,
		textTransform: "capitalize",
		paddingBottom: "10px",

		[theme.breakpoints.up("sm")]: {},
	},

	tipText: {
		[theme.breakpoints.up("sm")]: {
			fontSize: "1rem",
		},
	},
	title: {
		color: "black",
		padding: "30px 10px",
		[theme.breakpoints.up("sm")]: {
			paddingTop: "25px",
		},
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
			<Grid
				container
				spacing={1}
				justifyContent='center'
				alignItems='center'>
				<Grid item sm={8} xs={12}>
					<Typography
						className={classes.mainText}
						variant='body1'>
						Always carry your work with you with cloud
						storage. Anywhere you can access the internet, you
						can access your resources.
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

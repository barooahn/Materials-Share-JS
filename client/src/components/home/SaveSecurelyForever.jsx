import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	saveSecurelyForever: {
		margin: "3rem 0",
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
		margin: "0 auto",
		padding: "2rem",
		[theme.breakpoints.up("sm")]: {
			maxWidth: "50%",
			fontSize: "1.2rem",
		},
	},
	proTipContainer: {
		padding: "1.5rem",
		marginTop: "1rem",
		paddingBottom: "2rem",
		[theme.breakpoints.up("sm")]: {
			maxWidth: "30%",
			marginLeft: "2rem",
		},
	},
	proTip: {
		fontSize: "1.2rem",
		fontWeight: 700,
		textTransform: "capitalize",
	},

	tipText: {
		[theme.breakpoints.up("sm")]: {
			fontSize: "1rem",
		},
	},
	title: {
		color: "black",
		paddingTop: "1.5rem",
		paddingBottom: "1.5rem",
		[theme.breakpoints.up("sm")]: {
			paddingTop: "2rem",
			paddingBottom: "2rem",
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
				component='h1'
			>
				Save Securely, Forever
			</Typography>

			<div className={classes.mainText}>
				<List>
					<ListItem>
						<Typography variant='body1'>
							Always carry your work with you with cloud
							storage.
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant='body1'>
							Anywhere you can access the internet, you can
							access your resources.
						</Typography>
					</ListItem>
				</List>
			</div>
			<div className={classes.proTipContainer}>
				<Typography
					className={classes.proTip}
					variant='h3'
					component='h3'
					color='secondary'
				>
					PRO TIP
				</Typography>
				<Typography className={classes.tipText} variant='body2'>
					Look out for the padlock on websites to make sure your
					data is secure. Insecure websites can access data you
					do not want to share. Material Share only shares your
					teaching resources with your permission and never
					shares your personal data.
				</Typography>
			</div>
		</div>
	);
}

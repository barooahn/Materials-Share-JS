import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	shareWithOthers: {
		margin: "3rem 0",
		[theme.breakpoints.up("sm")]: {
			margin: "0 -24px",
		},
		backgroundColor: "white",
	},
	img: {
		backgroundSize: "cover",
		background:
			"url(./img/shareWithOthersImg.webp)  no-repeat center center",
		backgroundAttachment: "fixed",
		minHeight: "100vh",
	},

	mainText: {
		backgroundColor: "#ff5722",
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
			marginRight: "2rem",
			marginLeft: "auto",
			textAlign: "right",
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
		<div className={classes.shareWithOthers}>
			<div className={classes.img}> </div>

			<Typography
				className={classes.title}
				align='center'
				variant='h1'
				component='h1'
			>
				Share With Other Teachers
			</Typography>

			<div className={classes.mainText}>
				<List>
					<ListItem>
						<Typography variant='body1'>
							Share with other teachers. Imagine having
							every other teacher’s resources to hand,
							searchable in an instant, 24/7.
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant='body1'>
							Delight your students with resources they
							deserve.
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
					If you don't want to share your work with others, or it
					is not complete yet, turn off sharing. Your document
					will be saved under your profile. You can edit your
					resource or change the sharing status at any time.
				</Typography>
			</div>
		</div>
	);
}

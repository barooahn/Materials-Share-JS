import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	searchAndFilter: {
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
		<div className={classes.searchAndFilter}>
			<div className={classes.img}> </div>

			<Typography
				className={classes.title}
				align='center'
				variant='h1'
				component='h1'>
				Save Time With Search And Filter
			</Typography>

			<br />
			<Grid container spacing={1} justify='center' alignItems='center'>
				<Grid item sm={8} xs={12}>
					<Typography
						className={classes.mainText}
						variant='body1'>
						Use the power of search and filter. Material Share
						could be called Material Search. We can accurately
						find the resource you are looking for in a split
						second. Search for a keyword in any part of the
						material’s metadata (objective, title, materials
						needed, procedure, language point and more).
						<br />
						<br />
						Then refine even further with filters. How long do
						you have before class to prepare? What level are
						you teaching? Only show resources that match your
						criteria.
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
							Combine search and filter to zoom in on
							materials that suit your precise needs. If
							you can’t find what you are looking for, why
							not create a new resource? Teachers can share
							their appreciation by giving you a like as
							they hit the heart button.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

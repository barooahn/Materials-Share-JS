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
			"url(./img/searchAndFilterImg.webp)  no-repeat 38% center",
		backgroundAttachment: "fixed",
		minHeight: "100vh",
	},

	mainText: {
		backgroundColor: "#ef5675",
		color: "white",
		padding: "3rem 1rem",
		margin: "10px auto",
		[theme.breakpoints.up("sm")]: {
			padding: "3rem",
			textAlign: "left",
			maxWidth: "66%",
			fontSize: "1.4rem",
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
		paddingTop: "30px",
		[theme.breakpoints.up("sm")]: {
			paddingTop: "25px",
		},
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
			<Grid
				container
				spacing={1}
				justifyContent='center'
				alignItems='center'>
				<Grid item sm={8} xs={12}>
					<Typography
						className={classes.mainText}
						variant='body1'>
						Material Share can accurately find the resource
						you are looking for in a split second. Just search
						for a keyword.
						<br />
						<br />
						Refine your search with filters. Time, Level,
						Language focus etc. Only show resources that match
						your criteria.
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

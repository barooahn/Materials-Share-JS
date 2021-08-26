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
			textAlign: "left",
			margin: "20px -24px",
		},
	},
	img: {
		backgroundSize: "cover",
		background:
			"url(./img/searchAndFilterImg.webp) no-repeat center center",
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
						className={classes.typography}
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
						Combine search and filter to zoom in on materials
						that suit your precise needs. If you can’t find
						what you are looking for, why not create a new
						resource? Teachers can share their appreciation by
						giving you a like as they hit the heart button.
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

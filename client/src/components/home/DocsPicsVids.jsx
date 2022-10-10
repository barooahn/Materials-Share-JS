import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
	documentsPicturesVideo: {
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
		backgroundColor: "#003f5c",
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
		<div className={classes.documentsPicturesVideo}>
			<div className={classes.img}> </div>

			<Typography
				className={classes.title}
				align='center'
				variant='h1'
				component='h1'>
				Documents, Pictures and Video
			</Typography>

			<br />
			<Grid
				container
				spacing={1}
				justifyContent='center'
				alignItems='center'>
				<Grid item sm={9} xs={12}>
					<Typography
						className={classes.mainText}
						variant='body1'>
						Upload Word documents, PDF files, vidoes, images
						to create the perfect teaching resource.
						<br />
						<br />
						Give additional details to help your material be
						easily found using search and filter.
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
							Why not complete all the fields when
							uploading a resource and make your own
							resource book? Just print and send to the
							publishers. Useful day-to-day, attractive to
							employers, and evidence of professional
							development.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

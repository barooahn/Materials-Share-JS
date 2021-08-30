import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { red } from "@material-ui/core/colors";

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
			<Grid container spacing={1} justify='center' alignItems='center'>
				<Grid item sm={9} xs={12}>
					<Typography
						className={classes.mainText}
						variant='body1'>
						Upload Word documents, PDF files, vidoes, images
						or any combination of the above to create the
						perfect teaching resource.
						<br />
						<br />
						Describe how the material is used and give
						additional details to help your material be easily
						found when you need it, using search and filter.
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

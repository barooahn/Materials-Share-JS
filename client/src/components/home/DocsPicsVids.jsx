import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	documentsPicturesVideo: {
		margin: "20px 0",
		[theme.breakpoints.up("sm")]: {
			textAlign: "left",
			margin: "20px -24px",
		},
	},
	img: {
		backgroundSize: "cover",
		background:
			"url(./img/DocsPicsVidsImg-80.webp)  no-repeat center center",
		backgroundAttachment: "fixed",
		minHeight: "100vh",
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
				<Grid item sm={8} xs={12}>
					<Typography
						className={classes.typography}
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
						Why not complete all the fields when uploading a
						resource and make your own resource book? Just
						print and send to the publishers. Useful
						day-to-day, attractive to employers, and evidence
						of professional development.
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

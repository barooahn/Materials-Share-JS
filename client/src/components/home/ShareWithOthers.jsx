import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	shareWithOthers: {
		margin: "20px 0",
		[theme.breakpoints.up("sm")]: {
			textAlign: "left",
			margin: "20px -24px",
		},
	},
	img: {
		backgroundSize: "cover",
		background:
			"url(./img/shareWithOthersImg.webp)  no-repeat center center",

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
		<div className={classes.shareWithOthers}>
			<div className={classes.img}> </div>

			<Typography
				className={classes.title}
				align='center'
				variant='h1'
				component='h1'>
				Share With Other Teachers
			</Typography>

			<br />
			<Grid container spacing={1} justify='center' alignItems='center'>
				<Grid item sm={8} xs={12}>
					<Typography
						className={classes.typography}
						variant='body1'>
						Why not share your work with other teachers?
						Sharing makes everyone's life easier. Imagine
						having not only your resources, but every other
						teacher’s resources to hand, searchable in an
						instant, 24/7.
						<br />
						<br />
						Delight your students with resources they deserve.
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
						If you don't want to share your work with others,
						or it is not complete yet, turn off sharing. Your
						document will be saved under your profile. You can
						edit your resource or change the sharing status at
						any time.
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

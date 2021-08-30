import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	shareWithOthers: {
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
						className={classes.mainText}
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
							If you don't want to share your work with
							others, or it is not complete yet, turn off
							sharing. Your document will be saved under
							your profile. You can edit your resource or
							change the sharing status at any time.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

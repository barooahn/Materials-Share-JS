import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	documentsPicturesVideo: {
		margin: "3rem 0",
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
		margin: "0 auto",
		padding: "2rem",
		// textAlign: "center",
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
				component='h1'
			>
				Documents, Pictures and Video
			</Typography>

			<div className={classes.mainText}>
				<List>
					<ListItem>
						<Typography variant='body1'>
							Upload Word documents, PDF files, videos,
							images to create the perfect teaching
							resource.
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant='body1'>
							Give additional details to help your material
							be easily found using search and filter.
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
					Why not complete all the fields when uploading a
					resource and make your own resource book? Just print
					and send to the publishers. Useful day-to-day,
					attractive to employers, and evidence of professional
					development.
				</Typography>
			</div>
		</div>
	);
}

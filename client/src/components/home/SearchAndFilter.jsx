import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	searchAndFilter: {
		margin: "3rem 0",
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
			marginLeft: "2rem",
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
		<div className={classes.searchAndFilter}>
			<div className={classes.img}> </div>

			<Typography
				className={classes.title}
				align='center'
				variant='h1'
				component='h1'
			>
				Save Time With Search And Filter
			</Typography>
			<div className={classes.mainText}>
				<List>
					<ListItem>
						<Typography variant='body1'>
							Material Share can accurately find the
							resource you are looking for in a split
							second. Just search for a keyword.
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant='body1'>
							Refine your search with filters. Time, Level,
							Language focus etc. Only show resources that
							match your criteria.
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
					Combine search and filter to zoom in on materials that
					suit your precise needs. If you canU+2019t find what
					you are looking for, why not create a new resource?
					Teachers can share their appreciation by giving you a
					like as they hit the heart button.
				</Typography>
			</div>
		</div>
	);
}

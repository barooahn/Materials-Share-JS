import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import SvgIcon from "@mui/material/SvgIcon";
import {
	Instagram,
	LinkedIn,
	Facebook,
	Reply,
	Email,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
	splash: {
		[theme.breakpoints.up("sm")]: {
			// margin: "-24px auto",
			textAlign: "left",
		},
	},
	typography: {
		textAlign: "center",
		[theme.breakpoints.up("sm")]: {
			textAlign: "right",
			paddingRight: 40,
		},
	},
	header: {
		width: "100%",
	},
	title: {
		color: "black",
		fontSize: 20,
		marginBottom: "20px",
		[theme.breakpoints.up("sm")]: {
			margin: "20px 0",
			fontSize: 50,
		},
	},
	iconWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		[theme.breakpoints.up("sm")]: {
			justifyContent: "flex-start",
		},
	},
	icon: {
		fontSize: 40,
		marginRight: 10,
		marginBottom: 10,
		[theme.breakpoints.up("sm")]: {
			paddingTop: 5,
			fontSize: 50,
		},
	},
	SVGicon: {
		fontSize: 40,
		marginBottom: 10,
		marginRight: 5,
		[theme.breakpoints.up("sm")]: {
			paddingTop: 5,
			fontSize: 55,
		},
	},
	box: {
		verticalAlign: "middle",
		marginTop: "20px",
		[theme.breakpoints.up("sm")]: {
			margin: "50px 0",
		},
	},

	videoContainer: {
		display: "flex",
		justifyContent: "center",
	},
	video: {
		width: "100%",
		height: "210px",
		[theme.breakpoints.up("sm")]: {
			maxWidth: "1200px",
			height: "713px",
		},
	},
	saveButton: {
		margin: 10,
		textDecoration: "none",
	},
	browseButton: {
		margin: 10,
	},
	ctaContainer: {
		display: "flex",
		justifyContent: "center",
	},
}));

export default function AutoGridNoWrap() {
	const classes = useStyles();
	return (
		<div className={classes.splash}>
			<div className={classes.header}>
				<Typography
					className={classes.title}
					align='center'
					variant='h1'
					component='h1'>
					Teaching Resources Made Simple
				</Typography>
			</div>
			<div className={classes.videoContainer}>
				<iframe
					className={classes.video}
					width='100%'
					height='auto'
					src='https://www.youtube.com/embed/cTYKiESEAJU'
					title='MaterialsShare.com'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen></iframe>
			</div>
			<div>
				<Grid
					container
					className={classes.box}
					spacing={1}
					justifyContent='center'
					alignItems='center'>
					<Grid item sm={7} xs={12}>
						<NavLink to='/create' className='link'>
							<Typography
								className={classes.typography}
								component='h3'>
								Documents, pictures and video
							</Typography>
						</NavLink>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}>
						<NavLink to='/create' className='link'>
							<Icon
								className={classes.icon}
								color='secondary'>
								post_add
							</Icon>
							<Icon
								className={classes.icon}
								color='secondary'>
								camera_alt
							</Icon>
							<Icon
								className={classes.icon}
								color='secondary'>
								video_call
							</Icon>
						</NavLink>
					</Grid>
					<Grid item sm={7} xs={12}>
						<NavLink to='/create' className='link'>
							<Typography
								className={classes.typography}
								component='h3'>
								Save securely, forever. Access anywhere
							</Typography>
						</NavLink>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}>
						<NavLink to='/create' className='link'>
							<Icon
								className={classes.icon}
								color='secondary'>
								enhanced_encryption
							</Icon>
							<Icon
								className={classes.icon}
								color='secondary'>
								cloud_upload
							</Icon>
						</NavLink>
					</Grid>
					<Grid item sm={7} xs={12}>
						<Typography
							className={classes.typography}
							component='h3'>
							Share with other teachers
						</Typography>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'>
							<Instagram />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'>
							<LinkedIn />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'>
							<Facebook />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'>
							<Reply />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'>
							<Email />
						</SvgIcon>
					</Grid>
					<Grid item sm={7} xs={12}>
						<Typography
							className={classes.typography}
							component='h3'>
							Save time with search and filter
						</Typography>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}>
						<Icon className={classes.icon} color='secondary'>
							search
						</Icon>
						<Icon
							className={classes.icon}
							color='secondary'
							height='50px'>
							filter_list
						</Icon>
					</Grid>
					<div className={classes.ctaContainer}>
						<Link
							to='/create'
							style={{ textDecoration: "none" }}>
							<Button
								className={classes.saveButton}
								color='primary'
								variant='contained'>
								Save Resource
							</Button>
						</Link>
						<Link
							to='/materials'
							style={{ textDecoration: "none" }}>
							<Button
								className={classes.browseButton}
								variant='contained'>
								Browse Resources
							</Button>
						</Link>
					</div>
				</Grid>
			</div>
		</div>
	);
}

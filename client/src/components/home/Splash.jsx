import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

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
		margin: "10px auto 15px auto",
	},
	title: {
		color: "black",
		fontSize: 20,
		marginBottom: "20px",
		[theme.breakpoints.up("sm")]: {
			margin: "3rem 0",
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
	iconsContainer: {
		margin: 20,
	},
	icon: {
		marginRight: 10,
	},
	SVGicon: {
		marginRight: 5,
	},
	box: {
		verticalAlign: "middle",
		marginTop: "20px",
		[theme.breakpoints.up("sm")]: {},
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
		gap: "5px",
		margin: "30px 0",
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
					component='h1'
				>
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
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
				></iframe>
			</div>
			<div className={classes.iconsContainer}>
				<Grid
					container
					className={classes.box}
					spacing={3}
					justifyContent='center'
					alignItems='center'
					// marginBottom={5}
				>
					<Grid item sm={7} xs={12}>
						<NavLink to='/create' className='link'>
							<Typography
								className={classes.typography}
								component='h3'
							>
								Documents, pictures and video
							</Typography>
						</NavLink>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}
					>
						<NavLink to='/create' className='link'>
							<PostAddIcon
								className={classes.icon}
								color='secondary'
							/>

							<CameraAltIcon
								className={classes.icon}
								color='secondary'
							/>

							<VideoCallIcon
								className={classes.icon}
								color='secondary'
							/>
						</NavLink>
					</Grid>
					<Grid item sm={7} xs={12}>
						<NavLink to='/create' className='link'>
							<Typography
								className={classes.typography}
								component='h3'
							>
								Save securely, forever. Access anywhere
							</Typography>
						</NavLink>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}
					>
						<NavLink to='/create' className='link'>
							<EnhancedEncryptionIcon
								className={classes.icon}
								color='secondary'
							/>
							<CloudUploadIcon
								className={classes.icon}
								color='secondary'
							/>
						</NavLink>
					</Grid>
					<Grid item sm={7} xs={12}>
						<Typography
							className={classes.typography}
							component='h3'
						>
							Share with other teachers
						</Typography>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}
					>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'
						>
							<Instagram />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'
						>
							<LinkedIn />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'
						>
							<Facebook />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'
						>
							<Reply />
						</SvgIcon>
						<SvgIcon
							className={classes.SVGicon}
							color='secondary'
						>
							<Email />
						</SvgIcon>
					</Grid>
					<Grid item sm={7} xs={12}>
						<Typography
							className={classes.typography}
							component='h3'
						>
							Save time with search and filter
						</Typography>
					</Grid>
					<Grid
						item
						sm={5}
						xs={12}
						className={classes.iconWrapper}
					>
						<SearchIcon
							className={classes.icon}
							color='secondary'
						/>

						<FilterListIcon
							className={classes.icon}
							color='secondary'
						/>
					</Grid>
				</Grid>
				<div className={classes.ctaContainer}>
					<Link to='/create' style={{ textDecoration: "none" }}>
						<Button
							className={classes.saveButton}
							color='primary'
							variant='contained'
						>
							Save Resource
						</Button>
					</Link>
					<Link
						to='/materials'
						style={{ textDecoration: "none" }}
					>
						<Button
							className={classes.browseButton}
							variant='contained'
						>
							Browse Resources
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

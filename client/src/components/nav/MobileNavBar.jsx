import React from "react";
import { makeStyles } from "@mui/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/HelpRounded";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";
import AccountBoxIcon from "@mui/icons-material/AccountBoxRounded";
import Assignment from "@mui/icons-material/AssignmentRounded";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Eject from "@mui/icons-material/EjectRounded";
import { deepOrange } from "@mui/material/colors";
import { logOut } from "../../auth/helpers";
import { NavLink, useLocation } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import Icon from "@mui/material/Icon";
import IbLogo from "./icons/ibLogo";
import clsx from "clsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
	topNav: {
		position: "fixed",
		bottom: 0,
		width: "100%",
		zIndex: 10,
		height: 60,
		display: "flex",
		flexDirection: "row",
	},
	bottomNav: {
		position: "fixed",
		bottom: 0,
		width: "100%",
		zIndex: 10,
		padding: "10px",
		display: "flex",
		justifyContent: "space-between",
	},
	content: { marginTop: 80 },
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	appBar: {
		top: 0,
		marginBottom: 20,
	},
	fabButton: {
		position: "fixed !important",
		zIndex: 9,
		bottom: 50,
		right: 10,
		width: "50px",
	},
	filter: {
		marginTop: 100,
	},
	expand: {
		transform: "rotate(0deg)",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
		marginLeft: -5,
		marginRight: -10,
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	toolbar: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	profile: { marginLeft: "auto" },
	logo: {
		cursor: "pointer",
		height: 25,
	},
	search: { flexGrow: 1, width: "100%" },
	circularProgress: {
		position: "absolute",
		top: "50%",
		left: "47%",
		zIndex: 50,
	},
}));

export default function LabelBottomNavigation({ routePaths }) {
	const classes = useStyles();
	const [bottomNavValue, setBottomNavValue] = React.useState("recents");
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [gettingSearchResults, setGettingSearchResults] =
		React.useState(false);

	const [expanded, setExpanded] = React.useState(false);
	const isMenuOpen = Boolean(anchorEl);
	const menuId = "primary-search-account-menu";
	let location = useLocation();

	let history = useHistory();

	const handleExpandClick = (e) => {
		setExpanded(!expanded);
	};

	const handleLoginClick = () => {
		handleMenuClose();
		history.push("/login");
	};
	const handleRegisterClick = () => {
		handleMenuClose();
		history.push("/register");
	};
	const handleSignOutClick = () => {
		logOut();
		handleMenuClose();
		history.push("/");
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleBottomNavChange = (event, newValue) => {
		setBottomNavValue(newValue);
	};

	const handleHomeClick = () => {
		history.push("/");
	};
	const handleBrowseClick = () => {
		history.push("/about");
	};
	const handleNewClick = () => {
		history.push("/create");
	};
	const handleIBClick = () => {
		history.push("/ibmyp");
	};
	const handleHelpClick = () => {
		history.push("/help");
	};

	function HideOnScroll(props) {
		const { children } = props;
		let thresh = expanded ? 1000000 : 100;
		const trigger = useScrollTrigger({ threshold: thresh });
		return (
			<Fade appear={false} direction='down' in={!trigger}>
				{children}
			</Fade>
		);
	}

	const menuOptions = () => {
		if (!localStorage.getItem("JWT_TOKEN")) {
			return (
				<div>
					<MenuItem onClick={handleMenuClose}>
						<NavLink
							to='/profile'
							className='link'
							key='profile'
						>
							<ListItem onClick={handleLoginClick}>
								<ListItemIcon>
									<AccountBoxIcon />
								</ListItemIcon>
								<ListItemText primary='Login' />
							</ListItem>
						</NavLink>
					</MenuItem>
					<MenuItem onClick={handleMenuClose}>
						<ListItem onClick={handleRegisterClick}>
							<ListItemIcon>
								<Assignment />
							</ListItemIcon>
							<ListItemText primary='Register' />
						</ListItem>
					</MenuItem>
				</div>
			);
		} else {
			return (
				<div>
					<MenuItem onClick={handleMenuClose}>
						<NavLink
							to='/profile'
							className='link'
							key='profile'
						>
							<ListItem component='div'>
								<ListItemIcon>
									<Assignment />
								</ListItemIcon>
								<ListItemText primary='Profile' />
							</ListItem>
						</NavLink>
					</MenuItem>

					<MenuItem onClick={handleSignOutClick}>
						<ListItem component='div'>
							<ListItemIcon>
								<Eject />
							</ListItemIcon>
							<ListItemText primary='Logout' />
						</ListItem>
					</MenuItem>
				</div>
			);
		}
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Box display='block' displayPrint='none'>
				<AppBar
					color='transparent'
					sx={{ backdropFilter: "blur(20px)" }}
					className={classes.topNav}
				>
					<Toolbar className={classes.toolbar} disableGutters>
						<IconButton
							className={classes.logo}
							onClick={handleHomeClick}
							aria-label='Home'
						>
							<img
								src={
									"/img/SVG/MaterialsshareLogoMobile.svg"
								}
								alt='Materialsshare Logo'
								className={classes.logo}
							/>
						</IconButton>
						{"/" === location.pathname ||
						"/materials" === location.pathname ||
						"/ibmyp" === location.pathname ||
						"/search" === location.pathname ? (
							<>
								<Search
									className={classes.search}
									setGettingSearchResults={
										setGettingSearchResults
									}
								/>

								<IconButton
									className={clsx(classes.expand, {
										[classes.expandOpen]:
											expanded,
									})}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label='show more'
								>
									<Icon
										color='primary'
										sx={{ fontSize: "35px" }}
									>
										filter_list
									</Icon>
								</IconButton>
							</>
						) : null}
						<IconButton
							className={classes.profile}
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
						>
							<Avatar
								alt={localStorage.getItem("USER_NAME")}
								src={localStorage.getItem("USER_IMG")}
								className={classes.orange}
							>
								{localStorage.getItem("USER_NAME")
									? localStorage
											.getItem("USER_NAME")
											.charAt(0)
									: null}
							</Avatar>
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>

			{"/" === location.pathname ||
			"/materials" === location.pathname ||
			"/ibmyp" === location.pathname ||
			"/search" === location.pathname ? (
				<Filter
					expanded={expanded}
					className={classes.filter}
					setExpanded={setExpanded}
				/>
			) : null}
			{gettingSearchResults ? (
				<div className={classes.circularProgress}>
					<CircularProgress size={40} color='secondary' />
				</div>
			) : null}
			<Box display='block' displayPrint='none'>
				<Menu
					anchorEl={anchorEl}
					id={menuId}
					keepMounted
					open={isMenuOpen}
					onClose={handleMenuClose}
				>
					<div>{menuOptions()}</div>
				</Menu>
			</Box>
			<div className={classes.content}>{routePaths}</div>

			<Box display='block' displayPrint='none'>
				<BottomNavigation
					bottomnavvalue={bottomNavValue}
					onChange={handleBottomNavChange}
					className={classes.bottomNav}
				>
					<HideOnScroll>
						<IconButton
							className={classes.fabButton}
							aria-label='Create Material'
							onClick={handleNewClick}
							// color='primary'
						>
							<AddCircleIcon
								// color='secondary'
								sx={{ fontSize: "50px" }}
							/>
						</IconButton>
					</HideOnScroll>
					<BottomNavigationAction
						label='Home'
						value='home'
						icon={<HomeIcon />}
						showLabel={true}
						onClick={handleHomeClick}
					/>
					<BottomNavigationAction
						label='About'
						value='about'
						icon={<InfoIcon />}
						showLabel={true}
						onClick={handleBrowseClick}
					/>
					<BottomNavigationAction
						label='New'
						value='new'
						icon={<AddBoxIcon />}
						showLabel={true}
						onClick={handleNewClick}
					/>
					<BottomNavigationAction
						label='IB MYP'
						value='ibmyp'
						icon={<IbLogo />}
						showLabel={true}
						onClick={handleIBClick}
					/>
					<BottomNavigationAction
						label='Help'
						value='help'
						icon={<HelpIcon />}
						showLabel={true}
						onClick={handleHelpClick}
					/>
				</BottomNavigation>
			</Box>
			<Box></Box>
		</React.Fragment>
	);
}

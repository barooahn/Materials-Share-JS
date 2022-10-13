import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/MenuRounded";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/Info";
import AccountBoxIcon from "@mui/icons-material/AccountBoxRounded";
import HelpIcon from "@mui/icons-material/HelpRounded";
import Assignment from "@mui/icons-material/AssignmentRounded";
import Eject from "@mui/icons-material/EjectRounded";
import { logOut } from "../../auth/helpers";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Search from "./Search";
import Filter from "./Filter";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import { deepOrange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import IbLogo from "./icons/ibLogo";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	navBar: {
		display: "flex",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	button: {
		margin: theme.spacing(1),
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		[theme.breakpoints.up("sm")]: {
			width: "46px",
		},
	},
	drawerWrapper: {
		zIndex: 1,
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},

	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	grow: {
		flexGrow: 1,
	},
	filter: {
		width: "100%",
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	profile: { marginLeft: "auto" },
	search: { display: "flex ", width: "100%" },
	circularProgress: {
		position: "absolute",
		top: "50%",
		left: "47%",
		zIndex: 50,
	},
	loginRegisterButtons: {
		display: "flex",
		textAlign: "right",
		gap: "5px",
	},
	logo: {
		height: 32,
		paddingRight: 20,
		cursor: "pointer",
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	ibLogo: {},
	listIcon: {
		marginLeft: "5px",
	},
}));

export default function MiniDrawer({ routePaths }) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [expanded, setExpanded] = React.useState(false);

	const [gettingSearchResults, setGettingSearchResults] =
		React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const isMenuOpen = Boolean(anchorEl);
	const menuId = "primary-search-account-menu";
	// const [isAuthenticated, setIsAuthenticated] = React.useState(
	//   localStorage.getItem("JWT_TOKEN")
	// );
	let location = useLocation();
	let history = useHistory();

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
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
	const handleHomeClick = () => {
		history.push("/");
	};

	const menuProfile = () => {
		if (!localStorage.getItem("JWT_TOKEN")) {
			return (
				<React.Fragment>
					<Button
						variant='contained'
						className={classes.button}
						startIcon={<AccountBoxIcon />}
						onClick={handleLoginClick}
						aria-label='Login'
					>
						Login
					</Button>
					<Button
						variant='contained'
						className={classes.button}
						startIcon={<Assignment />}
						onClick={handleRegisterClick}
						aria-label='Register'
					>
						Register
					</Button>
				</React.Fragment>
			);
		} else {
			return (
				<IconButton
					edge='end'
					aria-label='account of current user'
					aria-controls={menuId}
					aria-haspopup='true'
					onClick={handleProfileMenuOpen}
					color='inherit'
				>
					<Avatar
						src={localStorage.getItem("USER_IMG")}
						alt={localStorage.getItem("USER_NAME")}
						className={classes.orange}
					>
						{localStorage.getItem("USER_NAME")
							? localStorage.getItem("USER_NAME").charAt(0)
							: null}
					</Avatar>
				</IconButton>
			);
		}
	};

	return (
		<div className={classes.navBar}>
			<CssBaseline />
			<Box display='block' displayPrint='none'>
				<AppBar
					position='fixed'
					color='default'
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							className={clsx(classes.menuButton, {
								[classes.hide]: open,
							})}
						>
							<MenuIcon />
						</IconButton>
						<img
							src={"/img/SVG/MaterialsshareLogo.svg"}
							alt='Materialsshare Logo'
							className={classes.logo}
							onClick={handleHomeClick}
						/>
						{"/" === location.pathname ||
						"/materials" === location.pathname ||
						"/ibmyp" === location.pathname ||
						"/search" === location.pathname ? (
							<div className={classes.search}>
								<Search
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
									<Icon color='secondary'>
										filter_list
									</Icon>
								</IconButton>
							</div>
						) : null}

						<div className={classes.grow} />
						<div className={classes.loginRegisterButtons}>
							{menuProfile()}
						</div>
					</Toolbar>
				</AppBar>
			</Box>

			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				id={menuId}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>
					<NavLink to='/profile' className='link' key='profile'>
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
			</Menu>
			<Box
				display='block'
				displayPrint='none'
				className={classes.drawerWrapper}
			>
				<Drawer
					variant='permanent'
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton
							onClick={handleDrawerClose}
							aria-label='Close drawer'
						>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<List>
						<ListItem
							button
							key={"Home"}
							onClick={handleHomeClick}
							selected={"/" === location.pathname}
							gutters='5px'
							aria-label='Home'
						>
							<ListItemIcon className={classes.listIcon}>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary='Home' />
						</ListItem>

						<NavLink to='/about' className='link'>
							<ListItem
								button
								key={"About"}
								aria-label='About'
								selected={
									"/about" === location.pathname
								}
							>
								<ListItemIcon
									className={classes.listIcon}
								>
									<InfoIcon />
								</ListItemIcon>
								<ListItemText primary='About' />
							</ListItem>
						</NavLink>

						<NavLink to='/create' className='link'>
							<ListItem
								button
								aria-label='Create Material'
								key={"NewMaterial"}
								selected={
									"/create" === location.pathname
								}
							>
								<ListItemIcon
									className={classes.listIcon}
								>
									<AddBoxIcon />
								</ListItemIcon>
								<ListItemText primary='New Material' />
							</ListItem>
						</NavLink>
						<NavLink to='/ibmyp' className='link'>
							<ListItem
								button
								aria-label='IB-MPY Curriculum'
								key={"IB-MPY Curriculum"}
								selected={
									"/ibmyp" === location.pathname
								}
							>
								<ListItemIcon
									className={classes.listIcon}
								>
									<IbLogo />
								</ListItemIcon>
								<ListItemText primary='IB-MPY' />
							</ListItem>
						</NavLink>

						<NavLink to='/help' className='link'>
							<ListItem
								button
								aria-label='help'
								key={"help"}
								selected={"/help" === location.pathname}
							>
								<ListItemIcon
									className={classes.listIcon}
								>
									<HelpIcon />
								</ListItemIcon>
								<ListItemText primary='Help' />
							</ListItem>
						</NavLink>
					</List>
				</Drawer>
			</Box>
			<div className={classes.content}>
				<div className={classes.toolbar} />
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

				{routePaths}
			</div>
		</div>
	);
}

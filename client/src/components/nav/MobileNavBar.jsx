import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddBoxIcon from "@material-ui/icons/AddBoxRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ViewListIcon from "@material-ui/icons/ViewListRounded";
import HelpIcon from "@material-ui/icons/HelpRounded";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import AccountBoxIcon from "@material-ui/icons/AccountBoxRounded";
import Assignment from "@material-ui/icons/AssignmentRounded";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Eject from "@material-ui/icons/EjectRounded";
import { deepOrange } from "@material-ui/core/colors";
import { logOut } from "../../auth/helpers";
import { NavLink, useLocation } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  topNav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10,
    height: 60,
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10,
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
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 0,
    marginBottom: 20,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 70,
    right: 10,
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
  },
  profile: { marginLeft: "auto" },
  logo: {
    cursor: "pointer",
    height: 32,
  },
  search: { display: "flex ", width: "100%" },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "47%",
    zIndex: 50,
  },
  ibLogo: {
    height: 22,
  },
}));

export default function LabelBottomNavigation({ routePaths }) {
  const classes = useStyles();
  const [bottomNavValue, setBottomNavValue] = React.useState("recents");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);

  console.log("MobileNavBar - anchorEl", anchorEl);
  // console.log("MobileNavBar - routePaths", routePaths);

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
    // setIsAuthenticated("");
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
    history.push("/materials");
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
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const menuOptions = () => {
    if (!localStorage.getItem("JWT_TOKEN")) {
      return (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/profile" className="link" key="profile">
              <ListItem onClick={handleLoginClick}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItem onClick={handleRegisterClick}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </MenuItem>
        </div>
      );
    } else {
      return (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/profile" className="link" key="profile">
              <ListItem component="div">
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </NavLink>
          </MenuItem>

          <MenuItem onClick={handleSignOutClick}>
            <ListItem component="div">
              <ListItemIcon>
                <Eject />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </MenuItem>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box display="block" displayPrint="none">
        <HideOnScroll>
          <AppBar color="default" className={classes.topNav}>
            <Toolbar className={classes.toolbar} disableGutters>
              <IconButton
                className={classes.logo}
                onClick={handleHomeClick}
                aria-label="Home">
                {/* <LocalLibraryIcon color="secondary" fontSize="large" /> */}
                <img
                  src={"/img/SVG/MaterialsshareLogoMobile.svg"}
                  alt="Materialsshare Logo"
                  className={classes.logo}
                />
              </IconButton>
              {/* <div className={classes.grow} /> */}
              {"/" === location.pathname ||
              "/materials" === location.pathname ||
              "/search" === location.pathname ? (
                <div className={classes.search}>
                  <Search setGettingSearchResults={setGettingSearchResults} />
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <Icon color="secondary">filter_list</Icon>
                  </IconButton>
                </div>
              ) : null}
              <IconButton
                className={classes.profile}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}>
                <Avatar
                  alt={localStorage.getItem("USER_NAME")}
                  src={localStorage.getItem("USER_IMG")}
                  className={classes.orange}>
                  {localStorage.getItem("USER_NAME")
                    ? localStorage.getItem("USER_NAME").charAt(0)
                    : null}
                </Avatar>
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Box>

      {"/" === location.pathname ||
      "/materials" === location.pathname ||
      "/search" === location.pathname ? (
        <Filter
          expanded={expanded}
          className={classes.filter}
          setExpanded={setExpanded}
        />
      ) : null}
      {gettingSearchResults ? (
        <div className={classes.circularProgress}>
          <CircularProgress size={40} color="secondary" />
        </div>
      ) : null}
      <Box display="block" displayPrint="none">
        <Menu
          anchorEl={anchorEl}
          id={menuId}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}>
          <div>{menuOptions()}</div>
        </Menu>
      </Box>
      <div className={classes.content}>{routePaths}</div>
      <Box display="block" displayPrint="none">
        <BottomNavigation
          bottomnavvalue={bottomNavValue}
          onChange={handleBottomNavChange}
          className={classes.bottomNav}
          // position="fixed"
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            showLabel={true}
            onClick={handleHomeClick}
          />
          <BottomNavigationAction
            label="Browse"
            value="browse"
            icon={<ViewListIcon />}
            showLabel={true}
            onClick={handleBrowseClick}
          />
          <BottomNavigationAction
            label="New"
            value="new"
            icon={<AddBoxIcon />}
            showLabel={true}
            onClick={handleNewClick}
          />
          <BottomNavigationAction
            label="IB MYP"
            value="ibmyp"
            icon={
              <img
                src={"/img/ibLogo.png"}
                alt="IB Logo"
                className={classes.ibLogo}
              />
            }
            showLabel={true}
            onClick={handleIBClick}
          />
          <BottomNavigationAction
            label="Help"
            value="help"
            icon={<HelpIcon />}
            showLabel={true}
            onClick={handleHelpClick}
          />
          <HideOnScroll>
            <Fab
              color="secondary"
              className={classes.fabButton}
              aria-label="Create Material">
              <AddIcon onClick={handleNewClick} />
            </Fab>
          </HideOnScroll>
        </BottomNavigation>
      </Box>
    </React.Fragment>
  );
}

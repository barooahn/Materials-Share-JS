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
import Fab from "@material-ui/core/Fab";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Search from "./Search";
import AccountBoxIcon from "@material-ui/icons/AccountBoxRounded";
import Assignment from "@material-ui/icons/AssignmentRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Eject from "@material-ui/icons/EjectRounded";

import { logOut } from "../../auth/helpers";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10
  },
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    top: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 70,

    right: 10
    // margin: "0 auto"
  }
}));

export default function LabelBottomNavigation({ routePaths }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");
  // const [searchResults, setSearchResults] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  let history = useHistory();

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

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  const handleHelpClick = () => {
    history.push("/help");
  };

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  const menuOptions = () => {
    if (!localStorage.getItem("JWT_TOKEN")) {
      return (
        <React.Fragment>
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
            <NavLink to="/profile" className="link" key="profile">
              <ListItem onClick={handleLoginClick}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </NavLink>
          </MenuItem>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/profile" className="link" key="profile">
              <ListItem>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </NavLink>
          </MenuItem>

          <MenuItem onClick={handleSignOutClick}>
            <ListItem>
              <ListItemIcon>
                <Eject />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </MenuItem>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="sticky" color="primary" className={classes.appBar}>
          <Toolbar>
            <div className={classes.grow} />
            <Search />
            <div className={classes.grow} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {menuOptions()}
      </Menu>
      <main>{routePaths}</main>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
        position="fixed"
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
          label="Help"
          value="help"
          icon={<HelpIcon />}
          showLabel={true}
          onClick={handleHelpClick}
        />
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon onClick={handleNewClick} />
        </Fab>
      </BottomNavigation>
    </React.Fragment>
  );
}

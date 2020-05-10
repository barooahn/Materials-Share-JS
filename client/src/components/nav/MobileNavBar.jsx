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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10,
  },
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
    // top: "auto",
    top: 0,
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
    // width: "100%"
    marginTop: 100,
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
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
  },
  profile: { alignSelf: "flex-end" },
  logo: {
    cursor: "pointer",
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
  },
  search: { display: "flex ", width: "100%" },
  upDownArrow: {
    marginLeft: -10,
    marginRight: -10,
  },
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

  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);

  console.log("MobileNavBar - anchorEl", anchorEl);

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
  const handleHelpClick = () => {
    history.push("/help");
  };

  function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
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
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="sticky" color="default" className={classes.appBar}>
          <Toolbar className={classes.toolbar} disableGutters>
            <IconButton className={classes.logo} onClick={handleHomeClick}>
              <LocalLibraryIcon color="secondary" fontSize="large" />
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
                  aria-label="show more"
                  className={classes.upDownArrow}
                  fontSize="large"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </div>
            ) : null}
            <IconButton
              className={classes.profile}
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                alt={localStorage.getItem("USER_NAME")}
                src={localStorage.getItem("USER_IMG")}
                className={classes.orange}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {"/" === location.pathname ||
      "/materials" === location.pathname ||
      "/search" === location.pathname ? (
        <Filter expanded={expanded} className={classes.filter} />
      ) : null}
      {gettingSearchResults ? (
        <div className={classes.circularProgress}>
          <CircularProgress size={40} color="secondary" />
        </div>
      ) : null}
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <div>{menuOptions()}</div>
      </Menu>
      <main>{routePaths}</main>
      <BottomNavigation
        bottomNavValue={bottomNavValue}
        onChange={handleBottomNavChange}
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
        <HideOnScroll>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon onClick={handleNewClick} />
          </Fab>
        </HideOnScroll>
      </BottomNavigation>
    </React.Fragment>
  );
}

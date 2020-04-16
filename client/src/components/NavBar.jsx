import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/MenuRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddBoxIcon from "@material-ui/icons/AddBoxRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ViewListIcon from "@material-ui/icons/ViewListRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBoxRounded";
import HelpIcon from "@material-ui/icons/HelpRounded";
import Assignment from "@material-ui/icons/AssignmentRounded";
import Eject from "@material-ui/icons/EjectRounded";
import { logOut } from "../auth/helpers";
import { NavLink } from "react-router-dom";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  button: {
    margin: theme.spacing(1)
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

export default function MiniDrawer({ routePaths }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  // const [isAuthenticated, setIsAuthenticated] = React.useState(
  //   localStorage.getItem("JWT_TOKEN")
  // );
  let location = useLocation();
  let history = useHistory();

  const handleProfileMenuOpen = event => {
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
    // setIsAuthenticated("");
    handleMenuClose();
    history.push("/");
  };

  const menuProfile = () => {
    if (!localStorage.getItem("JWT_TOKEN")) {
      return (
        <React.Fragment>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<AccountBoxIcon />}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<Assignment />}
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </React.Fragment>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Materials Share
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>{menuProfile()}</div>
        </Toolbar>
      </AppBar>
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
          <NavLink to="/profile" className="link" key="profile">
            <ListItem>
              <ListItemIcon>
                <Assignment fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Profile
              </Typography>
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
      </Menu>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink to="/" className="link">
            <ListItem button key={"Home"} selected={"/" === location.pathname}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>

          <NavLink to="/materials" className="link">
            <ListItem
              button
              key={"Materials"}
              selected={"/materials" === location.pathname}
            >
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Browse Resources" />
            </ListItem>
          </NavLink>

          <NavLink to="/create" className="link">
            <ListItem
              button
              key={"NewMaterial"}
              selected={"/create" === location.pathname}
            >
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="New Material" />
            </ListItem>
          </NavLink>

          <NavLink to="/help" className="link">
            <ListItem
              button
              key={"help"}
              selected={"/help" === location.pathname}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          {!localStorage.getItem("JWT_TOKEN")
            ? ((
                <NavLink to="/login" className="link" key="login">
                  <ListItem
                    button
                    key={"login"}
                    selected={"/login" === location.pathname}
                  >
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </NavLink>
              ),
              (
                <NavLink to="/register" className="link" key="register">
                  <ListItem
                    button
                    key={"register"}
                    selected={"/register" === location.pathname}
                  >
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItem>
                </NavLink>
              ))
            : ((
                <NavLink to="/profile" className="link" key="profile">
                  <ListItem
                    button
                    key={"profile"}
                    selected={"/profile" === location.pathname}
                  >
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                </NavLink>
              ),
              (
                <ListItem
                  button
                  className="link"
                  onClick={handleSignOutClick}
                  key="signout"
                >
                  <ListItemIcon>
                    <Eject />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {routePaths}
      </main>
    </div>
  );
}

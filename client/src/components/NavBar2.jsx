import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from "@material-ui/icons/MenuRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ViewListIcon from "@material-ui/icons/ViewListRounded";
import AddBoxIcon from "@material-ui/icons/AddBoxRounded";
import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
import HelpIcon from "@material-ui/icons/HelpRounded";
import Assignment from "@material-ui/icons/AssignmentRounded";
import Eject from "@material-ui/icons/EjectRounded";
import { logOut } from "../auth/helpers";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const styles = () => ({
  list: {
    width: 300
  },
  fullList: {
    width: "auto"
  }
});

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      isAuthenticated: localStorage.getItem("JWT_TOKEN")
    };
    //this.signOut = this.signOut.bind(this);
  }

  signOut = () => {
    logOut();
    this.setState({ isAuthenticated: "" });
    this.props.history.push("/");
  };

  toggleDrawer = (side, open) => () => {
    this.setState({ ...this.state, [side]: open });
  };

  sideList = () => {
    const {
      location: { pathname }
    } = this.props;
    return (
      <div className={styles.list}>
        <List>
          <NavLink to="/" className="link">
            <ListItem button key={"Home"} selected={"/" === pathname}>
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
              selected={"/materials" === pathname}
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
              selected={"/create" === pathname}
            >
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="New Material" />
            </ListItem>
          </NavLink>

          <NavLink to="/help" className="link">
            <ListItem button key={"help"} selected={"/help" === pathname}>
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
            ? [
                <NavLink to="/login" className="link" key="login">
                  <ListItem
                    button
                    key={"login"}
                    selected={"/login" === pathname}
                  >
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </NavLink>,
                <NavLink to="/register" className="link" key="register">
                  <ListItem
                    button
                    key={"register"}
                    selected={"/register" === pathname}
                  >
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItem>
                </NavLink>
              ]
            : null}
          {localStorage.getItem("JWT_TOKEN")
            ? [
                <NavLink to="/profile" className="link" key="profile">
                  <ListItem
                    button
                    key={"profile"}
                    selected={"/profile" === pathname}
                  >
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                </NavLink>,
                <ListItem
                  button
                  className="link"
                  onClick={this.signOut}
                  key="signout"
                >
                  <ListItemIcon>
                    <Eject />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              ]
            : null}
        </List>
      </div>
    );
  };

  render() {
    return (
      <AppBar position="static">
        <IconButton
          onClick={this.toggleDrawer("left", true)}
          color="inherit"
          aria-label="Menu"
          className="menu"
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {this.sideList()}
          </div>
        </Drawer>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(TemporaryDrawer));

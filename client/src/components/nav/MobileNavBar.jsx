import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddBoxIcon from "@material-ui/icons/AddBoxRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ViewListIcon from "@material-ui/icons/ViewListRounded";
import HelpIcon from "@material-ui/icons/HelpRounded";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10
  }
});

export default function LabelBottomNavigation({ routePaths }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");
  const [searchResults, setSearchResults] = React.useState({});
  
  let history = useHistory();

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

  return (
    <React.Fragment>
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
      </BottomNavigation>
    </React.Fragment>
  );
}

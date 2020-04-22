import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter, useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const style = {
  backgroundColor: "#f5f5f5"
};

const auto = {
  zIndex: "2000"
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20
    },
    details: {
      alignItems: "center"
    },
    column: {
      flexBasis: "33.33%"
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2)
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    }
  }
}));

export default function Search() {
  const classes = useStyles();
  const [searchResults, setSearchResults] = React.useState([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState([]);

  let history = useHistory();

  const goToResults = e => {
    if (e.key === "Enter" && searchResults.length > 0) {
      console.log("search - enter key pressed");
      history.push({
        pathname: "/search",
        state: { searchResults: searchResults }
      });
    }
  };

  React.useEffect(
    () => {
      fetch(`/api/titles`, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          setAutoCompleteOptions(resultData);
          console.log("Search - titles ", resultData);
        });
    },
    error => {
      console.log("Search - error in titles ", error);
    },
    []
  );

  const handleSearchChange = (e, values) => {
    let searchQuery = values ? values.title : e.target.value;
    if (searchQuery && searchQuery.length > 0) {
      fetch(`api/search/${searchQuery}`, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          console.log("Search - resultData", resultData);
          setSearchResults(resultData);
        });
    }
  };

  return (
    <div style={{width: "100%"}}>
      <div className={classes.root}>
        <Autocomplete
          style={auto}
          freeSolo
          id="Materials share search"
          options={autoCompleteOptions}
          onChange={handleSearchChange}
          getOptionLabel={option => option.title}
          onKeyPress={goToResults}
          autoSelect={true}
          fullWidth
          clearOnEscape={true}
          size={"small"}
          renderInput={params => (
            <TextField
              {...params}
              label="Search Materials..."
              fullWidth
              color="secondary"
              variant="outlined"
              onChange={handleSearchChange}
              onKeyPress={goToResults}
              InputProps={{
                ...params,
                type: "search ",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </div>
      <div className={classes.root}>
        <ExpansionPanel
          defaultExpanded={false}
          elevation={0}
          square={true}
          style={style}
        >
          <ExpansionPanelSummary
            className="expansionPanelSummary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
            style={style}
          ></ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              <Chip label="Barbados" onDelete={() => {}} />
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice
                <br />
                <a
                  href="#secondary-heading-and-columns"
                  className={classes.link}
                >
                  Learn more
                </a>
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    </div>
  );
}

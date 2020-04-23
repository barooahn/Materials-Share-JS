import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
// import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";

const style = {
  backgroundColor: "#f5f5f5"
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
  },
  search: {
    width: "100%"
  },
  timeInClass: {
    width: 200
  }
}));

export default function Search() {
  const classes = useStyles();
  const [searchResults, setSearchResults] = React.useState([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState([]);
  const [expanded, setExpanded] = React.useState(null);

  const [timeInClassValue, setTimeInClassValue] = React.useState([20, 37]);

  const handleTimeInClassValueChange = (event, newValue) => {
    setTimeInClassValue(newValue);
  };

  function timeInClassValueText(timeInClassValue) {
    return `${timeInClassValue} mins`;
  }

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

  const handleExpandedChange = panel => () => {
    const isExpanded = expanded === panel;
    setExpanded(isExpanded ? false : panel);
  };

  return (
    <div style={{ width: "100%" }}>
      <ExpansionPanel
        defaultExpanded={false}
        elevation={0}
        square={true}
        style={style}
        expanded={expanded === "panel1"}
      >
        <ExpansionPanelSummary
          className="expansionPanelSummary"
          expandIcon={<ExpandMoreIcon />}
          IconButtonProps={{
            onClick: handleExpandedChange("panel1")
          }}
          aria-controls="search-content"
          id="search-header"
          style={style}
        >
          <div className={classes.search}>
            <Autocomplete
              options={autoCompleteOptions}
              getOptionLabel={option => option.title}
              freeSolo
              fullWidth
              id="Materialss share search"
              onChange={handleSearchChange}
              getOptionLabel={option => option.title}
              onKeyPress={goToResults}
              autoSelect={true}
              clearOnEscape={true}
              size="small"
              renderInput={params => (
                <TextField
                  {...params}
                  label="Search Materials..."
                  className={classes.search}
                  variant="outlined"
                  color="secondary"
                  fullWidth={true}
                />
              )}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.timeInClass}>
            <Typography id="range-slider" gutterBottom>
              Time in class
            </Typography>
            <Slider
              value={timeInClassValue}
              onChange={handleTimeInClassValueChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={timeInClassValueText}
            />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Search</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

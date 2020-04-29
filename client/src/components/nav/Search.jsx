import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    height: 40,
    marginTop: 5
  },
  search: {
    width: "100%"
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
    <div className={classes.root}>
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
              // className={classes.search}
              variant="outlined"
              color="secondary"
              fullWidth={true}
            />
          )}
        />
      </div>
    </div>
  );
}

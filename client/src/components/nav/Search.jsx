import React from "react";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import { withRouter, useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({}));

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
    <div>
      <div className={classes.search}>
        
        <Autocomplete
          freeSolo
          
          id="free-solo-2-demo"
          style={{ width: 200 }}
          disableClearable
          options={autoCompleteOptions}
          onChange={handleSearchChange}
          getOptionLabel={option => option.title}
          onKeyPress={goToResults}
          renderInput={params => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              // variant="outlined"
              color="default"
              onChange={handleSearchChange}
              onKeyPress={goToResults}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
     
        {/* <Autocomplete
          id="combo-box-demo"
          options={autoCompleteOptions}
          getOptionLabel={option => option.title}
          onChange={handleSearchChange}
          onKeyPress={goToResults}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          renderInput={params => (
            // <TextField
            //   onChange={handleSearchChange}
            //   onKeyPress={goToResults}
            //   {...params}
            //   label="Search…"
            //   variant="outlined"
            //   size="small"
            // />
            <Paper
              // component="form"
              className={classes.root}
              onChange={handleSearchChange}
              onKeyPress={goToResults}
              // {...params}
            >
              <IconButton
                // type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Search Materials Share"
                inputProps={{ "aria-label": "search google maps" }}
                {...params}
                onChange={handleSearchChange}
                onKeyPress={goToResults}
              />
            </Paper>
          )}
        /> */}
      </div>
    </div>
  );
}

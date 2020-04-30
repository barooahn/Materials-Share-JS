import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const [open, setOpen] = React.useState(false);
  const loading = open && autoCompleteOptions.length === 0;
  let history = useHistory();

  
  React.useEffect(() => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }
    
    (async () => {
      const response = await fetch(`/api/getSearchResults`, {
        method: "GET"
      });
      const resultData = await response.json();
      
      if (active) {
        setAutoCompleteOptions(
          resultData.map(searchItem => {
            return { title: searchItem.search };
          })
          );
        }
      })();
      
      return () => {
        active = false;
      };
    }, [loading]);
    
    React.useEffect(() => {
      if (!open) {
        setAutoCompleteOptions([]);
      }
    }, [open]);
    
    const saveSearchResult = search => {
      fetch("/api/saveSearchResults", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ search: search })
      }).then(function(response) {
        return response.json();
      });
    };
    
    const goToResults = e => {
      if (e.key === "Enter" && searchResults.length > 0) {
        console.log("search - enter key pressed");
        history.push({
          pathname: "/search",
          state: { searchResults: searchResults }
        });
      }
    };
    
    const handleSearchChange = (e, value) => {
      let searchQuery = value ? value.title : e.target.value;
      if (searchQuery && searchQuery.length > 2) {
        fetch(`api/search/${searchQuery}`, {
          method: "GET"
        })
        .then(response => response.json())
        
        .then(resultData => {
          if (resultData.length > 0) {
            setSearchResults(resultData);
            saveSearchResult(searchQuery);
          }
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
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          id="Materialss share search"
          onKeyPress={goToResults}
          autoSelect={true}
          clearOnEscape={true}
          onChange={handleSearchChange}
          size="small"
          renderInput={params => (
            <TextField
              {...params}
              label="Search Materials..."
              variant="outlined"
              color="secondary"
              fullWidth={true}
              onChange={handleSearchChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  saveSearchQuery,
  getSearchResults,
  getSearchQueries,
} from "../../actions/materials-share-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    height: 40,
    marginTop: 5,
  },
  search: {
    width: "100%",
  },
}));

export default function Search({ setGettingSearchResults }) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = React.useState([]);
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
      const resultData = await getSearchQueries();

      if (active) {
        setAutoCompleteOptions(
          resultData.map((searchItem) => {
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

  const goToResults = async (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      setGettingSearchResults(true);
      const result = await getSearchResults(searchQuery);
      setGettingSearchResults(false);
      saveSearchQuery(searchQuery);
      history.push({
        pathname: "/search",
        state: { searchResults: result, searchQuery: searchQuery },
      });
    }
  };

  const handleSearchChange = (e, value) => {
    let searchQ = value ? value : e.target.value;
    console.log("Search searchQ", searchQ);
    if (searchQ && searchQ.length > 2) {
      setSearchQuery(searchQ);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <Autocomplete
          options={autoCompleteOptions.map((option) => option.title)}
          // getOptionLabel={(option) => option.title}
          freeSolo
          fullwidth="true"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          id="materials share search"
          onKeyPress={goToResults}
          autoSelect={true}
          clearOnEscape={true}
          onChange={handleSearchChange}
          size="small"
          renderInput={(params) => (
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
                      <CircularProgress color="secondary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

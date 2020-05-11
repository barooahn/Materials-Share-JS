import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Slider, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";

import Collapse from "@material-ui/core/Collapse";

import { SetAutocompletes } from "../helpers/SetAutocompletes";
import { getFilterResults } from "../../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const filterHeight =
  document.documentElement.clientWidth < 600 ? "100vh" : "auto";

const useStyles = makeStyles((theme) => ({
  collapse: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
    maxWidth: "100%",
    top: 60,
    position: "sticky",
    zIndex: 3,
  },
  paper: {
    paddingTop: 25,
    width: "97%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  filterItem: {
    marginBottom: 8,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  filterButton: {
    marginBottom: 20,
    marginLeft: "5%",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "47%",
    zIndex: 50,
  },
}));

export default ({ expanded, setExpanded }) => {
  const classes = useStyles();

  const [timeInClassValue, setTimeInClassValue] = React.useState([0, 100]);
  const [timePrepValue, setTimePrepValue] = React.useState([0, 100]);
  const [levelValue, setLevelValue] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState([]);
  const [languageFocusValue, setLanguageFocusValue] = React.useState([]);
  const [pupilTaskValue, setPupilTaskValue] = React.useState([]);
  const [activityUseValue, setActivityUseValue] = React.useState([]);

  const [dynamicCategory, setDynamicCategory] = React.useState([]);
  const [dynamicLevels, setDynamicLevels] = React.useState([]);
  const [dynamicPupilTask, setDynamicPupilTask] = React.useState([]);
  const [dynamicActivityUse, setDynamicActivityUse] = React.useState([]);
  const [dynamicLanguageFocus, setDynamicLanguageFocus] = React.useState([]);

  const [gettingSearchResults, setGettingSearchResults] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  //  /api/materials?start10&end=20&title

  let history = useHistory();
  let location = useLocation();

  React.useEffect(() => {
    async function fetchData() {
      const level = await SetAutocompletes("level");
      setDynamicLevels(level);
      const languageFocus = await SetAutocompletes("languageFocus");
      setDynamicLanguageFocus(languageFocus);
      const activityUse = await SetAutocompletes("activityUse");
      setDynamicActivityUse(activityUse);
      const pupilTask = await SetAutocompletes("pupilTask");
      setDynamicPupilTask(pupilTask);
      const category = await SetAutocompletes("category");
      setDynamicCategory(category);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      setSearchQuery(location.state ? location.state.searchQuery : "");
    }
    fetchData();
  }, [location.state]);

  // console.log("filter searchQuery", searchQuery);
  // console.log("filter location.state", location.state);

  const handleTimeInClassValueChange = (event, newValue) => {
    setTimeInClassValue(newValue);
  };
  const handleTimePrepValueChange = (event, newValue) => {
    setTimePrepValue(newValue);
  };

  function timeInClassValueText(timeInClassValue) {
    return `${timeInClassValue} mins`;
  }

  function timePrepValueText(timePrepValue) {
    return `${timePrepValue} mins`;
  }

  const convertValue = (value) => {
    return value.replace(/\W/gi, "").trim().toLowerCase();
  };

  const optionChange = (value) => {
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("label")) {
      const lastValue = value.pop(value[value.length]);
      const sanatisedValue = convertValue(lastValue);
      const lastValueItem = {
        label: lastValue,
        value: convertValue(sanatisedValue),
      };
      value.push(lastValueItem);
    }
    return value;
  };

  const changeLevel = (e, value) => {
    optionChange(value);
    setLevelValue(value);
  };

  const changePupilTask = (e, value) => {
    optionChange(value);
    setPupilTaskValue(value);
  };

  const changeCategory = (e, value) => {
    optionChange(value);
    setCategoryValue(value);
  };

  const changeLanguageFocus = (e, value) => {
    optionChange(value);
    setLanguageFocusValue(value);
  };

  const changeActivityUse = (e, value) => {
    optionChange(value);
    setActivityUseValue(value);
  };

  const getValuesFromObjects = (item) => {
    return item.map((element) => {
      return element.value;
    });
  };

  const goToResults = async (e) => {
    setGettingSearchResults(true);
    const level = getValuesFromObjects(levelValue);
    const languageFocus = getValuesFromObjects(languageFocusValue);
    const activityUse = getValuesFromObjects(activityUseValue);
    const pupilTask = getValuesFromObjects(pupilTaskValue);
    const category = getValuesFromObjects(categoryValue);
    const results = await getFilterResults(
      searchQuery,
      timeInClassValue,
      timePrepValue,
      level,
      languageFocus,
      activityUse,
      pupilTask,
      category
    );
    if (results) {
      setGettingSearchResults(false);
      setExpanded(!expanded);
      console.log(" filter returned results ", results);
      history.push({
        pathname: "/search",
        state: { searchResults: results, searchQuery: searchQuery },
      });
    }
  };

  return (
    <Collapse
      in={expanded}
      timeout="auto"
      unmountOnExit
      className={classes.collapse}
      collapsedHeight={filterHeight}
    >
      {gettingSearchResults ? (
        <div className={classes.circularProgress}>
          <CircularProgress size={40} color="secondary" />
        </div>
      ) : null}
      <Paper elevation={2} className={classes.paper}>
        <div className={classes.filterItem}>
          <Typography id="range-slider" gutterBottom>
            Time in Class
          </Typography>
          <Slider
            value={timeInClassValue}
            onChange={handleTimeInClassValueChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={timeInClassValueText}
          />
        </div>
        <div className={classes.filterItem}>
          <Typography id="range-slider" gutterBottom>
            Time for preperation
          </Typography>
          <Slider
            value={timePrepValue}
            onChange={handleTimePrepValueChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={timePrepValueText}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="combo-box-demo1"
            multiple
            value={pupilTaskValue}
            onChange={changePupilTask}
            options={dynamicPupilTask}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="What work will pupils do?"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="combo-box-demo2"
            multiple
            value={levelValue}
            onChange={changeLevel}
            options={dynamicLevels}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Level"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="category"
            multiple
            value={categoryValue}
            onChange={changeCategory}
            options={dynamicCategory}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Institue"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="language-focus"
            multiple
            value={languageFocusValue}
            onChange={changeLanguageFocus}
            options={dynamicLanguageFocus}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language focus"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="activity-use"
            multiple
            value={activityUseValue}
            onChange={changeActivityUse}
            options={dynamicActivityUse}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Activity use"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <Button
          className={classes.filterButton}
          variant="outlined"
          onClick={goToResults}
        >
          Filter
        </Button>
      </Paper>
    </Collapse>
  );
};

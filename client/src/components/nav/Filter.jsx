import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";

import SetAutocompletes from "../helpers/SetAutocompletes";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 5,
    margin: 5
  },
  slider: {},
  autoComplete: { marginBottom: 5 }
}));

export default ({ expanded }) => {
  const classes = useStyles();
  const [timeInClassValue, setTimeInClassValue] = React.useState([20, 37]);
  const [timePrepValue, setTimePrepValue] = React.useState([20, 37]);

  const [levelValue, setLevelValue] = React.useState([]);
  const [dynamicLevels, setDynamicLevels] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState([]);
  const [dynamicCategory, setDynamicCategory] = React.useState([]);
  const [pupilTaskValue, setPupilTaskValue] = React.useState([]);
  const [dynamicPupilTask, setDynamicPupilTask] = React.useState([]);
  const [activityUseValue, setActivityUseValue] = React.useState([]);
  const [dynamicActivityUse, setDynamicActivityUse] = React.useState([]);
  const [languageFocusValue, setLanguageFocusValue] = React.useState([]);
  const [dynamicLanguageFocus, setDynamicLanguageFocus] = React.useState([]);

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

  const convertValue = value => {
    return value
      .replace(/\W/gi, "")
      .trim()
      .toLowerCase();
  };

  const optionChange = value => {
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("label")) {
      const lastValue = value.pop(value[value.length]);
      const sanatisedValue = convertValue(lastValue);
      const lastValueItem = {
        label: lastValue,
        value: convertValue(sanatisedValue)
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

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <SetAutocompletes
        setDynamicLevels={setDynamicLevels}
        setDynamicLanguageFocus={setDynamicLanguageFocus}
        setDynamicActivityUse={setDynamicActivityUse}
        setDynamicPupilTask={setDynamicPupilTask}
        setDynamicCategory={setDynamicCategory}
      />
      <Paper className={classes.paper}>
        {/* <Typography variant="h4" align="center">
          Filter
        </Typography> */}
        <div className={classes.slider}>
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
        <div className={classes.slider}>
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
        <div>
          <Autocomplete
            id="combo-box-demo1"
            className={classes.autoComplete}
            multiple
            value={pupilTaskValue}
            onChange={changePupilTask}
            options={dynamicPupilTask}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                label="What work will pupils do?"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            id="combo-box-demo2"
            multiple
            value={levelValue}
            className={classes.autoComplete}
            onChange={changeLevel}
            options={dynamicLevels}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                label="Level"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            className={classes.autoComplete}
            id="category"
            multiple
            value={categoryValue}
            onChange={changeCategory}
            options={dynamicCategory}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                label="Institue"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            className={classes.autoComplete}
            id="language-focus"
            multiple
            value={languageFocusValue}
            onChange={changeLanguageFocus}
            options={dynamicLanguageFocus}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                label="Language focus"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            className={classes.autoComplete}
            id="activity-use"
            multiple
            value={activityUseValue}
            onChange={changeActivityUse}
            options={dynamicActivityUse}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                label="Activity use"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <Button variant="outlined" fullWidth>
          Filter
        </Button>
      </Paper>
    </Collapse>
  );
};

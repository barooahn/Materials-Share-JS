import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Slider, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";

import Collapse from "@material-ui/core/Collapse";

import { SetAutocompletes } from "../helpers/SetAutocompletes";
import { getAllMaterials } from "../../actions/materials-share-actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Mobile from "../helpers/mobile";

const filterHeight =
  Mobile() ? "100vh" : "auto";

console.log(" Filter Mobile", Mobile());

const useStyles = makeStyles((theme) => ({
  collapse: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
    maxWidth: "100%",
  },
  paper: {
    paddingTop: 25,
    paddingBottom: 25,
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

  const [totalMaterials, setTotalMaterials] = React.useState([]);

  let history = useHistory();

  React.useEffect(() => {
    async function fetchData() {
      setTotalMaterials(await getAllMaterials());
    }
    fetchData();
  }, []);

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
    if (
      value &&
      value.length > 0 &&
      !value[value.length - 1].hasOwnProperty("label")
    ) {
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

  React.useEffect(() => {
    filterMaterials();
  }, [
    levelValue,
    languageFocusValue,
    activityUseValue,
    pupilTaskValue,
    categoryValue,
    timeInClassValue,
    timePrepValue,
  ]);

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
    console.log("filter filterMaterials value ", value);
    optionChange(value);
    setActivityUseValue(value);
    console.log(
      "filter filterMaterials setActivityUseValue ",
      activityUseValue
    );
  };

  const getValuesFromObjects = (item) => {
    return item.map((element) => {
      return element.value;
    });
  };

  const filterMaterials = () => {
    setGettingSearchResults(true);
    let materials = totalMaterials;

    const activityUse = getValuesFromObjects(activityUseValue);
    const languageFocus = getValuesFromObjects(languageFocusValue);
    const category = getValuesFromObjects(categoryValue);
    const pupilTask = getValuesFromObjects(pupilTaskValue);
    const level = getValuesFromObjects(levelValue);

    const filterBy = (filterValue, values) => {
      return materials.filter((material) => {
        var inIndex = material[filterValue].map((allFiltervalues) => {
          return values.indexOf(allFiltervalues.value) !== -1;
        });
        // return inIndex.includes(true);
        return inIndex.every((v) => v === true);
      });
    };
    const filterByTime = () => {
      return materials.filter((material) => {
        return (
          material.timePrep >= timePrepValue[0] &&
          material.timePrep <= timePrepValue[1] &&
          material.timeInClass >= timeInClassValue[0] &&
          material.timeInClass <= timeInClassValue[1]
        );
      });
    };

    if (activityUse.length > 0) {
      materials = filterBy("activityUse", activityUse);
    }
    if (languageFocus.length > 0) {
      materials = filterBy("languageFocus", languageFocus);
    }
    if (category.length > 0) {
      materials = filterBy("category", category);
    }
    if (pupilTask.length > 0) {
      materials = filterBy("pupilTask", pupilTask);
    }
    if (level.length > 0) {
      materials = filterBy("level", level);
    }
    materials = filterByTime();

    setGettingSearchResults(false);
    history.push({
      pathname: "/search",
      state: { searchResults: materials },
    });
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
            step={5}
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
            step={5}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="pupilTask"
            multiple
            value={pupilTaskValue}
            onChange={changePupilTask}
            options={dynamicPupilTask}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tasks For Pupils"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
        <div className={classes.filterItem}>
          <Autocomplete
            id="level"
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
      </Paper>
    </Collapse>
  );
};

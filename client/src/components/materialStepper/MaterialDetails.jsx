import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  paper: {
    width: "95%",
    margin: "20px auto",
    padding: "15px",
  },
  inputText: {
    marginBottom: 10,
  },
  inputSlider: {
    marginBottom: 10,
  },
  inputAutocomplete: {
    marginBottom: 10,
  },
}));

export default ({
  title,
  setTitle,
  objective,
  setObjective,
  levels,
  levelValue,
  setLevelValue,
  pupilTasks,
  pupilTaskValue,
  setPupilTaskValue,
  curriculums,
  curriculumValue,
  setCurriculumValue,
  timePrep,
  setTimePrep,
  timeInClass,
  setTimeInClass,
  share,
  changeShare,
  targetLanguage,
  setTargetLanguage,
}) => {
  const classes = useStyles();
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeObjective = (e) => {
    setObjective(e.target.value);
  };

  const changeTimePrep = (e, newValue) => {
    setTimePrep(newValue);
  };

  const changeTimeInClass = (e, newValue) => {
    setTimeInClass(newValue);
  };
  const changeTargetLanguage = (e, newValue) => {
    setTargetLanguage(e.target.value);
  };

  const inputs = [
    {
      type: "text",
      label: "Title",
      multi: true,
      value: title,
      onChange: changeTitle,
      rows: 1,
    },
    {
      type: "text",
      label: "Objective",
      multi: true,
      value: objective,
      onChange: changeObjective,
      autoFocus: true,
      rows: 2,
    },
    {
      type: "text",
      label: "Target Language",
      multi: true,
      value: targetLanguage,
      onChange: changeTargetLanguage,
      rows: 2,
    },
    {
      type: "slider",
      label: "Time needed for preparation (minutes)",
      value: timePrep,
      onChange: changeTimePrep,
    },
    {
      type: "slider",
      label: "Time needed in class (minutes)",
      value: timeInClass,
      onChange: changeTimeInClass,
    },
  ];

  return (
    <Paper className={classes.paper}>
      {inputs.map((input, index) => {
        if (input.type === "text") {
          return (
            <TextField
              key={index}
              label={input.label}
              value={input.value}
              multiline={input.multi}
              rows={input.rows}
              onChange={input.onChange}
              fullWidth
              variant="outlined"
              className={classes.inputText}
            />
          );
        } else if (input.type === "slider") {
          // console.log(`value of ${input.label}: ${input.value}`)
          return (
            <div key={index}>
              <Typography gutterBottom> {input.label} </Typography>
              <Slider
                key={index}
                getAriaLabel={(index) =>
                  index === 0 ? "Minimum Minutes" : "Maximum Minutes"
                }
                value={input.value}
                valueLabelDisplay="on"
                step={5}
                className={classes.inputSlider}
                onChange={input.onChange}
                autoFocus={input.autoFocus}
                fullwidth="true"
              />
            </div>
          );
        } else {
          return null;
        }
      })}
      <Autocomplete
        id="combo-box-demo1"
        multiple
        value={curriculumValue}
        onChange={setCurriculumValue}
        options={curriculums}
        freeSolo={true}
        className={classes.inputAutocomplete}
        getOptionLabel={(option) => option.label}
        // style={{
        //   width: 600
        // }}
        fullwidth="true"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Curriculum"
            placeholder="IB, Cambridge etc."
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Autocomplete
        id="combo-box-demo1"
        multiple
        value={pupilTaskValue}
        onChange={setPupilTaskValue}
        options={pupilTasks}
        freeSolo={true}
        className={classes.inputAutocomplete}
        getOptionLabel={(option) => option.label}
        // style={{
        //   width: 600
        // }}
        fullwidth="true"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pupil Task"
            placeholder="Pair, group, individual etc."
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Autocomplete
        id="combo-box-demo2"
        multiple
        value={levelValue}
        onChange={setLevelValue}
        options={levels}
        freeSolo={true}
        getOptionLabel={(option) => option.label}
        className={classes.inputAutocomplete}
        // style={{
        //   width: 600
        // }}
        fullwidth="true"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Level"
            placeholder="Level 1, intermediate, first year etc."
            variant="outlined"
            fullWidth
          />
        )}
      />
      <FormControlLabel
        control={
          <Switch checked={share} onChange={changeShare} color="primary" />
        }
        label="Share your resource"
      />
    </Paper>
  );
};

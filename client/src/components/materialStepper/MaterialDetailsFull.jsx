import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
  },
  autoComplete: {
    paddingTop: 30,
    width: "100%",
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
  procedureBefore,
  setProcedureBefore,
  procedureIn,
  setProcedureIn,
  book,
  setBook,
  page,
  setPage,
  followUp,
  setFollowUp,
  variations,
  setVariations,
  materials,
  setMaterials,
  tips,
  setTips,
  notes,
  setNotes,
  languageFocus,
  languageFocusValue,
  setLanguageFocusValue,
  activityUse,
  activityUseValue,
  setActivityUseValue,
  category,
  categoryValue,
  setCategoryValue,
}) => {
  const classes = useStyles();
  const changeProcedureBefore = (e) => {
    setProcedureBefore(e.target.value);
  };

  const changeProcedureIn = (e) => {
    setProcedureIn(e.target.value);
  };

  const changeBook = (e) => {
    setBook(e.target.value);
  };

  const changePage = (e) => {
    setPage(e.target.value);
  };

  const changeFollowUp = (e, newValue) => {
    setFollowUp(e.target.value);
  };

  const changeVariations = (e, newValue) => {
    setVariations(e.target.value);
  };

  const changeMaterials = (e, newValue) => {
    setMaterials(e.target.value);
  };

  const changeTips = (e, newValue) => {
    setTips(e.target.value);
  };
  const changeNotes = (e, newValue) => {
    setNotes(e.target.value);
  };

  const inputs = [
    {
      type: "text",
      label: "Procedure before class",
      multi: true,
      rows: 4,
      value: procedureBefore,
      onChange: changeProcedureBefore,
      // placeholder: "eg. Copy handout for each pupil."
      autoFocus: true,
    },
    {
      type: "text",
      label: "Procedure in class",
      multi: true,
      rows: 4,
      value: procedureIn,
      onChange: changeProcedureIn,
    },
    {
      type: "text",
      label: "Is the resource based on a textbook?",
      value: book,
      multi: false,
      onChange: changeBook,
    },
    {
      type: "text",
      label: "What page of the textbook?",
      value: page,
      onChange: changePage,
    },
    {
      type: "text",
      label: "Follow up activities",
      value: followUp,
      multi: true,
      rows: 4,
      onChange: changeFollowUp,
    },
    {
      type: "text",
      label: "Variations",
      value: variations,
      multi: true,
      rows: 4,
      onChange: changeVariations,
      placeholder: "eg. For weaker students...",
    },
    {
      type: "text",
      label: "What materials do I need?",
      value: materials,
      multi: true,
      rows: 4,
      onChange: changeMaterials,
      placeholder: "eg. Finger puppet template, colour pencils etc.",
    },
    {
      type: "text",
      label: "tips",
      multi: true,
      rows: 4,
      value: tips,
      onChange: changeTips,
      placeholder: "eg. Completed worksheets for classroom display ",
    },
    {
      type: "text",
      label: "notes",
      multi: true,
      rows: 4,
      value: notes,
      onChange: changeNotes,
    },
  ];

  return (
    <Paper className={classes.paper}>
      <div className={classes.inputWrapper}>
        {inputs.map((input) => {
          if (input.type === "text") {
            return (
              <TextField
                className={classes.inputText}
                key={input.label}
                label={input.label}
                value={input.value}
                multiline={input.multi}
                rows={input.rows}
                onChange={input.onChange}
                placeholder={input.placeholder}
                fullWidth
                variant="outlined"
                autoFocus={input.autoFocus}
              />
            );
          } else {
            return null;
          }
        })}

        <Autocomplete
          className={classes.autoComplete}
          id="category"
          multiple
          className={classes.inputAutocomplete}
          fullWidth
          value={categoryValue}
          onChange={setCategoryValue}
          options={category}
          freeSolo={true}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="What institue is the material for?"
              variant="outlined"
              placeholder="School, language center etc."
              fullWidth
            />
          )}
        />
        <Autocomplete
          className={classes.autoComplete}
          id="language-focus"
          multiple
          className={classes.inputAutocomplete}
          fullWidth
          value={languageFocusValue}
          onChange={setLanguageFocusValue}
          options={languageFocus}
          freeSolo={true}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="What is the language focus?"
              placeholder="Speaking, Listening etc."
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Autocomplete
          className={classes.autoComplete}
          id="activity-use"
          multiple
          className={classes.inputAutocomplete}
          fullWidth
          value={activityUseValue}
          onChange={setActivityUseValue}
          options={activityUse}
          freeSolo={true}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="What is the activity use?"
              placeholder="Production, Presenetation etc."
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    </Paper>
  );
};

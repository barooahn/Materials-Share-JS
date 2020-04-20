import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 40
  },
  autoComplete: {
    paddingTop: 30,
    width: "100%"
  },
  paper: {
    width: "95%",
    margin: "20px auto",
    padding: "15px"
  },
  inputText: {
    width: "100%"
  }
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
  setCategoryValue
}) => {
  const classes = useStyles();
  const changeProcedureBefore = e => {
    setProcedureBefore(e.target.value);
  };

  const changeProcedureIn = e => {
    setProcedureIn(e.target.value);
  };

  const changeBook = e => {
    setBook(e.target.value);
  };

  const changePage = e => {
    setPage(e.target.value);
  };

  const changeFollowUp = (e, newValue) => {
    setFollowUp(newValue);
  };

  const changeVariations = (e, newValue) => {
    setVariations(newValue);
  };

  const changeMaterials = (e, newValue) => {
    setMaterials(newValue);
  };

  const changeTips = (e, newValue) => {
    setTips(newValue);
  };
  const changeNotes = (e, newValue) => {
    setNotes(newValue);
  };

  const inputs = [
    {
      type: "text",
      label: "Procedure before class (you can use multiple lines)",
      multi: true,
      value: procedureBefore,
      onChange: changeProcedureBefore,
      placeholder: "eg. Make one copy of the handout for each pupil."
    },
    {
      type: "text",
      label: "Procedure in class (you can use multiple lines)",
      multi: true,
      value: procedureIn,
      onChange: changeProcedureIn
    },
    {
      type: "text",
      label: "Is the resource based on a textbook?",
      value: book,
      onChange: changeBook
    },
    {
      type: "text",
      label: "What page of the textbook?",
      value: page,
      onChange: changePage
    },
    {
      type: "text",
      label: "Follow up activities (you can use multiple lines)?",
      value: followUp,
      onChange: changeFollowUp
    },
    {
      type: "text",
      label: "Variations on the material use (you can use multiple lines)?",
      value: variations,
      onChange: changeVariations,
      placeholder: "eg. For weaker students..."
    },
    {
      type: "text",
      label: "What materials do I need (you can use multiple lines)?",
      value: materials,
      onChange: changeMaterials,
      placeholder:
        "eg. Finger puppet template, colour pencils, scissors and tape."
    },
    {
      type: "text",
      label:
        "tips (you can use multiple lines) eg. Pupils can use the completed worksheets to make a classroom display",
      value: tips,
      onChange: changeTips,
      placeholder:
        "eg. Pupils can use the completed worksheets to make a classroom display "
    },
    {
      type: "text",
      label: "notes (you can use multiple lines)",
      value: notes,
      onChange: changeNotes
    }
  ];

  return (
    <Paper className={classes.paper}>
      <div className={classes.inputWrapper}>
        {inputs.map(input => {
          if (input.type === "text") {
            return (
              <TextField
                className={classes.inputText}
                key={input.label}
                label={input.label}
                value={input.value}
                onChange={input.onChange}
                placeholder={input.placeholder}
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
          value={categoryValue}
          onChange={setCategoryValue}
          options={category}
          freeSolo={true}
          getOptionLabel={option => option.label}
          renderInput={params => (
            <TextField
              {...params}
              label="What institue is the material for? - School, language center etc."
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Autocomplete
          className={classes.autoComplete}
          id="language-focus"
          multiple
          value={languageFocusValue}
          onChange={setLanguageFocusValue}
          options={languageFocus}
          freeSolo={true}
          getOptionLabel={option => option.label}
          renderInput={params => (
            <TextField
              {...params}
              label="What is the language focus of the resource? - Speaking, Listening etc."
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Autocomplete
          className={classes.autoComplete}
          id="activity-use"
          multiple
          value={activityUseValue}
          onChange={setActivityUseValue}
          options={activityUse}
          freeSolo={true}
          getOptionLabel={option => option.label}
          renderInput={params => (
            <TextField
              {...params}
              label="What is the activity use of the resource? - Production, Presenetation etc."
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    </Paper>
  );
};

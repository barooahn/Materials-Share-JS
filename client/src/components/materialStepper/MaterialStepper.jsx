import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MediaFiles from "./MediaFiles";
import MaterialDetails from "./MaterialDetails";
import { saveData } from "../../actions/materials-share-actions";
import MaterialDetailsFull from "./MaterialDetailsFull";
import { BrowserRouter as Router, useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function MaterialStepper() {
  const { id } = useParams();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //detail values
  const [files, setFiles] = React.useState([]);
  const [localFiles, setLocalFiles] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [levelValue, setLevelValue] = React.useState([]);
  const [dynamicLevels, setDynamicLevels] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState([]);
  const [dynamicCategory, setDynamicCategory] = React.useState([]);
  const [pupilTaskValue, setPupilTaskValue] = React.useState([]);
  const [dynamicPupilTask, setDynamicPupilTask] = React.useState([]);
  const [objective, setObjective] = React.useState("");
  const [timePrep, setTimePrep] = React.useState([20, 40]);
  const [timeInClass, setTimeInClass] = React.useState([20, 40]);
  const [procedureBefore, setProcedureBefore] = React.useState("");
  const [procedureIn, setProcedureIn] = React.useState("");
  const [book, setBook] = React.useState("");
  const [page, setPage] = React.useState("");
  const [followUp, setFollowUp] = React.useState("");
  const [variations, setVariations] = React.useState("");
  const [materials, setMaterials] = React.useState("");
  const [tips, setTips] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [activityUseValue, setActivityUseValue] = React.useState([]);
  const [dynamicActivityUse, setDynamicActivityUse] = React.useState([]);
  const [languageFocusValue, setLanguageFocusValue] = React.useState([]);
  const [dynamicLanguageFocus, setDynamicLanguageFocus] = React.useState([]);
  const [targetLanguage, setTargetLanguage] = React.useState("");
  const [share, setShare] = React.useState(true);
  const [type, setType] = React.useState("Create");

  React.useEffect(() => {
    //get all Materials from db setMaterials
    if (id !== undefined) {
      console.log("edit material - ", id);
      fetch(`/api/material/${id}`, {
        method: "GET"
      })
        .then(response => response.json())

        .then(resultData => {
          setFiles(resultData.files);
          setTitle(resultData.title);
          setLevelValue(resultData.level);
          setCategoryValue(resultData.category);
          setPupilTaskValue(resultData.pupilTask);
          setObjective(resultData.objective);
          setProcedureBefore(resultData.procedureBefore);
          setProcedureIn(resultData.procedureIn);
          setBook(resultData.book);
          setPage(resultData.page);
          setFollowUp(resultData.followUp);
          setVariations(resultData.variations);
          setMaterials(resultData.materials);
          setTips(resultData.tips);
          setNotes(resultData.notes);
          setActivityUseValue(resultData.activityUse);
          setLanguageFocusValue(resultData.languageFocus);
          setTargetLanguage(resultData.targetLanguage);
          setTimeInClass(resultData.timeInClass);
          setTimePrep(resultData.timePrep);
          setType("Edit");
        });
    }
  }, []);

  function getSteps() {
    return ["Add Media and Title", "Add details", "Complete material"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <MediaFiles
            files={files}
            setFiles={setFiles}
            localFiles={localFiles}
            setLocalFiles={setLocalFiles}
            type={type}
            title={title}
            setTitle={setTitle}
          />
        );
      case 1:
        return (
          <MaterialDetails
            title={title}
            setTitle={setTitle}
            levelValue={levelValue}
            setLevelValue={changeLevel}
            levels={dynamicLevels}
            objective={objective}
            setObjective={setObjective}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            timePrep={timePrep}
            setTimePrep={setTimePrep}
            timeInClass={timeInClass}
            setTimeInClass={setTimeInClass}
            pupilTasks={dynamicPupilTask}
            pupilTaskValue={pupilTaskValue}
            setPupilTaskValue={changePupilTask}
            share={share}
            setShare={setShare}
            type={type}
          />
        );
      case 2:
        return (
          <MaterialDetailsFull
            procedureIn={procedureIn}
            setProcedureIn={setProcedureIn}
            book={book}
            setBook={setBook}
            page={page}
            setPage={setPage}
            followUp={followUp}
            setFollowUp={setFollowUp}
            variations={variations}
            setVariations={setVariations}
            procedureBefore={procedureBefore}
            setProcedureBefore={setProcedureBefore}
            materials={materials}
            setMaterials={setMaterials}
            tips={tips}
            setTips={setTips}
            notes={notes}
            setNotes={setNotes}
            category={dynamicCategory}
            categoryValue={categoryValue}
            setCategoryValue={changeCategory}
            languageFocus={dynamicLanguageFocus}
            languageFocusValue={languageFocusValue}
            setLanguageFocusValue={changeLanguageFocus}
            activityUse={dynamicActivityUse}
            activityUseValue={activityUseValue}
            setActivityUseValue={changeActivityUse}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            type={type}
          />
        );
      default:
        return "Unknown step";
    }
  }

  const compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  const IsInObject = (value, resultArray) => {
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i]["value"] === value) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // do stuff here...
    //get allValues from db
    fetch(`/api/materials`, {
      method: "GET"
    })
      .then(response => response.json())

      .then(resultData => {
        //loop through each of the colums
        //loop through each material
        //see if the column is in the key of the material
        //if so add the key and value of the material to the resultsArray
        // add the results array to to the state

        const columns = [
          "level",
          "languageFocus",
          "activityUse",
          "pupilTask",
          "category"
        ];
        let resultArray = [];
        columns.forEach(column => {
          resultData.forEach(node => {
            if (node[column] !== null) {
              node[column].forEach(item => {
                if (!IsInObject(item.value, resultArray))
                  resultArray.push({
                    label: item.label,
                    value: item.value
                  });
              });
            }
          });
          resultArray.sort(compareValues("label"));
          //set state
          switch (column) {
            case "level":
              setDynamicLevels(resultArray);
              resultArray = [];
              break;
            case "languageFocus":
              setDynamicLanguageFocus(resultArray);
              resultArray = [];
              break;
            case "activityUse":
              setDynamicActivityUse(resultArray);
              resultArray = [];
              break;
            case "pupilTask":
              setDynamicPupilTask(resultArray);
              resultArray = [];
              break;
            case "category":
              setDynamicCategory(resultArray);
              resultArray = [];
              break;
            default:
              break;
          }
        });
      });
  }, []); // <-- empty dependency array

  const save = () => {
    //add , comments
    saveData({
      type,
      title,
      timeInClass,
      timePrep,
      procedureBefore,
      procedureIn,
      book,
      page,
      followUp,
      variations,
      tips,
      notes,
      files,
      localFiles,
      likes: [],
      objective,
      level: levelValue,
      languageFocus: languageFocusValue,
      activityUse: activityUseValue,
      pupilTask: pupilTaskValue,
      category: categoryValue,
      targetLanguage,
      materials,
      shared: share,
      id: id,
      dateModified: Date.now()
    });
  };

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
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography component={"span"} variant="caption">
                Optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={(localFiles.length == 0 || title === "") && !files}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>

              <Button
                disabled={(localFiles.length == 0 || title === "") && !files}
                variant="contained"
                color="secondary"
                onClick={save}
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

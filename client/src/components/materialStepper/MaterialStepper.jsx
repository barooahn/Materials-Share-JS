import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MediaFiles from "./MediaFiles";
import MaterialDetails from "./MaterialDetails";
import { SaveData, getMaterialId } from "../../actions/materials-share-actions";
import MaterialDetailsFull from "./MaterialDetailsFull";
import {
	BrowserRouter as Router,
	useParams,
	useHistory,
} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { SetAutocompletes } from "../helpers/SetAutocompletes";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginBottom: 70,
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	linearProgress: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function MaterialStepper() {
	const { id } = useParams();

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const [completed, setCompleted] = React.useState(0);
	const [saved, setSaved] = React.useState(false);
	const [openModelWarnings, setOpenModelWarnings] = React.useState(false);
	let history = useHistory();

	const steps = getSteps();

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (activeStep === 0) getDetailsAutoComplete();
		if (activeStep === 1) getFullDetailsAutoComplete();
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleOpenModelWarnings = () => {
		setOpenModelWarnings(true);
	};

	const handleCloseModelWarnings = () => {
		setOpenModelWarnings(false);
	};

	//detail values
	const [files, setFiles] = React.useState([]);
	const [thumb, setThumb] = React.useState("");
	const [localFiles, setLocalFiles] = React.useState([]);
	const [title, setTitle] = React.useState("");
	const [levelValue, setLevelValue] = React.useState([]);
	const [dynamicLevels, setDynamicLevels] = React.useState([]);
	const [curriculumValue, setCurriculumValue] = React.useState([]);
	const [dynamicCurriculums, setDynamicCurriculums] = React.useState([]);
	const [categoryValue, setCategoryValue] = React.useState([]);
	const [dynamicCategory, setDynamicCategory] = React.useState([]);
	const [pupilTaskValue, setPupilTaskValue] = React.useState([]);
	const [dynamicPupilTask, setDynamicPupilTask] = React.useState([]);
	const [objective, setObjective] = React.useState("");
	const [timePrep, setTimePrep] = React.useState(0);
	const [timeInClass, setTimeInClass] = React.useState(0);
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
	const [warnings, setWarnings] = React.useState([]);
	const [saveAnywayFlag, setSaveAnywayFlag] = React.useState(false);

	React.useEffect(() => {
		if (id !== undefined) {
			getMaterialId(id).then((resultData) => {
				setFiles(resultData.files);
				setThumb(resultData.thumb);
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
				setCurriculumValue(resultData.curriculum);
				setLanguageFocusValue(resultData.languageFocus);
				setTargetLanguage(resultData.targetLanguage);
				setTimeInClass(resultData.timeInClass);
				setTimePrep(resultData.timePrep);
				setType("Edit");
			});
		}
	}, [id]);

	React.useEffect(() => {
		if (warnings.length > 0) {
			setShare(false);
		}
	}, [warnings]);

	const getDetailsAutoComplete = async () => {
		const curriculum = await SetAutocompletes("curriculum");
		setDynamicCurriculums(curriculum);
		const level = await SetAutocompletes("level");
		setDynamicLevels(level);
		const pupilTask = await SetAutocompletes("pupilTask");
		setDynamicPupilTask(pupilTask);
	};

	const getFullDetailsAutoComplete = async () => {
		const languageFocus = await SetAutocompletes("languageFocus");
		setDynamicLanguageFocus(languageFocus);
		const activityUse = await SetAutocompletes("activityUse");
		setDynamicActivityUse(activityUse);
		const category = await SetAutocompletes("category");
		setDynamicCategory(category);
	};

	function getSteps() {
		return ["Add Media and Title", "Add details", "Complete material"];
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				// console.log("stepper calling mediaFiles...");
				return (
					<MediaFiles
						files={files}
						setFiles={setFiles}
						localFiles={localFiles}
						setLocalFiles={setLocalFiles}
						type={type}
						title={title}
						setTitle={setTitle}
						changeTitle={changeTitle}
					/>
				);
			case 1:
				// console.log("stepper calling MaterialDetails...");
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
						curriculums={dynamicCurriculums}
						curriculumValue={curriculumValue}
						setCurriculumValue={changeCurriculum}
						share={share}
						changeShare={changeShare}
						type={type}
					/>
				);
			case 2:
				// console.log("stepper calling MaterialDetailsFull...");
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

	const checkSave = () => {
		if ((checkMaterialDetails() && checkFilesTitle()) || saveAnywayFlag ) {
			save();
		} else {
			handleOpenModelWarnings();
		}
	};

	const checkFilesTitle = () => {
		console.log(
			"checkFilesTitle",
			localFiles.length !== 0 || files.length !== 0 || title !== ""
		);

		return localFiles.length !== 0 || files.length !== 0 || title !== "";
	};

	const checkMaterialDetails = () => {
		let warnings = 0;
		if (objective === "") {
			setWarnings((oldWarnings) => [...oldWarnings, "Objective"]);
			warnings++;
		}

		if (timePrep === 0) {
			setWarnings((oldWarnings) => [
				...oldWarnings,
				"Time needed for preperation",
			]);
			warnings++;
		}
		if (timeInClass === 0) {
			setWarnings((oldWarnings) => [
				...oldWarnings,
				"Time needed in class",
			]);
			warnings++;
		}

		if (levelValue.length === 0) {
			setWarnings((oldWarnings) => [...oldWarnings, "Level"]);
			warnings++;
		}

		console.log("warnings ++;", warnings === 0);
		return warnings === 0;
	};

	const addDetails = () => {
		handleCloseModelWarnings();
		setWarnings([]);
		setActiveStep(1);
	};

	const saveAnyway = () => {
		setSaveAnywayFlag(true);
		save();
	};

	const save = () => {
		console.log("share save", share);
		SaveData(
			{
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
				thumb,
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
				dateModified: Date.now(),
				curriculum: curriculumValue,
			},
			type,
			setCompleted,
			setSaved
		);
	};
	React.useEffect(() => {
		// console.log("materialstepper - saved: ", saved);
		if (saved) history.push("/profile");
	}, [saved, history]);

	const convertValue = (value) => {
		return value.replace(/\W/gi, "").trim().toLowerCase();
	};

	const optionChange = (value) => {
		//Check if value passed is object with title i.e. from db or a new item
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
	const changeCurriculum = (e, value) => {
		optionChange(value);
		setCurriculumValue(value);
	};

	const changeShare = (e) => {
		setShare(e.target.checked);
	};

	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					if (isStepOptional(index)) {
						labelProps.optional = (
							<Typography
								component={"span"}
								variant='caption'>
								Optional
							</Typography>
						);
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>
								{label}
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography
							component={"span"}
							className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
						<Button
							onClick={handleReset}
							className={classes.button}>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<Typography
							component={"span"}
							className={classes.instructions}>
							{getStepContent(activeStep)}
						</Typography>

						{completed > 0 ? (
							<div className={classes.linearProgress}>
								<Typography
									component={"span"}
									className={classes.instructions}>
									Saving ...
								</Typography>
								<LinearProgress color='secondary' />
								<br />
							</div>
						) : (
							<div></div>
						)}
						{title.length > 3 &&
						(localFiles.length > 0 || files.length > 0) ? (
							<div>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									className={classes.button}>
									Back
								</Button>
								{isStepOptional(activeStep) && (
									<Button
										variant='contained'
										color='primary'
										onClick={handleSkip}
										className={classes.button}>
										Skip
									</Button>
								)}
								{activeStep !== steps.length - 1 ? (
									<Button
										variant='contained'
										color='primary'
										onClick={handleNext}
										className={classes.button}
										disabled={
											(localFiles.length ===
												0 &&
												files.length ===
													0) ||
											title === ""
										}>
										Next
									</Button>
								) : null}
								<Button
									disabled={!checkFilesTitle()}
									variant='contained'
									color='secondary'
									onClick={checkSave}
									className={classes.button}>
									Save
								</Button>
							</div>
						) : null}
					</div>
				)}
			</div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={openModelWarnings}
				onClose={handleCloseModelWarnings}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={openModelWarnings}>
					<div className={classes.paper}>
						<h4 id='transition-modal-title'>
							Your resource does meet the minimum
							requirements to be shared
						</h4>
						<div>
							Please complete the following details to
							share your material:
						</div>
						<div id='transition-modal-description'>
							{warnings.map((warning, index) => (
								<p key={index}>{warning}</p>
							))}
						</div>
						<Button
							color='secondary'
							onClick={saveAnyway}
							variant='contained'
							className={classes.button}>
							Save Anyway
						</Button>
						<Button
							color='primary'
							onClick={addDetails}
							variant='contained'
							className={classes.button}>
							Add Details
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

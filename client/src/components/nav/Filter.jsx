import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Slider } from "@mui/material";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import Button from "@mui/material/Button";
import { useHistory, useLocation } from "react-router-dom";
import Mobile from "../helpers/mobile";

import Collapse from "@mui/material/Collapse";

import { SetAutocompletes } from "../helpers/SetAutocompletes";
import { getFilterResults } from "../../actions/materials-share-actions";
import Link from "@mui/material/Link";

const filterHeight = Mobile() ? "100vh" : "auto";
const filterWidth = Mobile() ? "100%" : "90%";

const useStyles = makeStyles((theme) => ({
	collapse: {
		display: "flex",
		flexDirection: "column",
		maxWidth: "100%",
		width: filterWidth,
		height: filterHeight + "!important",
		zIndex: 200,
		position: "fixed",
		top: "70px",
		padding: "10px",
		backgroundColor: "white",
	},
	filterItem: {
		marginBottom: 5,
		width: "90%",
		marginLeft: "auto",
		marginRight: "auto",
		zIndex: 2020,
	},
	filterButton: {
		marginBottom: 5,
		marginLeft: "5%",
	},
}));

const Filter = ({ expanded, setExpanded }) => {
	const classes = useStyles();

	const [timeInClassValue, setTimeInClassValue] = React.useState([0, 100]);
	const [timePrepValue, setTimePrepValue] = React.useState([0, 100]);
	const [levelValue, setLevelValue] = React.useState([]);
	const [curriculumValue, setCurriculumValue] = React.useState([]);
	const [categoryValue] = React.useState([]);
	const [languageFocusValue, setLanguageFocusValue] = React.useState([]);
	const [pupilTaskValue, setPupilTaskValue] = React.useState([]);
	const [activityUseValue, setActivityUseValue] = React.useState([]);

	const [, setDynamicCategory] = React.useState([]);
	const [dynamicLevels, setDynamicLevels] = React.useState([]);
	const [dynamicCurriculums, setDynamicCurriculums] = React.useState([]);
	const [dynamicPupilTask, setDynamicPupilTask] = React.useState([]);
	const [dynamicActivityUse, setDynamicActivityUse] = React.useState([]);
	const [dynamicLanguageFocus, setDynamicLanguageFocus] = React.useState([]);

	const [searchQuery, setSearchQuery] = React.useState("");

	const closeFilter = () => setExpanded(false);
	let history = useHistory();
	let location = useLocation();

	React.useEffect(() => {
		async function fetchData() {
			const level = await SetAutocompletes("level");
			setDynamicLevels(level);
			const curriculum = await SetAutocompletes("curriculum");
			setDynamicCurriculums(curriculum);
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

	const changeCurriculum = (e, value) => {
		optionChange(value);
		setCurriculumValue(value);
	};

	const changePupilTask = (e, value) => {
		optionChange(value);
		setPupilTaskValue(value);
	};

	// const changeCategory = (e, value) => {
	// 	optionChange(value);
	// 	setCategoryValue(value);
	// };

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
		const level = getValuesFromObjects(levelValue);
		const curriculum = getValuesFromObjects(curriculumValue);
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
			category,
			curriculum
		);
		if (results) {
			history.push({
				pathname: "/search",
				state: { searchResults: results, searchQuery: searchQuery },
			});
		}
	};

	return (
		<Collapse
			in={expanded}
			timeout='auto'
			unmountOnExit
			className={classes.collapse}>
			<div className={classes.filterItem}>
				<Typography id='range-slider' gutterBottom>
					Time in Class
				</Typography>
				<Slider
					value={timeInClassValue}
					onChange={handleTimeInClassValueChange}
					valueLabelDisplay='auto'
					aria-labelledby='range-slider'
					getAriaValueText={timeInClassValueText}
					step={5}
				/>
			</div>
			<div className={classes.filterItem}>
				<Typography id='range-slider' gutterBottom>
					Time for preparation
				</Typography>
				<Slider
					value={timePrepValue}
					onChange={handleTimePrepValueChange}
					valueLabelDisplay='auto'
					aria-labelledby='range-slider'
					getAriaValueText={timePrepValueText}
					step={5}
				/>
			</div>
			<div className={classes.filterItem}>
				<Autocomplete
					id='combo-box-demo1'
					multiple
					value={pupilTaskValue}
					onChange={changePupilTask}
					options={dynamicPupilTask}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => (
						<TextField
							{...params}
							label='What work will pupils do?'
							variant='outlined'
							fullWidth
						/>
					)}
				/>
			</div>
			<div className={classes.filterItem}>
				<Autocomplete
					id='combo-box-demo2'
					multiple
					value={levelValue}
					onChange={changeLevel}
					options={dynamicLevels}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Level'
							variant='outlined'
							fullWidth
						/>
					)}
				/>
			</div>
			<div className={classes.filterItem}>
				<Autocomplete
					id='combo-box-demo2'
					multiple
					value={curriculumValue}
					onChange={changeCurriculum}
					options={dynamicCurriculums}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Curriculum'
							variant='outlined'
							fullWidth
						/>
					)}
				/>
			</div>
			<div className={classes.filterItem}>
				<Autocomplete
					id='language-focus'
					multiple
					value={languageFocusValue}
					onChange={changeLanguageFocus}
					options={dynamicLanguageFocus}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Language focus'
							variant='outlined'
							fullWidth
						/>
					)}
				/>
			</div>
			<div className={classes.filterItem}>
				<Autocomplete
					id='activity-use'
					multiple
					value={activityUseValue}
					onChange={changeActivityUse}
					options={dynamicActivityUse}
					getOptionLabel={(option) => option.label}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Activity use'
							variant='outlined'
							fullWidth
						/>
					)}
				/>
			</div>
			<Button
				className={classes.filterButton}
				variant='outlined'
				onClick={goToResults}>
				Filter
			</Button>
			{searchQuery ? (
				<div>
					<Link href='#searchResults' onClick={closeFilter}>
						<Typography
							gutterBottom
							variant='body1'
							component='p'
							align='center'>
							Search for... "{searchQuery}" Results
							found...
							{location.state?.searchResults.length}
						</Typography>
					</Link>
				</div>
			) : (
				<div>
					<Link href='#searchResults' onClick={closeFilter}>
						<Typography
							gutterBottom
							variant='body1'
							component='p'
							align='center'>
							{location.state?.searchResults.length > 0
								? " Results found..." +
								  location.state?.searchResults.length
								: null}
						</Typography>
					</Link>
				</div>
			)}
		</Collapse>
	);
};
export default Filter;

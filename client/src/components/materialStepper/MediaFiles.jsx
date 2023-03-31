import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Viewer from "../Viewer/Viewer";

const allowedMimeTypes = [
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/pdf",
	"application/vnd.ms-powerpoint",
	"audio/mpeg",
	"audio/x-wav",
	"audio/mp3",
	"image/jpeg",
	"image/gif",
	"image/png",
	"video/mp4",
	"video/webm",
	"video/ogg",
];
const useStyles = makeStyles((theme) => ({
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	paper: {
		width: "95%",
		margin: "20px auto",
		padding: "15px",
	},
	mediaHeader: {},
}));

const MediaFiles = ({
	title,
	setTitle,
	files,
	setFiles,
	localFiles,
	setLocalFiles,
}) => {
	const [errorMsg, setErrorMsg] = useState("");
	const classes = useStyles();

	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleChange = (e) => {
		//   //validate mime type
		const reExtension = /(?:\.([^.]+))?$/;
		let files = Array.from(e.target.files);
		files.forEach((file) => {
			const ext = file.name.match(reExtension)[1].toLowerCase();
			if (ext === "docx" || allowedMimeTypes.includes(file.type)) {
				setErrorMsg("");
				setLocalFiles((media) => [
					...media,
					{ preview: URL.createObjectURL(file), raw: file },
				]);
			} else {
				setErrorMsg("This file type is not currently supported");
			}
		});
	};

	//to do refactor using action
	const handleDelete = (file) => {
		const fileNoPath = file.substring(
			"https://matshre-assets.s3.eu-west-2.amazonaws.com/".length
		);
		axios.delete("/api/material/file/delete", {
			data: { file: fileNoPath },
		})
			.then((res) => {
				const removed = [...files].filter((x) => x !== file);
				setFiles(removed);
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const handleDeleteLocal = (file) => {
		setLocalFiles(
			localFiles.filter((item) => item.raw.name !== file.raw.name)
		);
	};

	const localFilesRender = () => {
		return localFiles.map((file, index) => {
			const reExtension = /(?:\.([^.]+))?$/;
			const ext = file.raw.name.match(reExtension)[1].toLowerCase();
			return (
				<div className='attachement' key={file.preview}>
					<Viewer
						file={file.preview}
						ext={ext}
						key={file.preview}
						index={index}
					/>

					<Button
						color='secondary'
						onClick={() => handleDeleteLocal(file)}
						className={classes.button}
					>
						<DeleteForeverIcon /> Delete
					</Button>
				</div>
			);
		});
	};

	const existingFilesRender = () => {
		return files.map((file) => {
			const reExtension = /(?:\.([^.]+))?$/;
			const ext = file.match(reExtension)[1].toLowerCase();
			return (
				<div className='attachement' key={file}>
					<Viewer file={file} ext={ext} key={file} />
					<Button
						color='secondary'
						onClick={() => handleDelete(file)}
						className={classes.button}
					>
						<DeleteForeverIcon /> Delete
					</Button>
					<br />
				</div>
			);
		});
	};

	const renderMediaInput = () => {
		return (
			<React.Fragment>
				<Typography variant='h5' component={"span"}>
					Step 2: Upload files
				</Typography>
				<br />
				<br />
				<input
					accept='image/*, audio/*, video/*, .pdf, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
					id='contained-button-file'
					className='inputFile'
					multiple
					type='file'
					onChange={handleChange}
				/>
				{localFilesRender()}
				{existingFilesRender()}
				<br />
				<label htmlFor='contained-button-file'>
					<Button variant='contained' component='span'>
						Select Media
					</Button>
				</label>
			</React.Fragment>
		);
	};
	return (
		<Paper className={classes.paper}>
			<div className={classes.mediaHeader}>
				<Typography
					variant='h5'
					component={"span"}
					color='secondary'
				>
					{errorMsg}
				</Typography>
				<br />
				<Typography variant='h5' component={"span"}>
					Step 1: Title
				</Typography>
				<br />
				<br />
				<TextField
					key='Give your resource a title'
					label='Give your resource a title'
					value={title}
					onChange={changeTitle}
					margin='normal'
					autoFocus
					variant='outlined'
					fullWidth
				/>
			</div>

			<div className={classes.mediaBody}></div>

			{title.length > 3 && renderMediaInput()}

			<br />
			<br />
			{files.length > 0 ||
			(localFiles.length > 0 && title.length > 3) ? (
				<Typography variant='h6' component={"span"}>
					Choose what to do now...
				</Typography>
			) : null}
		</Paper>
	);
};
export default MediaFiles;

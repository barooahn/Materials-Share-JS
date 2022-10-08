import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import Viewer from "../Viewer/Viewer";
import SocialShare from "./SocialShare";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ToggleLikes from "../helpers/ToggleLikes";
import red from "@mui/material/colors/red";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import DeleteMaterial from "../helpers/DeleteMaterial";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import Mobile from "../helpers/mobile";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles((theme) => ({
	cardRoot: {
		position: "relative",
		overflow: "visible !important",
	},
	media: {
		height: 200,
		overflow: "hidden",
		position: "relative",
	},
	avatar: {
		backgroundColor: red[500] + "!important",
		position: "absolute !important",
		top: 0,
		right: 0,
		zIndex: 4,
		marginTop: "-7px",
		marginRight: "-7px",
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
	modalDeleteButtons: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	},
}));

export default function MaterialCard({
	material,
	setMaterials,
	materials,
	cardWidth,
	index,
}) {
	const classes = useStyles();
	const [likes, setLikes] = React.useState(material.likes || []);
	const [, setCompleted] = React.useState(0);
	const [, setSaved] = React.useState(false);

	//Delete model stuff

	const [deleteOpen, setDeleteOpen] = React.useState(false);

	const handleDeleteOpen = () => {
		setDeleteOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteOpen(false);
	};

	const handleDeleteMaterial = () => {
		handleDeleteOpen();
	};

	const cancelDelete = () => {
		setDeleteOpen(false);
	};

	const confirmDelete = () => {
		DeleteMaterial(material._id);
		setMaterials(materials.filter((m) => m._id !== material._id));
	};
	const author = localStorage.getItem("USER_ID");

	const toggleLikes = () => {
		ToggleLikes(
			author,
			likes,
			setLikes,
			material._id,
			setSaved,
			setCompleted
		);
	};

	const setLikesColour = () => {
		let color = "default";
		likes.forEach((like) => {
			if (like === author) {
				color = "secondary";
			}
		});
		return color;
	};

	//Share model stuff
	const [shareOpen, setShareOpen] = React.useState(false);
	const handleShareOpen = () => {
		setShareOpen(true);
	};

	const handleShareClose = () => {
		setShareOpen(false);
	};

	//set date
	const date = new Date(material.dateModified);
	const dateOptions = { year: "numeric", month: "long", day: "numeric" };
	const dateMod = date.toLocaleDateString(undefined, dateOptions);

	const thumb = material.thumb ? material.thumb : null;

	console.log("cardWidth", cardWidth);

	return (
		<React.Fragment>
			<Card className={classes.cardRoot} sx={{ width: { cardWidth } }}>
				<Avatar
					aria-label='material'
					alt={material.title}
					src={material.author_img}
					className={classes.avatar}
				/>
				<CardActionArea component='div'>
					<NavLink
						to={{ pathname: "/material/" + material.slug }}
						className='link'
						key='ma'
					>
						<div className={classes.media}>
							<Viewer
								thumb={thumb}
								file={material.files[0]}
								key={material.files[0] + Date.now()}
								index={index}
							/>
						</div>
						<CardContent>
							<Typography variant='h6' component='h6'>
								{material.title}
							</Typography>
							<Typography
								variant='body2'
								color='textSecondary'
								component='p'
							>
								{dateMod}
							</Typography>
							{material.objective ? (
								<Typography
									variant='body2'
									color='textSecondary'
									component='p'
								>
									{material.objective}
								</Typography>
							) : null}
						</CardContent>
					</NavLink>
				</CardActionArea>
				<CardActions disableSpacing>
					<Tooltip
						title={
							!author
								? "Login to add to likes"
								: "Add to likes"
						}
						placement='top'
					>
						<span>
							<IconButton
								aria-label='add to favorites'
								onClick={toggleLikes}
								color={setLikesColour()}
								disabled={!author}
							>
								<Badge
									color='default'
									badgeContent={likes.length}
								>
									<FavoriteIcon />
								</Badge>
							</IconButton>
						</span>
					</Tooltip>
					<Tooltip title='Share on social media' placement='top'>
						<span>
							<IconButton
								aria-label='share'
								onClick={handleShareOpen}
							>
								<ShareIcon />
							</IconButton>
						</span>
					</Tooltip>
					{author === material.author_id ? (
						<React.Fragment>
							<Tooltip
								title='Edit your material'
								placement='top'
							>
								<span>
									<IconButton
										component={Link}
										to={"/edit/" + material._id}
									>
										<EditIcon />
									</IconButton>
								</span>
							</Tooltip>
							<Tooltip
								title='Delete your material'
								placement='top'
							>
								<span>
									<IconButton
										onClick={(event) =>
											handleDeleteMaterial(
												event
											)
										}
									>
										<DeleteForeverIcon />
									</IconButton>
								</span>
							</Tooltip>
						</React.Fragment>
					) : null}
				</CardActions>
			</Card>

			<SocialShare
				handleShareClose={handleShareClose}
				shareOpen={shareOpen}
				slug={material.slug}
			/>
			<Modal
				open={deleteOpen}
				onClose={handleDeleteClose}
				aria-labelledby='Delete Confirm'
				aria-describedby='Confirmation of delete'
				className={classes.modal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={deleteOpen}>
					<div className={classes.paper}>
						<Typography
							variant='h6'
							color='secondary'
							component='p'
						>
							Are you sure you want to delete? This cannot
							be undone.
						</Typography>
						<br />
						<div className={classes.modalDeleteButtons}>
							<Button
								color='secondary'
								variant='contained'
								size='large'
								startIcon={<DeleteForeverIcon />}
								onClick={confirmDelete}
							>
								Delete
							</Button>
							<br />
							<Button
								color='primary'
								variant='contained'
								size='large'
								startIcon={<CancelIcon />}
								onClick={cancelDelete}
							>
								Cancel
							</Button>
						</div>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
}

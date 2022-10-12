import React, { Suspense } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Viewer from "../Viewer/Viewer";
import DisplayMaterialList from "./DisplayMaterialList";
import { useParams, useHistory, Link } from "react-router-dom";
import { getMaterial } from "../../actions/materials-share-actions";
import ToggleLikes from "../helpers/ToggleLikes";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import PrintIcon from "@mui/icons-material/Print";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import HelmetMetaData from "../helpers/HelmetMetaData";
import Transition from "../helpers/Transition";

const SocialShare = React.lazy(() => import("./SocialShare"));
const DeleteMaterial = React.lazy(() => import("./../helpers/DeleteMaterial"));
const Modal = React.lazy(() => import("@mui/material/Modal"));

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "100%",
		display: "flex",
	},
	paperCenter: {
		marginBottom: 50,
		paddingBottom: 20,
	},
	media: {
		padding: "10px",
		maxWidth: 1000,
		paddingBottom: 5,
		pageBreakBefore: "always",
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	modalDeleteButtons: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	},
	pageBreak: {
		pageBreakBefore: "always",
	},
}));

const Material = () => {
	const classes = useStyles();
	let history = useHistory();
	const { slug } = useParams();
	const [material, setMaterial] = React.useState([]);
	const [likes, setLikes] = React.useState(material.likes || []);
	const [, setCompleted] = React.useState(0);
	const [, setSaved] = React.useState(false);
	const [printPDF] = React.useState(false);
	const [, setPrintReady] = React.useState(false);
	const author = localStorage.getItem("USER_ID");

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
		history.push("/materials");
	};

	//Share model stuff
	const [shareOpen, setShareOpen] = React.useState(false);
	const handleShareOpen = () => {
		setShareOpen(true);
	};

	const handleShareClose = () => {
		setShareOpen(false);
	};

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

	const print = () => {
		window.print();
	};

	React.useEffect(() => {
		//get all Materials from db setMaterials\
		if (slug !== undefined) {
			getMaterial(slug).then((resultData) => {
				setMaterial(resultData[0]);
				//The line below causes error:
				//Can't perform a React state update on an unmounted component.
				//This is a no-op, but it indicates a memory leak in your application.
				//To fix, cancel all subscriptions and asynchronous tasks in a useEffect
				// cleanup function.

				//this line is dependent on materials
				//const [likes, setLikes] = React.useState(material.likes || []);
				setLikes(resultData[0].likes);
			});
		}
	}, [slug]);

	return (
		<Suspense fallback={<Transition />}>
			<HelmetMetaData
				title={"Materials Share-" + material.title}
				description={
					material.title +
					"ELT TEFL teaching materials and resources "
				}
				image={material.thumb}
			/>
			<Paper className={classes.paperCenter} elevation={1}>
				<Typography
					gutterBottom
					variant='h2'
					component='h2'
					align='center'
				>
					{material.title}
				</Typography>
				{/* <MetaTags>
					<title>{"Materials Share-" + material.title}</title>
					<meta
						name='description'
						content={
							material.title +
							"ELT TEFL teaching materials and resources "
						}
					/>
					<meta
						property='og:description'
						content={
							material.title +
							"ELT TEFL teaching materials and resources "
						}
					/>
					<meta
						property='og:title'
						content={"Materials Share - " + material.title}
					/>
					<meta property='og:image' content={material.thumb} />
					<meta
						property='og:url'
						content={window.location.href}
					/>
					<meta
						name='twitter:description'
						content={
							"ELT TEFL teaching materials and resources " +
							material.title
						}
					/>
					<meta
						name='twitter:title'
						content={"Materials Share - " + material.title}
					/>
				</MetaTags> */}

				<Box display='block' displayPrint='none'>
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
					<Tooltip
						title={!author ? "Login to print" : "Print"}
						placement='top'
					>
						<span>
							<IconButton
								aria-label='add to favorites'
								onClick={print}
								disabled={!author}
							>
								<PrintIcon />
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
					<SocialShare
						handleShareClose={handleShareClose}
						shareOpen={shareOpen}
						slug={material.slug}
					/>
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
											handleDeleteMaterial()
										}
									>
										<DeleteForeverIcon />
									</IconButton>
								</span>
							</Tooltip>
						</React.Fragment>
					) : null}
				</Box>

				<Box className={classes.media}>
					{material.files
						? material.files.map((file) => (
								<Viewer
									key={file + Date.now()}
									file={file}
									printPDF={printPDF}
									setPrintReady={setPrintReady}
								/>
						  ))
						: null}
				</Box>

				<div className={classes.pageBreak}>
					<Typography
						gutterBottom
						variant='h4'
						component='h4'
						align='center'
					>
						Teacher Notes
					</Typography>
					{DisplayMaterialList(material)}
					{material.book !== "" ? (
						<Grid item xs={12} md={6}>
							<Typography
								variant='h6'
								style={{ paddingLeft: 10 }}
								component='h6'
							>
								Material used in conjuction with text
								book
							</Typography>
							<Typography
								gutterBottom
								variant='body1'
								style={{
									padding: 10,
									whiteSpace: "pre-wrap",
								}}
								component='p'
							>
								{material.book}
								{" - Page " + material.page}
							</Typography>
						</Grid>
					) : null}
				</div>
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
								Are you sure you want to delete? This
								cannot be undone.
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
			</Paper>
		</Suspense>
	);
};
export default Material;

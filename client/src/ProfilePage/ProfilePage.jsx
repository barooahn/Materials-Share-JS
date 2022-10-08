import React from "react";
import Typography from "@mui/material/Typography";
// import { getSecret } from "../auth/helpers";
import { makeStyles } from "@mui/styles";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Mobile from "../components/helpers/mobile";
import MyMaterials from "./ProfileMyMaterials";
import MyLikes from "./ProfileLikedMaterials";

const useStyles = makeStyles((theme) => ({
	profilePage: {
		marginBottom: "70px",
		padding: 10,
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	circularProgress: {
		position: "absolute",
		top: "50%",
		left: "47%",
		zIndex: 50,
	},
	info: {
		textAlign: "center",
		margin: 10,
	},
	button: {
		marginRight: 10,
		color: "default",
	},
}));

const PageProfile = () => {
	const classes = useStyles();

	const [showLikes, setShowLikes] = React.useState(false);

	const id = localStorage.getItem("USER_ID");
	const cardWidth = Mobile() ? "100%" : 250;

	const limit = Mobile() ? 4 : 10;

	const handleMyLikes = () => {
		setShowLikes(true);
	};

	const handleMyMaterials = () => {
		setShowLikes(false);
	};

	return (
		<React.Fragment>
			<div className={classes.profilePage}>
				<Typography gutterBottom variant='h4' component='h1'>
					{localStorage.getItem("USER_NAME")}'s Profile
				</Typography>
				<Button
					variant='contained'
					// color='default'
					className={classes.button}
					onClick={handleMyMaterials}
					size='large'
					startIcon={
						<Avatar
							alt={localStorage.getItem("USER_NAME")}
							src={localStorage.getItem("USER_IMG")}
							className={(classes.orange, classes.small)}
						/>
					}
				>
					My Materials
				</Button>

				<Button
					variant='contained'
					// color='default'
					className={classes.button}
					onClick={handleMyLikes}
					size='large'
					startIcon={
						<FavoriteIcon
							fontSize='large'
							color='secondary'
						/>
					}
				>
					My Likes
				</Button>

				{showLikes ? (
					<MyLikes limit={limit} cardWidth={cardWidth} id={id} />
				) : (
					<MyMaterials
						limit={limit}
						cardWidth={cardWidth}
						id={id}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default PageProfile;

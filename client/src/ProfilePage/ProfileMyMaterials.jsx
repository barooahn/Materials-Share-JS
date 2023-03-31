import React from "react";
import Typography from "@mui/material/Typography";
import MaterialCard from "../components/Material/MaterialCard";
import Mobile from "../components/helpers/mobile";
import { makeStyles } from "@mui/styles";
import { getPaginatedUserMaterials } from "../actions/materials-share-actions";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";
import Masonry from "@mui/lab/Masonry";

const useStyles = makeStyles((theme) => ({
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
	myMaterialsText: {
		paddingTop: 20,
	},
	myMaterialsHeader: {
		paddingTop: 10,
		paddingBottom: 10,
	},
}));

const ProfileMyMaterials = (props) => {
	const classes = useStyles();

	const [gettingSearchResults, setGettingSearchResults] =
		React.useState(false);
	const [hasMore, setHasMore] = React.useState(true);
	const [error] = React.useState(false);
	const [page, setPage] = React.useState(0);
	const [totalMaterials, setTotalMaterials] = React.useState(0);
	const [userMaterials, setUserMaterials] = React.useState([]);

	const getWindowWidth = () => {
		if (typeof window !== "undefined") {
			return Math.round(window.innerWidth);
		}
	};

	const cardWidth = Mobile() ? getWindowWidth() - 20 : 350;

	const calculateColumns = () => {
		return Math.round(window.innerWidth / (cardWidth - 1));
	};
	const [calculatedColumns] = React.useState(calculateColumns());

	window.onscroll = debounce(() => {
		if (error || gettingSearchResults || !hasMore) return;

		const height =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight;

		let top =
			(document.documentElement &&
				document.documentElement.scrollTop) ||
			document.body.scrollTop;

		let offsetH =
			document.body.offsetHeight ||
			document.documentElement.offsetHeight;
		if (height + top >= offsetH) {
			if (userMaterials.length === totalMaterials) {
				setHasMore(false);
				return;
			} else {
				let nextpage = page + 1;
				setPage(nextpage);
				return;
			}
		}
	}, 300);

	React.useEffect(() => {
		async function fetchData() {
			let resultData = await getPaginatedUserMaterials(
				props.id,
				page,
				props.limit
			);
			if (resultData.materials) {
				setTotalMaterials(resultData.total);
				resultData.materials.map((material) => {
					material.files = Array.isArray(material.files)
						? [material.files[0]]
						: [material.files];
				});
				setUserMaterials([
					...userMaterials,
					...resultData.materials,
				]);
				setGettingSearchResults(false);
			}
		}

		setGettingSearchResults(true);
		fetchData();
	}, [page]);

	const MyMaterialsMasonryMemoized = React.memo(
		() => (
			<Masonry
				spacing={2}
				columns={calculatedColumns}
				sx={{
					maxWidth: Mobile() ? cardWidth : "100%",
					margin: 0,
				}}
			>
				{userMaterials.map((material, index) => (
					////////////// do not remove div - important to stop flashing bug
					<div>
						<MaterialCard
							key={material.title + Date.now()}
							material={material}
							setMaterials={setUserMaterials}
							materials={userMaterials}
							index={index}
						/>
					</div>
					////////////// do not remove div - important to stop flashing bug
				))}
			</Masonry>
		),
		[userMaterials]
	);

	return (
		<>
			{userMaterials.length >= 1 ? (
				<div className={classes.myMaterialsHeader}>
					{gettingSearchResults ? (
						<div className={classes.circularProgress}>
							<CircularProgress
								size={40}
								color='secondary'
							/>
						</div>
					) : null}
					<Typography gutterBottom variant='h5' component='h5'>
						Materials I Have Made
					</Typography>

					<MyMaterialsMasonryMemoized />
					{error && (
						<div
							className={classes.info}
							style={{ color: "#900" }}
						>
							{error}
						</div>
					)}
					{gettingSearchResults && (
						<div className={classes.info}>Loading...</div>
					)}
					{!hasMore && (
						<div className={classes.info}>
							You did it! You reached the end!
						</div>
					)}
				</div>
			) : (
				<div className={classes.myMaterialsText}>
					<Typography gutterBottom variant='body1'>
						Add or like resources to see them here
					</Typography>
				</div>
			)}
		</>
	);
};
export default ProfileMyMaterials;

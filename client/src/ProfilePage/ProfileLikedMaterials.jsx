import React, { useState } from "react";
import Typography from "@mui/material/Typography";
// import { getSecret } from "../auth/helpers";
import MaterialCard from "../components/Material/MaterialCard";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@mui/styles";
import { getUserLikes } from "../actions/materials-share-actions";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";

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
	likedMaterialsHeader: {
		paddingTop: 10,
		paddingBottom: 10,
	},
}));

export default (props) => {
	const classes = useStyles();
	const [userMaterials, setUserMaterials] = useState([]);
	const [userLikes, setUserLikes] = useState([]);
	const [gettingSearchResults, setGettingSearchResults] =
		React.useState(false);
	const [hasMore, setHasMore] = React.useState(true);
	const [error, setError] = React.useState(false);
	const [page, setPage] = React.useState(0);
	const [totalMaterials, setTotalMaterials] = React.useState(0);

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
			if (userLikes.length === totalMaterials) {
				setHasMore(false);
				return;
			} else {
				let nextpage = page + 1;
				setPage(nextpage);
			}
		}
	}, 300);

	React.useEffect(() => {
		async function fetchData() {
			const resultData = await getUserLikes(
				props.id,
				page,
				props.limit
			);
			if (resultData.materials) {
				setTotalMaterials(resultData.total);
				await resultData.materials.map((material) => {
					material.files = Array.isArray(material.files)
						? [material.files[0]]
						: [material.files];
				});
				setUserLikes([...userLikes, ...resultData.materials]);
				setGettingSearchResults(false);
			}
		}
		setGettingSearchResults(true);
		fetchData();
	}, [page]);

	return (
		<div className={classes.likedMaterialsHeader}>
			{gettingSearchResults ? (
				<div className={classes.circularProgress}>
					<CircularProgress size={40} color='secondary' />
				</div>
			) : null}
			<Typography gutterBottom variant='h5' component='h5'>
				Materials I Like
			</Typography>

			<StackGrid
				columnWidth={props.cardWidth}
				gutterWidth={5}
				gutterHeight={10}
			>
				{userLikes.map((material, index) => (
					////////////// do not remove div - important to stop flashing bug
					<div>
						<MaterialCard
							material={material}
							setMaterials={setUserMaterials}
							materials={userMaterials}
							index={index}
							key={material.title + Date.now()}
						/>
					</div>
					////////////// do not remove div - important to stop flashing bug
				))}
			</StackGrid>
			{gettingSearchResults && (
				<div className={classes.info}>Loading...</div>
			)}
			{!hasMore && (
				<div className={classes.info}>
					You did it! You reached the end!
				</div>
			)}
		</div>
	);
};

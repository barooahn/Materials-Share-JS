import React from "react";
import MaterialCard from "./Material/MaterialCard";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";
import { makeStyles } from "@mui/styles";
import { getPaginatedIBMaterials } from "../actions/materials-share-actions";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";
import Mobile from "./helpers/mobile";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: "70px",
		[theme.breakpoints.down("md")]: {
			marginLeft: "10px",
		},
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
}));

const Ibmyp = () => {
	const classes = useStyles();
	const [materials, setMaterials] = React.useState([]);
	const [gettingSearchResults, setGettingSearchResults] =
		React.useState(false);
	const [page, setPage] = React.useState(0);
	const [totalMaterials, setTotalMaterials] = React.useState(0);
	const [hasMore, setHasMore] = React.useState(true);
	const [error] = React.useState(false);

	const getWindowWidth = () => {
		if (typeof window !== "undefined") {
			return Math.round(window.innerWidth);
		}
	};

	const cardWidth = Mobile() ? getWindowWidth() - 20 : 350;

	const calculateColumns = () => {
		return Math.round(window.innerWidth / (cardWidth - 1));
	};
	const [calculatedColumns, setCalculatedColumns] = React.useState(
		calculateColumns()
	);

	const limit = Mobile() ? 4 : 10;

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
			if (materials.length === totalMaterials) {
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
			let resultData = await getPaginatedIBMaterials(page, limit);
			if (resultData.total !== undefined) {
				setTotalMaterials(resultData.total);
				await resultData.materials.forEach((material) => {
					material.files = Array.isArray(material.files)
						? [material.files[0]]
						: [material.files];
				});
				setMaterials([...materials, ...resultData.materials]);
				setGettingSearchResults(false);
			} else {
				setGettingSearchResults(false);
			}
		}
		setGettingSearchResults(true);
		fetchData();
	}, [page]);

	React.useEffect(() => {
		const debouncedHandleResize = debounce(
			function handleResize() {
				setCalculatedColumns(calculateColumns());
			},
			100,
			false
		);

		window.addEventListener("resize", debouncedHandleResize);
		return () => {
			window.removeEventListener("resize", debouncedHandleResize);
		};
	}, []);

	const MasonryMemoized = React.memo(
		() => (
			<Masonry
				spacing={2}
				columns={calculatedColumns}
				sx={{
					maxWidth: Mobile() ? cardWidth : "100%",
					margin: 0,
				}}
			>
				{materials.map((material, index) => (
					<MaterialCard
						key={material._id + index}
						material={material}
						index={index}
						setMaterials={setMaterials}
						cardWidth={cardWidth}
						materials={materials}
					/>
				))}
			</Masonry>
		),
		[materials]
	);

	return (
		<div className={classes.root}>
			{gettingSearchResults ? (
				<div className={classes.circularProgress}>
					<CircularProgress size={40} color='secondary' />
				</div>
			) : null}
			<Typography
				gutterBottom
				variant='h2'
				component='h2'
				align='center'
			>
				Teaching Resources
			</Typography>

			<MasonryMemoized />
			{error && (
				<div className={classes.info} style={{ color: "#900" }}>
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
	);
};

export default Ibmyp;

import React from "react";
import { useLocation } from "react-router-dom";
import MaterialCard from "../Material/MaterialCard";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";
import Mobile from "../helpers/mobile";
import Button from "@mui/material/Button";

const SearchResults = () => {
	let location = useLocation();

	const [materials, setMaterials] = React.useState([]);

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

	React.useEffect(() => {
		if (location.state?.searchResults.length > 0) {
			let resultData = location.state.searchResults;

			resultData.forEach((material) => {
				material.files = Array.isArray(material.files)
					? [material.files[0]]
					: [material.files];
			});

			setMaterials(resultData);
		}
	}, [location.state]);

	const MaterialsMasonryMemoized = React.memo(
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
						key={material._id}
						material={material}
						index={index}
						setMaterials={setMaterials}
						materials={materials}
					/>
				))}
			</Masonry>
		),
		[materials]
	);

	return (
		<React.Fragment>
			<Typography
				gutterBottom
				variant='h3'
				component='h3'
				align='center'
				name='searchResults'
			>
				Search Results
			</Typography>
			{materials.length > 0 ? (
				<React.Fragment>
					<Typography
						gutterBottom
						variant='body1'
						component='p'
						align='center'
					>
						Results found {materials.length}
					</Typography>
					<MaterialsMasonryMemoized />
				</React.Fragment>
			) : (
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						gutterBottom
						variant='body1'
						component='p'
						align='center'
					>
						Sorry there are no results
					</Typography>
					<Button
						variant='contained'
						href='/materials'
						color='primary'
						style={{
							// width: 145,
							marginTop: 15,
						}}
					>
						All materials
					</Button>
				</div>
			)}
		</React.Fragment>
	);
};
export default SearchResults;

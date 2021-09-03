import React, { useEffect, useState } from "react";
import { getAllMaterials } from "../actions/materials-share-actions";

import { makeStyles } from "@material-ui/core/styles";

import Mobile from "../components/helpers/mobile";
import MaterialsAwaitingApproval from "./MaterialsAwaitingApproval";
import MaterialsCount from "./MaterialsCount";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: "70px",
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

const AdminPage = () => {
	const classes = useStyles();
	const [allMaterials, setAllMaterials] = useState([]);
	const [gettingSearchResults, setGettingSearchResults] = useState(false); 
	const [totalMaterials, setTotalMaterials] = useState();

	const limit = Mobile() ? 4 : 10;
	useEffect(() => {
		async function fetchData() {
			let resultData = await getAllMaterials();
			setTotalMaterials(resultData.materials.length);
			await resultData.materials.forEach((material) => {
				material.files = Array.isArray(material.files)
					? [material.files[0]]
					: [material.files];
			});
			setAllMaterials([...allMaterials, ...resultData.materials]);
			setGettingSearchResults(false);
		}
		setGettingSearchResults(true);
		fetchData();
	}, []);

	return (
		<div>
			<MaterialsCount count={totalMaterials}></MaterialsCount>
			<MaterialsAwaitingApproval
				materials={allMaterials}
				setMaterials={setAllMaterials}></MaterialsAwaitingApproval>
		</div>
	);
};

export default AdminPage;

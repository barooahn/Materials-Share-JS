import React, { useEffect, useState } from "react";
import MaterialCard from "../components/Material/MaterialCard";
import Typography from "@material-ui/core/Typography";
import StackGrid from "react-stack-grid";
import { makeStyles } from "@material-ui/core/styles";
import { editMaterial } from "../actions/materials-share-actions";

import Mobile from "../components/helpers/mobile";
import Button from "@material-ui/core/Button";
// import material from "../../../server/routes/material";

const useStyles = makeStyles((theme) => ({
	awatingApproval: {
		marginBottom: "70px",
	},
	info: {
		textAlign: "center",
		margin: 10,
	},
}));

const MaterialsAwaitingApproval = (props) => {
	const classes = useStyles();
	const [saved, setSaved] = useState(false);
	const [toApproveMaterials, setToApproveMaterials] = useState([]);

	const cardWidth = Mobile() ? "100%" : 250;

	const handleApprove = (material) => {
		material.approved = true;
		material.id = material._id;
		editMaterial(material, setSaved);
		console.log("approved", material, saved);
	};
	const handleBan = (material) => {
		material.approved = false;
		material.id = material._id;
		editMaterial(material, setSaved);
		console.log("banned", material, saved);
	};

	useEffect(() => {
		async function fetchData() {
			setToApproveMaterials([]);
			if (props.materials.length > 0) {
				await props.materials.map((material) => {
					if (!material.approved) {
						setToApproveMaterials((toApproveMaterials) => [
							...toApproveMaterials,
							material,
						]);
					}
				});
			}
		}
		fetchData();
	}, [props]);

	return (
		<div className={classes.awatingApproval}>
			<Typography
				gutterBottom
				variant='h2'
				component='h2'
				align='center'>
				Awaiting Approval
			</Typography>
			<StackGrid
				columnWidth={cardWidth}
				gutterWidth={10}
				gutterHeight={10}>
				{toApproveMaterials.map((material, index) => (
					<div key={`card-${index}`}>
						<MaterialCard
							key={material._id}
							material={material}
							index={index}
							setMaterials={props.setMaterials}
							materials={props.materials}
						/>
						<Button
							key={`approve-${index}`}
							variant='contained'
							color='default'
							className={classes.button}
							onClick={() => handleApprove(material)}
							size='large'>
							Approve
						</Button>
						<Button
							key={`ban-${index}`}
							variant='contained'
							color='default'
							className={classes.button}
							onClick={() => handleBan(material)}
							size='large'>
							Ban
						</Button>
					</div>
				))}
			</StackGrid>
		</div>
	);
};

export default MaterialsAwaitingApproval;

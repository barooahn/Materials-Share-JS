import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: "70px",
	},
}));

const MaterialsCount = (props) => {
	return <div>Total Materials: {props.count}</div>;
};

export default MaterialsCount;

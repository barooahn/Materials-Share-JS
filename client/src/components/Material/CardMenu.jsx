import React from "react";
import { withStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavLink } from "react-router-dom";
import DeleteMaterial from "../helpers/DeleteMaterial";

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		"&:focus": {
			backgroundColor: theme.palette.primary.main,
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function CustomizedMenus({ material, setMaterials, materials }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteMaterial = () => {
		DeleteMaterial(material._id);
		setMaterials(materials.filter((m) => m._id !== material._id));
	};

	return (
		<div>
			<IconButton
				aria-label='more'
				aria-controls='long-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<NavLink
					className='link'
					to={{ pathname: "/edit/" + material._id }}
				>
					<StyledMenuItem>
						<ListItemIcon>
							<EditIcon fontSize='small' />
						</ListItemIcon>
						<ListItemText primary='Edit' />
					</StyledMenuItem>
				</NavLink>
				<StyledMenuItem
					onClick={(event) => handleDeleteMaterial(event)}
				>
					<ListItemIcon>
						<DeleteForeverIcon fontSize='small' />
					</ListItemIcon>
					<ListItemText primary='Delete' />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}

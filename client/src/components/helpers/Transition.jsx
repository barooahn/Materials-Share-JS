import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Transition() {
	return (
		<Box
			sx={{
				display: "flex",
				position: "absolute",
				top: "65px",
				width: "100%",
				height: "100vh",
				backgroundColor: "rgba(255,255,255,0.8)",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<CircularProgress size={160} thickness={2} />
			<Typography
				variant={"h6"}
				sx={{ p: 2, color: "text.secondary" }}
			>
				Loading
			</Typography>
		</Box>
	);
}

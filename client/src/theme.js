import { createTheme } from "@mui/material/styles";
import red from "@mui/material/colors/red";
const theme = createTheme({
	typography: {
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
	overrides: {
		MuiButton: {
			containedPrimary: {
				color: "#ffffff !important",
			},
		},
	},
	palette: {
		primary: {
			main: "#4076d8",
		},
		secondary: {
			main: red[500],
		},
	},
});

theme.typography.h1 = {
	fontFamily: ["Poppins", "sans-serif"].join(","),
	fontSize: "1.4rem",
	fontWeight: 600,
	"@media (min-width:600px)": {
		fontWeight: 400,
		fontSize: "2.5rem",
	},
	[theme.breakpoints.up("md")]: {
		fontSize: "2.5rem",
	},
};
theme.typography.h3 = {
	// fontSize: "1.1rem",
	fontWeight: 400,
	"@media (min-width:600px)": {
		// fontSize: "1.3rem",
	},
	[theme.breakpoints.up("md")]: {
		fontSize: "1.5rem",
	},
};

theme.typography.body1 = {
	fontFamily: ["Poppins", "sans-serif"].join(","),
	// fontSize: "1.5rem",
	fontWeight: 400,
};
theme.typography.body2 = {
	fontFamily: ["Poppins", "sans-serif"].join(","),
	// fontSize: "1.1rem",
	fontWeight: 400,
};

export default theme;

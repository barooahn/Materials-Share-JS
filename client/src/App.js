import React, { Component } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import red from "@mui/material/colors/red";
// import theme from "./theme";
import Materials from "./components/Material/Materials";

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Materials />
			</div>
		);
	}
}

export default App;

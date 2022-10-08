import React, { Component } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Materials from "./components/Material/Materials";

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='App'>
					<Materials />
				</div>
			</ThemeProvider>
		);
	}
}

export default App;

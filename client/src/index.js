import React, { Suspense, lazy } from "react";
import "./index.css";
import App from "./App";
import Notfound from "./components/NotFound";
import NavBar from "./components/nav/NavBar";
import MobileNavBar from "./components/nav/MobileNavBar";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Mobile from "./components/helpers/mobile";
import HelmetMetaData from "./components/helpers/HelmetMetaData";
import Transition from "./components/helpers/Transition";
import ReactGA from "react-ga4";
import { createRoot } from "react-dom/client";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { register } from "./serviceWorkerRegistration";
import Axios from "axios";

const MaterialStepper = lazy(() =>
	import("./components/materialStepper/MaterialStepper")
);
const ProfilePage = lazy(() => import("./ProfilePage/ProfilePage"));
const Help = lazy(() => import("./components/Help"));
const Ibmyp = lazy(() => import("./components/Ibmyp"));
const Login = lazy(() => import("./LoginPage/Login"));
const Register = lazy(() => import("./RegisterPage/Register2"));
const Material = lazy(() => import("./components/Material/Material"));
const HomeLayout = lazy(() => import("./components/home/HomeLayout"));
const Users = lazy(() => import("./components/Users"));
const SearchResults = lazy(() => import("./components/nav/SearchResults"));
const ResetPassword = lazy(() => import("./LoginPage/ResetPassword"));
const ForgotPassword = lazy(() => import("./LoginPage/ForgotPassword"));

const jwtToken = localStorage.getItem("JWT_TOKEN");
Axios.defaults.headers.common["Authorization"] = jwtToken;

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem("JWT_TOKEN") ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { prevPath: rest.name },
					}}
				/>
			)
		}
	/>
);

function withProps(Component, props) {
	return function (matchProps) {
		return <Component {...props} {...matchProps} />;
	};
}

const routePaths = () => {
	return (
		<Suspense fallback={<Transition />}>
			<HelmetMetaData></HelmetMetaData>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/users' component={Users} />
				<Route path='/about' component={HomeLayout} />
				<Route path='/material/:slug' component={Material}></Route>
				<PrivateRoute
					path='/create'
					name='create'
					component={MaterialStepper}
				/>
				<Route path='/help' component={Help} />
				<Route path='/ibmyp' component={Ibmyp} />
				<Route path='/privacy' component={PrivacyPolicy} />
				<Route
					path='/login'
					component={withProps(Login, {
						state: { prevPath: "login" },
					})}
				/>
				<Route path='/forgotPassword' component={ForgotPassword} />
				<Route path='/reset/:token' component={ResetPassword} />
				<Route
					path='/register'
					component={withProps(Register, {
						state: { prevPath: "register" },
					})}
				/>
				<Route path='/search' component={SearchResults} />
				<PrivateRoute
					path='/profile'
					name='profile'
					component={ProfilePage}
				/>
				<PrivateRoute
					path='/edit/:id'
					name='editMaterial'
					type='edit'
					component={MaterialStepper}
				/>

				<Route component={Notfound} />
			</Switch>
		</Suspense>
	);
};

const nav = Mobile() ? (
	<MobileNavBar routePaths={routePaths()} />
) : (
	<NavBar routePaths={routePaths()} />
);

const TRACKING_ID = "G-6VW77FWXTJ";

ReactGA.initialize(TRACKING_ID);
ReactGA.send("pageview");
const root = createRoot(document.getElementById("root"));

root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Router>
			<React.Fragment>{nav}</React.Fragment>
		</Router>
	</ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
register();

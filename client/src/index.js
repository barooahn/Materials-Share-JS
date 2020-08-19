import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Notfound from "./components/NotFound";
import NavBar from "./components/nav/NavBar";
import MobileNavBar from "./components/nav/MobileNavBar";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Mobile from "./components/helpers/mobile";
import GA from "./components/helpers/GoogleAnalytics";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Axios from "axios";

const MaterialStepper = lazy(() =>
  import("./components/materialStepper/MaterialStepper")
);
const ProfilePage = lazy(() => import("./ProfilePage/ProfilePage"));
const Help = lazy(() => import("./components/Help"));
const Login = lazy(() => import("./LoginPage/Login"));
const Register = lazy(() => import("./RegisterPage/Register2"));
const Material = lazy(() => import("./components/Material/Material"));
const Materials = lazy(() => import("./components/Material/Materials"));
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
    <main>
      <Suspense
        fallback={<div style={{ textAlign: "center" }}>Loading...</div>}
      >
        {GA.init() && <GA.RouteTracker />}
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/users" component={Users} />
          <Route path="/materials" component={Materials} />
          <Route path="/material/:slug" component={Material}></Route>
          <PrivateRoute
            path="/create"
            name="create"
            component={MaterialStepper}
          />
          <Route path="/help" component={Help} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route
            path="/login"
            component={withProps(Login, { state: { prevPath: "login" } })}
          />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <Route
            path="/register"
            component={withProps(Register, { state: { prevPath: "register" } })}
          />
          <Route path="/search" component={SearchResults} />
          <PrivateRoute
            path="/profile"
            name="profile"
            component={ProfilePage}
          />
          <PrivateRoute
            path="/edit/:id"
            name="editMaterial"
            type="edit"
            component={MaterialStepper}
          />
          <Route component={Notfound} />
        </Switch>
      </Suspense>
    </main>
  );
};

const nav = Mobile() ? (
  <MobileNavBar routePaths={routePaths()} />
) : (
  <NavBar routePaths={routePaths()} />
);

const routing = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <React.Fragment>{nav}</React.Fragment>
    </Router>
  </ThemeProvider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

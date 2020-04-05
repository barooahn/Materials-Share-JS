import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Materials from "./components/Material/Materials";
import Users from "./components/Users";
// import UserForm from "./components/UserForm";
import Notfound from "./components/NotFound";
import NavBar2 from "./components/NavBar2";
import Help from "./components/Help";
import Login from "./LoginPage/Login2";
import Register from "./RegisterPage/Register2";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Stepper from "./components/materialStepper/MaterialStepper";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import ProfilePage from "./ProfilePage/ProfilePage";
import Axios from "axios";
import EditHome from "./components/Edit/EditHome";
import MaterialStepper from "./components/materialStepper/MaterialStepper";

//routes

//Home
//login
//register
//material list
//material/:id view
//user/:id  - auth route
//create  - auth route

const jwtToken = localStorage.getItem("JWT_TOKEN");
Axios.defaults.headers.common["Authorization"] = jwtToken;
//Axios.defaults.baseURL = 'https://api.example.com';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("JWT_TOKEN") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { prevPath: rest.name }
          }}
        />
      )
    }
  />
);

function withProps(Component, props) {
  return function(matchProps) {
    return <Component {...props} {...matchProps} />;
  };
}

const routing = (
  <Router>
    <React.Fragment>
      <NavBar2 />

      <main>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/users" component={Users} />
          <Route path="/materials" component={Materials} />
          <PrivateRoute path="/create" name="create" component={Stepper} />
          <Route path="/help" component={Help} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route
            path="/login"
            component={withProps(Login, { state: { prevPath: "login" } })}
          />
          <Route
            path="/register"
            component={withProps(Register, { state: { prevPath: "register" } })}
          />
          <PrivateRoute
            path="/profile"
            name="profile"
            component={ProfilePage}
          />
          <PrivateRoute
            path="/edit/:id"
            name="editMaterial"
            type="Edit"
            component={MaterialStepper}
          />
          <Route component={Notfound} />
        </Switch>
      </main>
    </React.Fragment>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

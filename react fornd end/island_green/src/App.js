import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import { setCurrentUser} from './action/authAction';


const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register"),
  loading
});



if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decode = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decode));
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
         
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route exact path="/" name="Home" component={DefaultLayout} />

          <Route exact path="/dashboard" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;

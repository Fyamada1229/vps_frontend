import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./page/Login";
import Home from "./page/Home";
import New from "./page/New";
import NewConfrim from "./page/NewConfrim";
import Product from "./page/Product";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import reducers from "./reducers/store";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import PrivateRoute from "./PrivateRoute";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
console.log(store.getState());
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/product" component={Product} isPublic />
        <PrivateRoute exact path="/" component={App} isPublic />
        <PrivateRoute exact path="/login" component={Login} isPublic />
        <PrivateRoute exact path="/new" component={New} isPublic />
        <PrivateRoute
          exact
          path="/new_confrim"
          component={NewConfrim}
          isPublic
        />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./page/Login";
import Home from "./page/Home";
import New from "./page/New";
import NewConfrim from "./page/NewConfrim";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import reducers from "./reducers/store";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/new" component={New} />
        <Route exact path="/new_confrim" component={NewConfrim} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

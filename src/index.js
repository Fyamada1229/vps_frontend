import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./page/Login";
import Home from "./page/Home";
import New from "./page/New";
import NewConfrim from "./page/NewConfrim";
import Product from "./page/Product";
import Admin from "./page/Admin";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Switch } from "react-router-dom";
import { createRoot } from "react-dom/client";
import PrivateRoute from "./PrivateRoute";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/store";
import { PersistGate } from "redux-persist/integration/react"; // 追加

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer, // ここを修正
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store); // この行を追加

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
          <PrivateRoute path="/Admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import Login from "./page/Login";
import Home from "./page/Home";
import New from "./page/New";
import NewConfrim from "./page/NewConfrim";
import Admin from "./page/Admin";
import UserShow from "./page/UserShow";
import AdminNew from "./page/AdminNew";
import AdminEdit from "./page/AdminEdit";
import AdminEditConfrim from "./page/AdminNewConfrim";
import reportWebVitals from "./reportWebVitals";
import AdminStaffAttendance from "./page/AdminStaffAttendance";
import AdminStaffAttendanceShow from "./page/AdminStaffAttendanceShow";
import AdminStaffAttendanceShowEdit from "./page/AdminStaffAttendanceShowEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
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
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          {/* <PrivateRoute exact path="/" component={App} isPublic /> */}
          <Redirect exact from="/" to="/login" />
          <PrivateRoute exact path="/login" component={Login} isPublic />
          <PrivateRoute path="/new" component={New} isPublic />
          <PrivateRoute
            exact
            path="/new_confrim"
            component={NewConfrim}
            isPublic
          />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/user_show" component={UserShow} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/admin_new" component={AdminNew} />
          <PrivateRoute
            path="/adimn_new_confrim"
            component={AdminEditConfrim}
          />
          <PrivateRoute
            path="/admin_staff_attendance"
            component={AdminStaffAttendance}
          />
          <PrivateRoute
            path="/admin_staff_attendance_show/:id"
            component={AdminStaffAttendanceShow}
          />
          <PrivateRoute
            path="/admin_staff_attendance_edit/:id/:year/:month/:day"
            component={AdminStaffAttendanceShowEdit}
          />
          <PrivateRoute path="/admin_edit/:id" component={AdminEdit} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();

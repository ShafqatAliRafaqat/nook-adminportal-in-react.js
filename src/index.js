import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import authReducer from "./Store/Reducers/AuthReducer";
import transactionsReducer from "./Store/Reducers/TransactionsReducer";
import metaDataReducer from "./Store/Reducers/MetaDataReducer";
import roleAndPermissionsReducer from "./Store/Reducers/RoleAndPermissionsReducer";
import tagsReducer from "./Store/Reducers/TagsReducer";
import productTypesReducer from "./Store/Reducers/ProductTypesReducer";
import usersReducer from "./Store/Reducers/UsersReducer";
import RestaurantReducer from "./Store/Reducers/RestaurantReducer";
import PromoReducer from "./Store/Reducers/PromoReducer";
import MediaReducer from "./Store/Reducers/MediaReducer";
import OrderReducer from "./Store/Reducers/OrderReducer";
import CategoryReducer from "./Store/Reducers/CategoryReducer";
import ProductReducer from "./Store/Reducers/ProductReducer";
import BookingsReducer from "./Store/Reducers/BookingsReducer";
import NoticesReducer from "./Store/Reducers/NoticesReducer";
import ShiftsReducer from "./Store/Reducers/ShiftsReducer";
import RoomShiftsReducer from "./Store/Reducers/RoomShiftsReducer";
import ComplainsReducer from "./Store/Reducers/ComplainsReducer";
import NooksReducer from "./Store/Reducers/NooksReducer";
import NotificationsReducer from "./Store/Reducers/NotificationsReducer";
import ReceiptReducer from "./Store/Reducers/ReceiptReducer";
import AreaReducer from "./Store/Reducers/AreaReducer";

import "./index.css";
import App from "./App";

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions:transactionsReducer,
  metaData:metaDataReducer,
  roleAndPermissions:roleAndPermissionsReducer,
  tags:tagsReducer,
  productTypes:productTypesReducer,
  users:usersReducer,
  restaurants:RestaurantReducer,
  promos:PromoReducer,
  medias:MediaReducer,
  orders:OrderReducer,
  categories:CategoryReducer,
  products:ProductReducer,
  bookings:BookingsReducer,
  notices:NoticesReducer,
  shifts:ShiftsReducer,
  room_shifts:RoomShiftsReducer,
  complains:ComplainsReducer,
  receipts:ReceiptReducer,
  notifications:NotificationsReducer,
  nooks:NooksReducer,
  areas:AreaReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// disable ServiceWorker
// registerServiceWorker();

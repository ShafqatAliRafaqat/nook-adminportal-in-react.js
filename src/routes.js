import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";

function Loading() {
  return <div>Loading...</div>;
}

const Transactions = Loadable({
  loader: () => import("./Components/Transactions"),
  loading: Loading
});

const Tags = Loadable({
  loader: () => import("./Components/Tags/Tags"),
  loading: Loading
});

const Bookings = Loadable({
  loader: () => import("./Components/Bookings/Bookings"),
  loading: Loading
});

const Notices = Loadable({
  loader: () => import("./Components/Notices/Notices"),
  loading: Loading
});

const Complains = Loadable({
  loader: () => import("./Components/Complains/Complains"),
  loading: Loading
});

const Receipts = Loadable({
  loader: () => import("./Components/Receipts/Receipts"),
  loading: Loading
});

const ReceiptsCSV = Loadable({
  loader: () => import("./Components/Receipts/ReceiptsCSV"),
  loading: Loading
});

const Shifts = Loadable({
  loader: () => import("./Components/Shifts/Shifts"),
  loading: Loading
});

const RoomShifts = Loadable({
  loader: () => import("./Components/RoomShifts/RoomShifts"),
  loading: Loading
});

const Notifications = Loadable({
  loader: () => import("./Components/Notifications/Notifications"),
  loading: Loading
});

const Nooks = Loadable({
  loader: () => import("./Components/Nook/Nooks"),
  loading: Loading
});

const ProductTypes = Loadable({
  loader: () => import("./Components/ProductTypes/ProductTypes"),
  loading: Loading
});

const Users = Loadable({
  loader: () => import("./Components/Users/Users"),
  loading: Loading
});

const Promos = Loadable({
  loader: () => import("./Components/Promos/Promos"),
  loading: Loading
});

const Restaurants = Loadable({
  loader: () => import("./Components/Restaurants/Restaurants"),
  loading: Loading
});

const MediasListContainer = Loadable({
  loader: () => import("./Components/Medias/MediasListContainer"),
  loading: Loading
});

const EditRestaurant = Loadable({
  loader: () => import("./Components/Restaurants/EditRestaurant"),
  loading: Loading
});

const Orders = Loadable({
  loader: () => import("./Components/Orders/Orders"),
  loading: Loading
});

const Areas = Loadable({
  loader: () => import("./Components/Areas/Areas"),
  loading: Loading
}); 

const Settings = Loadable({
  loader: () => import("./Components/Settings"),
  loading: Loading
});

const Logout = Loadable({
  loader: () => import("./Components/Auth/Logout"),
  loading: Loading
});

const Roles = Loadable({
  loader: () => import("./Components/RoleAndPermissions/Roles"),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import("./Components/Dashboard"),
  loading: Loading
});


const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/logout", name: "Logout", component: Logout },
  { path: "/transactions", name: "Transactions", component: Transactions },
  { path: "/tags", name: "Tags", component: Tags },
  { path: "/bookings", name: "Bookings", component: Bookings },
  { path: "/notices", name: "Notices", component: Notices },
  { path: "/complains", name: "Complains", component: Complains },
  { path: "/receipts", name: "Receipts", component: Receipts },
  { path: "/receiptsCSV", name: "Receipts", component: ReceiptsCSV },
  { path: "/shifts", name: "Shifts", component: Shifts },
  { path: "/room_shifts", name: "Room Shifts", component: RoomShifts },
  { path: "/notifications", name: "Notifications", component: Notifications },
  { path: "/nooks", name: "Notifications", component: Nooks },
  { path: "/productTypes", name: "ProductTypes", component: ProductTypes },
  { path: "/users", name: "Users", component: Users },
  { path: "/promos", name: "Promotions", component: Promos },
  { path: "/restaurants", exact: true, name: "Restaurants", component: Restaurants },
  { path: "/restaurants/edit", name: "Edit Restaurant", component: EditRestaurant },
  { path: "/orders", name: "Orders", component: Orders },
  { path: "/medias", name: "Medias", component: MediasListContainer },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/roles", name: "Roles", component: Roles },
  { path: "/areas", name: "Areas", component: Areas }
];

export default routes;

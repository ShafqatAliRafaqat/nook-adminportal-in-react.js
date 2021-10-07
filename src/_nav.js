export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      name: "Nooks",
      url: "/nooks",
      icon: "fa fa-home",
      permission: "bookings-list-all"
    },
    {
      name: "Bookings",
      url: "/bookings",
      icon: "fa fa-dollar",
      permission: "bookings-list-all"
    },
    {
      name: "Receipts",
      url: "/receipts",
      icon: "fa fa-dollar"
    },
    {
      name: "Export Receipts",
      url: "/receiptsCSV",
      icon: "fa fa-dollar"
    },
    {
      name: "Complains",
      url: "/complains",
      icon: "fa fa-dollar",
      permission: "complaint-list"
    },
    {
      name: "Notices",
      url: "/notices",
      icon: "fa fa-dollar",
    },
    {
      name: "Shifts",
      url: "/shifts",
      icon: "fa fa-dollar",
    },
    {
      name: "Room Shifts",
      url: "/room_shifts",
      icon: "fa fa-dollar",
    },
    {
      name: "Notifications",
      url: "/notifications",
      icon: "fa fa-dollar",
    },
    {
      name: "Transactions",
      url: "/transactions",
      icon: "fa fa-dollar",
    },
    {
      name: "Users",
      url: "/users",
      icon: "fa fa-user-o",
      permission: "user-list-all"
    },
    {
      name: "Areas",
      url: "/areas",
      icon: "fa fa-area-chart",
    },
    {
      name: "Settings",
      url: "/settings",
      icon: "icon-settings",
      permission: "setting-list"
    },
    {
      name: "Roles & Permissions",
      url: "/roles",
      icon: "icon-people",
      permission: "role-list"
    },
    {
      name: "Logout",
      url: "/logout",
      icon: "fa fa-sign-out"
    }
  ]
};

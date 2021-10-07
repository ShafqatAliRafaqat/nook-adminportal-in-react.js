import * as actions from "../Actions/NotificationActions";

const initSate = {
  notifications : []
};

const NotificationsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_NOTIFICATIONS: {
      return { ...state, notifications: action.payload };
    }
    case actions.CREAT_NOTIFICATION: {
      return { ...state, notifications: [{...action.payload},...state.notifications] };
    }
  }
  return state;
};

export default NotificationsReducer;
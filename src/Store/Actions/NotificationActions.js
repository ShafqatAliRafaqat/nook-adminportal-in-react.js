import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const CREAT_NOTIFICATION = "CREAT_NOTIFICATION";

export const getNotifications = (token,search) => {
  return axios.get(APIModel.HOST + "admin/notifications" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createNotifications = (token, params) => {
  return axios.post(APIModel.HOST + "admin/notifications", params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
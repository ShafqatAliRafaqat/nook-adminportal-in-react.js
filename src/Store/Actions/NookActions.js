import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_NOOKS = "GET_NOOKS";
export const CREATE_NOOK = "CREATE_NOOK";
export const EDIT_NOOK = "EDIT_NOOK";

export const getNooks = (token, search) => {
  return axios.get(APIModel.HOST + "admin/nooks" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const getAllNooks = (token, search) => {
  return axios.get(APIModel.HOST + "admin/all_nooks?space_type=" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createNook = (token, params) => {
  return axios.post(APIModel.HOST + "admin/nooks", params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};


export const editNook = (token, id, params) => {
  return axios.put(APIModel.HOST + "admin/nooks/" + id, params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
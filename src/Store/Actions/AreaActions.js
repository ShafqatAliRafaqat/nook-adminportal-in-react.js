import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_AREA = "GET_AREA";
export const CREATE_AREA = "CREATE_AREA";
export const EDIT_AREA = "EDIT_AREA";
export const DELETE_AREA = "DELETE_AREA";

export const getAreas = (token, search) => {
  return axios.get(APIModel.HOST + "admin/area" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createArea = (token, params) => {
  return axios.post(APIModel.HOST + "admin/area", params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const editArea = (token, id, params) => {
  return axios.post(APIModel.HOST + "admin/area/" + id, params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const deleteArea = (token, id,) => {
    return axios.delete(APIModel.HOST + "admin/area/" + id, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
  };
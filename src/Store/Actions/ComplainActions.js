import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_COMPLAINS = "GET_COMPLAINS";
export const UPDATE_COMPLAINS = "UPDATE_COMPLAINS";
export const CREATE_COMPLAINS = "CREATE_COMPLAINS";
export const EDIT_COMPLAINS = "EDIT_COMPLAINS";

export const updateComplain = (token,id,data) => {
  return axios.put(APIModel.HOST + "admin/complaints/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getComplains = (token,search) => {
  return axios.get(APIModel.HOST + "admin/complaints" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const createComplain = (token, params) => {
  return axios.post(APIModel.HOST + "admin/complaints", params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const editComplain = (token, id, params) => {
  return axios.put(APIModel.HOST + "admin/update_complain/" + id, params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
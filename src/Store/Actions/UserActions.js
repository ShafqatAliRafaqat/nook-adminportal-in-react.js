import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";

export const getUsers = (token,search) => {
  return axios.get(APIModel.HOST + "admin/users" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const getAllUsers = (token,search) => {
  return axios.get(APIModel.HOST + "admin/all_users" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const createUser = (token,data) => {
  return axios.post(APIModel.HOST + "admin/create_user",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editUser = (token,id,data) => {
  return axios.put(APIModel.HOST + "admin/users/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};


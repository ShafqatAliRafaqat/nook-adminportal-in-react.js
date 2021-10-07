import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_SHIFTS = "GET_SHIFTS";
export const UPDATE_SHIFTS = "UPDATE_SHIFTS";

export const updateShift = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/shifts/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getShifts = (token,search) => {
  return axios.get(APIModel.HOST + "admin/shifts" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
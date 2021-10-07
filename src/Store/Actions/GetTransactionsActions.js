import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const UPDATE_TRANSACTIONS = "UPDATE_TRANSACTIONS";

export const transactions = (token,search) => {

  return axios.get(APIModel.HOST + "admin/transactions" + search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });

};

export const editTransaction = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/transactions/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
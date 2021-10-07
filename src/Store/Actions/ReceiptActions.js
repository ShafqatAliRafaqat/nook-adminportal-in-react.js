import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_RECEIPTS = "GET_RECEIPTS";
export const UPDATE_RECEIPT = "UPDATE_RECEIPT";
export const PAY_RECEIPT = "PAY_RECEIPT";
export const DELETE_RECEIPT = "DELETE_RECEIPT";

export const getReceipts = (token,search) => {
  return axios.get(APIModel.HOST + "admin/receipts" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const PublishRecept = (token,data) => {
  return axios.post(APIModel.HOST + "admin/receipts/publish",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const payReceipt = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/receipts/pay/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const updateReceipt = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/update_receipt/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const deleteReceipt = (token, id,) => {
  return axios.delete(APIModel.HOST + "admin/receipt/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};